// set up firebase connection
import db from "./firebase.config.js";

// get all players from Firebase database
export default async function handler(req, res) {
  const snapshot = await db.ref("players").once("value");
  if (!snapshot.exists()) {
    return res
      .status(404)
      .json({ error: "No players were found in the database" });
  }

  const allPlayers = snapshot.val();
  res.json({ players: allPlayers });
}
