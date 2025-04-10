// set up firebase connection
import db from "./firebase-admin.config.js";

///////////////////////////
//    SHOT CHART API     //
///////////////////////////

export default async function handler(req, res) {
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
    (player) => player.full_name.toLowerCase() === playerName
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
    res.json(data);
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Failed to fetch data from NBA API" });
  }
}
