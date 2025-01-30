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

app.get("/api/shotchartdetail", async (req, res) => {
  const { playerName } = req.query;
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }

  const playerID = await redisClient.get(`player:full_name:${playerName}`);
  if (!playerID) {
    return res.status(404).json({
      error: "Player ID not found",
    });
  }

  const { gameID } = req.query || "";

  const params = new URLSearchParams({
    ContextMeasure: "FGA",
    LeagueID: "00",
    Month: "0",
    OpponentTeamID: "0",
    Period: "0",
    PlayerID: playerID.toString(),
    TeamID: 0,
    GameID: gameID.toString(),
  });

  const queryString = params.toString();

  try {
    const response = await fetch(
      `https://stats.nba.com/stats/shotchartdetail?${queryString}`,
      // "https://stats.nba.com/stats/shotchartdetail?ContextMeasure=PTS&LastNGames=0&LeagueID=00&Month=0&OpponentTeamID=0&Period=0&PlayerID=2544&Season=2019-20&SeasonType=Regular+Season&TeamID=1610612739",
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

app.get("/api/gamelog", async (req, res) => {
  const { playerName, dateFrom, dateTo } = req.query;
  if (!playerName) {
    return res.status(400).json({
      error: "Valid player name is required",
    });
  }

  const playerID = await redisClient.get(`player:full_name:${playerName}`);
  if (!playerID) {
    return res.status(404).json({
      error: "Player ID not found",
    });
  }

  const params = new URLSearchParams({
    PlayerID: playerID.toString(),
    LeagueID: "00",
    Season: "2024-25",
    SeasonType: "Regular Season",
    DateFrom: dateFrom.toString || null,
    DateTo: dateTo.toString || null,
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
