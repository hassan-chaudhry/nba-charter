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

  let allGamesSorted = [];

  if (data) {
    let allGames = [];
    let game = {};

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

    allGamesSorted = [...allGames].sort(
      (a, b) => Number(a.gameDate) - Number(b.gameDate)
    );
  }

  return (
    <div className="bg-white-500">
      {allGamesSorted.length > 1 && (
        <div className="bg-indigo-200 m-5 p-5 rounded-[20px] whitespace-pre-line">
          {`The data for the chart above comes from the following games: ${"\n\n"}`}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {allGamesSorted.map(({ gameID, gameDate, homeTeam, visitTeam }) => (
              <div key={gameID} className="text-s sm:text-m">
                • {homeTeam} vs. {visitTeam} - {formatDate(gameDate)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesInfo;
