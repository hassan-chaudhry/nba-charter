import React from "react";
import { useState } from "react";

const GamesInfo = ({ data }) => {
  const [games, setGames] = useState([]);
  const numOfShots = data.resultSets[0].rowSet.length;

  const formatDate = (date) => {
    const formattedDate = date.replaceAll("-", "");
    const finalDate =
      formattedDate.slice(4, 6) +
      "/" +
      formattedDate.slice(6, 8) +
      "/" +
      formattedDate.slice(0, 4);

    return finalDate;
  };

  let allGames = [];
  let game = {};
  if (data) {
    for (let i = 0; i < numOfShots; i++) {
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

  if (allGames.length === 1) {
    return <div className="bg-white-500 adjust-center p-5"></div>;
  }

  return (
    <div className="bg-white-500 adjust-center p-3 mt-1">
      <div className="bg-gray-100 m-5 p-5 rounded-[20px] whitespace-pre-line">
        {`The data for the chart above comes from the following games: ${"\n\n"}`}
        {allGames.map(({ gameID, gameDate, homeTeam, visitTeam }) => (
          <div key={gameID} className="text-m">
            • {homeTeam} vs. {visitTeam} - {formatDate(gameDate)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesInfo;
