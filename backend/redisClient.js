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
    // const firstLetter = player.full_name[0].toUpperCase();
    // redisClient.sAdd(`player_names:${firstLetter}`, player.full_name);
  });

  console.log("NBA player data loaded into Redis");
};

const loadAllData = (data) => {
  if (data.players) loadPlayers(data.players);

  console.log("All data loaded into Redis");
};

module.exports = { redisClient, loadPlayers, loadAllData };
