import React from "react";
import { useState } from "react";

const SelectRecentGames = ({ onSelect, data }) => {
  const [showRecentGames, setShowRecentGames] = useState(true);
  const [textColor, setTextColor] = useState(true);

  let allGames = [];
  if (data) {
    for (let i = 0; i < 5; i++) {
      let game = {
        gameID: data.resultSets[0].rowSet[i][2],
        gameDate: data.resultSets[0].rowSet[i][3],
        gameMatchup: data.resultSets[0].rowSet[i][4],
      };
      allGames.push(game);
    }
  }

  return (
    <div className="bg-white-500 p-3">
      <h1
        className={`${
          data && textColor ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500 text-2xl m-7`}
        onClick={() => {
          setShowRecentGames((prevState) => !prevState);
          data && setTextColor((prevState) => !prevState);
        }}
      >
        Recent Games
      </h1>
      {showRecentGames && data && (
        <div className="flex items-center justify-center">
          {allGames.map(({ gameID, gameDate, gameMatchup }) => (
            <div
              key={gameID}
              className="border border-gray-500 p-4 bg-blue-50 hover:bg-blue-100 rounded-md mr-1 ml-1 mb-10"
              onClick={() => onSelect(gameID, "", "")}
            >
              {gameDate} | {gameMatchup}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectRecentGames;
