import db from "./firebase.config.js";

// Find closest matching player name
const levenshtein = (queryName, dbName) => {
  const m = queryName.length;
  const n = dbName.length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (queryName[i - 1] == dbName[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};

const getBestMatch = async (queryName) => {
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) return null;

  const candidates = snapshot.val().map((c) => c.full_name);
  let bestMatch = "";
  let minLength = 30;

  candidates.forEach((candidate) => {
    const score = levenshtein(queryName.toLowerCase(), candidate.toLowerCase());
    if (score < minLength) {
      minLength = score;
      bestMatch = candidate;
    }
  });

  return bestMatch;
};

const getCurrentSeason = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return month >= 10
    ? `${year}-${(year + 1).toString().slice(2)}`
    : `${year - 1}-${year.toString().slice(2)}`;
};

///////////////////////////////
//    PLAYER GAME LOG API    //
///////////////////////////////

export default async function handler(req, res) {
  console.log("🔥 Entering /api/playergamelog route");

  try {
    let { playerName, dateFrom = "", dateTo = "" } = req.query;
    if (!playerName) {
      console.log("❌ No playerName provided");
      return res.status(400).json({ error: "Valid player name is required" });
    }

    console.log("👤 Looking up player:", playerName);
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("🕒 Firebase DB timeout")), 8000)
    );

    const snapshot = await Promise.race([
      db.ref("players").once("value"),
      timeout,
    ]);

    console.log("📦 Firebase snapshot retrieved");

    if (!snapshot.exists()) {
      console.log("❌ No players found in DB");
      return res
        .status(404)
        .json({ error: "No players were found in the database" });
    }

    const allPlayers = snapshot.val();
    const foundPlayer = allPlayers.find(
      (p) => p.full_name.toLowerCase() === playerName.trim().toLowerCase()
    );

    if (!foundPlayer) {
      console.log("🔍 No exact match found. Trying best match...");
      const bestMatch = await getBestMatch(playerName);
      if (!bestMatch) {
        return res
          .status(404)
          .json({ error: "No players were found in the database" });
      }
      return res.status(404).json({ error: "Player ID not found", bestMatch });
    }

    const playerID = foundPlayer.id;
    const season = getCurrentSeason();

    console.log(`📊 Fetching data for ID: ${playerID}, season: ${season}`);

    const params = new URLSearchParams({
      PlayerID: playerID.toString(),
      LeagueID: "00",
      Season: season,
      SeasonType: "Regular Season",
      DateFrom: dateFrom,
      DateTo: dateTo,
    });
    const queryString = params.toString().replace("%2B", "+");

    console.log("📡 Starting NBA API fetch...");
    console.time("⏱️ nba-fetch");

    const nbaTimeout = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("🕒 NBA API fetch timeout after 8s")),
        8000
      )
    );

    let response;

    try {
      response = await Promise.race([
        fetch(`https://stats.nba.com/stats/playergamelog?${queryString}`, {
          method: "GET",
          headers: {
            Host: "stats.nba.com",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            Referer: "https://www.nba.com",
            Origin: "https://www.nba.com",
            "Cache-Control": "no-cache",
            Accept: "application/json, text/plain, */*",
          },
        }),
        nbaTimeout,
      ]);
    } catch (err) {
      console.timeEnd("⏱️ nba-fetch");
      console.error("❌ NBA API fetch failed:", err.message);
      return res
        .status(500)
        .json({ error: "NBA API request failed or timed out" });
    }

    console.timeEnd("⏱️ nba-fetch");

    if (!response.ok) {
      console.error("❌ NBA API responded with non-200:", response.statusText);
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    console.log("✅ NBA API data successfully fetched");
    return res.json(data);
  } catch (err) {
    console.error("🔥 Error in /api/playergamelog:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
