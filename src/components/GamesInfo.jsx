import React from "react";
import { useState } from "react";

const GamesInfo = ({ data }) => {
  const [games, setGames] = useState([]);
  console.log(data);
  const numOfGames = data.resultSets[0].rowSet.length;

  let allGames = [];
  let game = {};
  if (data) {
    for (let i = 0; i < numOfGames; i++) {
      let gameID = data.resultSets[0].rowSet[i][1];
      if (!allGames.some((game) => game.gameID === gameID)) {
        game = {
          gameID: gameID,
          gameDate: data.resultSets[0].rowSet[i][21],
          homeTeam: data.resultSets[0].rowSet[i][22],
          visitTeam: data.resultSets[0].rowSet[i][23],
        };
        allGames.push(game);
      }
    }
  }

  return (
    <div className="bg-white-500 p-3">
      <h1 className="text-m m-5">Game(s) Info</h1>
      <div className="bg-blue-50 border border-gray-500 m-5 p-5 rounded-[20px]">
        {allGames.map(({ gameID, gameDate, homeTeam, visitTeam }) => (
          <div key={gameID} className="text-m">
            {homeTeam} vs. {visitTeam} - {gameDate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesInfo;
