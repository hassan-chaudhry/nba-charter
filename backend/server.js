const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const https = require("https");

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://nba-shot-charts.vercel.app",
  "https://www.nbashotcharts.net",
];

const corsOptions =
  process.env.NODE_ENV === "development"
    ? {} // development
    : { origin: allowedOrigins }; // production

app.use(cors(corsOptions));

// set up firebase connection
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, "base64").toString(
    "utf8"
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nba-shot-chart-default-rtdb.firebaseio.com",
});
const db = admin.database();

////////////////////////////
//    HELPER FUNCTIONS    //
////////////////////////////

// find closest matching player name to user's query
const levenshtein = (queryName, dbName) => {
  const m = queryName.length;
  const n = dbName.length;

  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (queryName[i - 1] == dbName[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i][j - 1], Math.min(dp[i - 1][j], dp[i - 1][j - 1]));
      }
    }
  }

  return dp[m][n];
};

const getBestMatch = async (queryName) => {
  // get all players from database
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) {
    return null;
  }

  const candidates = snapshot.val().map((candidate) => candidate.full_name);

  let bestMatch = "";
  let minLength = 30;
  candidates.forEach((candidate) => {
    const levenshtein_score = levenshtein(
      queryName.toLowerCase(),
      candidate.toLowerCase()
    );

    if (levenshtein_score < minLength) {
      minLength = levenshtein_score;
      bestMatch = candidate;
    }
  });

  return bestMatch;
};

const getCurrentSeasonInfo = () => {
  const currentDate = new Date();

  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  let season, seasonType;

  if (month >= 10) {
    const startYear = parseInt(year);
    const endYear = parseInt(year) + 1;
    season = startYear + "-" + endYear.toString().slice(2, 4);
  } else {
    const startYear = parseInt(year) - 1;
    const endYear = parseInt(year);
    season = startYear + "-" + endYear.toString().slice(2, 4);
  }

  if (month == 10 && day <= 20) {
    // pre season starts around late october
    seasonType = "Pre Season";
  } else if ((month == 4 && day >= 20) || (month >= 5 && month <= 9)) {
    // playoffs starts around late april + off season
    seasonType = "Playoffs";
  } else {
    seasonType = "Regular Season";
  }

  const seasonInfo = { season: season, seasonType: seasonType };

  return seasonInfo;
};

///////////////////////////////
//    PLAYER GAME LOG API    //
///////////////////////////////

app.get("/api/playergamelog", async (req, res) => {
  // get parameters from query
  let { playerName, dateFrom = "", dateTo = "" } = req.query;

  // verify player name
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }
  playerName = playerName.trim().toLowerCase();

  // get player ID from database
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) {
    return res
      .status(404)
      .json({ error: "No players were found in the database" });
  }
  const allPlayers = snapshot.val();
  const foundPlayer = allPlayers.find(
    (player) =>
      player.full_name.toLowerCase().replaceAll(" ", "") ===
      playerName.replaceAll(" ", "")
  );
  if (!foundPlayer) {
    const bestMatch = await getBestMatch(playerName);
    if (!bestMatch) {
      return res
        .status(404)
        .json({ error: "No players were found in the database" });
    }
    return res.status(404).json({
      error: "Player ID not found",
      bestMatch: bestMatch,
    });
  }
  const playerID = foundPlayer.id;

  // get current active NBA season
  const seasonInfo = getCurrentSeasonInfo();
  const season = seasonInfo.season;
  const seasonType = seasonInfo.seasonType;

  // convert parameters to string
  const params = new URLSearchParams({
    PlayerID: playerID.toString(),
    LeagueID: "00",
    Season: season,
    SeasonType: seasonType,
    DateFrom: dateFrom,
    DateTo: dateTo,
  });
  const queryString = params.toString().replace("%2B", "+");

  // console.log(`https://stats.nba.com/stats/playergamelog?${queryString}`);

  // get player game log data from NBA API
  try {
    const response = await fetch(
      `https://stats.nba.com/stats/playergamelog?${queryString}`,
      {
        method: "GET",
        headers: {
          Host: "stats.nba.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Referer: "https://www.nba.com",
          Origin: "https://www.nba.com",
          "Cache-Control": "no-cache",
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "keep-alive",
        },
      }
    );
    if (!response.ok) {
      console.error(`Error: ${res.statusText}`);
      return res.status(response.status).json({ error: response.statusText });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    return res.status(500).json({ error: "Failed to fetch data from NBA API" });
  }
});

///////////////////////////
//    SHOT CHART API     //
///////////////////////////

app.get("/api/shotchartdetail", async (req, res) => {
  // get parameters from query
  let {
    playerName,
    gameID = "",
    dateFrom = "",
    dateTo = "",
    season = "",
    seasonType = "",
  } = req.query;

  // verify player name
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }
  playerName = playerName.trim().toLowerCase();

  // get player ID from database
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) {
    return res
      .status(404)
      .json({ error: "No players were found in the database" });
  }
  const allPlayers = snapshot.val();
  const foundPlayer = allPlayers.find(
    (player) =>
      player.full_name.toLowerCase().replaceAll(" ", "") ===
      playerName.replaceAll(" ", "")
  );
  if (!foundPlayer) {
    return res.status(404).json({
      error: "Player ID not found",
    });
  }
  const playerID = foundPlayer.id;

  // convert parameters to string
  const params = new URLSearchParams({
    ContextMeasure: "FGA",
    LeagueID: "00",
    Month: "0",
    OpponentTeamID: "0",
    Period: "0",
    PlayerID: playerID.toString(),
    TeamID: 0,
    GameID: gameID.toString(),
    DateFrom: dateFrom,
    DateTo: dateTo,
    season: season,
    SeasonType: seasonType,
  });
  const queryString = params.toString().replace("%2B", "+");

  // console.log(`https://stats.nba.com/stats/shotchartdetail?${queryString}`);

  // fetch shot chart data from NBA API
  try {
    const response = await fetch(
      `https://stats.nba.com/stats/shotchartdetail?${queryString}`,
      {
        method: "GET",
        headers: {
          Host: "stats.nba.com",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Referer: "https://www.nba.com",
          Origin: "https://www.nba.com",
          "Cache-Control": "no-cache",
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Connection: "keep-alive",
        },
      }
    );
    if (!response.ok) {
      console.error(`Error: ${res.statusText}`);
      return res.status(res.status).json({ error: res.statusText });
    }
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    return res.status(500).json({ error: "Failed to fetch data from NBA API" });
  }
});

/////////////////////////
//    HELPER ROUTES    //
/////////////////////////

// get player picture from web scraping
app.get("/image/playerpic", async (req, res) => {
  const { playerID } = req.query;

  try {
    const response = await fetch(
      `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`
    );
    if (!response.ok) {
      console.error(`Failed to fetch player picture: ${res.statusText}`);
      return res.status(response.status).json({ error: response.statusText });
    }

    const buffer = await response.arrayBuffer(); // read raw binary data
    res.set("Content-Type", "image/png"); // set response header so browser knows it's getting a PNG image
    return res.send(Buffer.from(buffer)); // converts the ArrayBuffer into a Node.js Buffer
  } catch (error) {
    return res.status(500).send("Failed to fetch image");
  }
});

// get all players from Firebase database
app.get("/database/allplayers", async (req, res) => {
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) {
    return res
      .status(404)
      .json({ error: "No players were found in the database" });
  }

  const allPlayers = snapshot.val();
  return res.json({ players: allPlayers });
});

app.get("/", (req, res) => {
  res.send("Welcome to the NBA Stats API Server");
});

const hostname = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
