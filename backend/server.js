const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const cors = require("cors");
const { redisClient, loadAllData } = require("./redisClient");

const app = express();
app.use(express.json());
app.use(cors());

// load all data into Redis
const rawData = fs.readFileSync("./data.json");
const data = JSON.parse(rawData);
loadAllData(data);

// find closest matching player name ot user's query
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
  // const firstLetter = queryName.charAt(0).toUpperCase();
  const candidates = await redisClient.sMembers("player_names:");

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

app.get("/api/shotchartdetail", async (req, res) => {
  let { playerName } = req.query;
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }

  playerName = playerName.trim().toLowerCase();
  const playerID = await redisClient.get(`player:full_name:${playerName}`);
  if (!playerID) {
    return res.status(404).json({
      error: "Player ID not found",
    });
  }

  const { gameID } = req.query || "";
  const { dateFrom } = req.query || "";
  const { dateTo } = req.query || "";

  const params = new URLSearchParams({
    ContextMeasure: "FGA",
    LeagueID: "00",
    Month: "0",
    OpponentTeamID: "0",
    Period: "0",
    PlayerID: playerID.toString(),
    TeamID: 0,
    GameID: gameID.toString(),
    DateFrom: dateFrom || "",
    DateTo: dateTo || "",
  });

  const queryString = params.toString();

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
    res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Failed to fetch data from NBA API" });
  }
});

app.get("/api/playergamelog", async (req, res) => {
  let { playerName, dateFrom, dateTo } = req.query;
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }

  playerName = playerName.trim().toLowerCase();
  const playerID = await redisClient.get(`player:full_name:${playerName}`);
  if (!playerID) {
    const bestMatch = await getBestMatch(playerName);
    return res.status(404).json({
      error: "Player ID not found",
      bestMatch: bestMatch,
    });
  }

  const params = new URLSearchParams({
    PlayerID: playerID.toString(),
    LeagueID: "00",
    Season: "2024-25",
    SeasonType: "Regular Season",
    DateFrom: dateFrom || "",
    DateTo: dateTo || "",
  });

  const queryString = params.toString().replace(/%2B/g, "+");

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
      return res.status(res.status).json({ error: res.statusText });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Failed to fetch data from NBA API" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the NBA Stats API Server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
