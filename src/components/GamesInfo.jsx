import React from "react";
import { useState } from "react";

const GamesInfo = ({ data }) => {
  const numOfShots = data.resultSets[0].rowSet.length;
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const formatDate = (date) => {
    // format date from "YYYY-MM-DD" to "MM/DD/YYYY"
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
  let allGames = [];

  if (data) {
    let game = {};

    for (let i = 0; i < numOfShots; i++) {
      // iterate through all shots in data & extract game info from shots
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

  if (!showMoreInfo) {
    // toggle between showing 20 or all games
    allGamesSorted = allGamesSorted.slice(0, 20);
  }

  return (
    <div className="bg-white-500">
      {allGamesSorted.length && (
        <div className="bg-indigo-100 m-5 p-5 rounded-[20px] whitespace-pre-line">
          {`The data for the chart above comes from the following games: ${"\n\n"}`}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {allGamesSorted.map(({ gameID, gameDate, homeTeam, visitTeam }) => (
              <div key={gameID} className="text-s sm:text-m text-center">
                {homeTeam} vs. {visitTeam} - {formatDate(gameDate)}
              </div>
            ))}
          </div>
          {allGames.length > 20 && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowMoreInfo((prevState) => !prevState)}
                className="text-black hover:text-indigo-500 mt-1"
              >
                {showMoreInfo ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
          <h1 className="text-s sm:text-m mt-5">Data Source: stats.nba.com</h1>
        </div>
      )}
    </div>
  );
};

export default GamesInfo;
