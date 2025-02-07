const redis = require("redis");

const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
});

(async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

redisClient.on("error", (error) => {
  console.log("Redis error:", error);
});

const loadPlayers = (players) => {
  players.forEach((player) => {
    redisClient.hSet(
      `player:${player.id}`,
      "id",
      player.id,
      "last_name",
      player.last_name,
      "first_name",
      player.first_name,
      "full_name",
      player.full_name,
      "is_active",
      player.is_active
    );

    let playerFullName = player.full_name;
    playerFullName = playerFullName.toLowerCase();
    redisClient.set(`player:full_name:${playerFullName}`, player.id);

    redisClient.sAdd("player_names:", player.full_name);
  });
};

const loadAllData = (data) => {
  if (data.players) loadPlayers(data.players);
  else console.log("Error loading NBA player data into Redis");
  if (data.wnba_players) loadPlayers(data.wnba_players);
  else console.log("Error loading WNBA player data into Redis");

  console.log("All data loaded into Redis");
};

module.exports = { redisClient, loadPlayers, loadAllData };
