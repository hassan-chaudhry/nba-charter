import React from "react";

const SelectGames = ({ onClick, data }) => {
  if (!data) {
    return (
      <div className="bg-white-500 text-black p-10">
        <div className="flex items-center justify-center"></div>
      </div>
    );
  }

  let allGames = [];
  for (let i = 0; i < 5; i++) {
    let game = {
      gameID: data.resultSets[0].rowSet[i][2],
      gameDate: data.resultSets[0].rowSet[i][3],
      gameMatchup: data.resultSets[0].rowSet[i][4],
    };
    allGames.push(game);
  }

  return (
    <>
      <div className="bg-white-500 p-3">
        <div className="flex items-center justify-center ">
          {allGames.map(({ gameID, gameDate, gameMatchup }) => (
            <div
              key={gameID}
              className="border border-gray-400 p-4 bg-gray-100 rounded-md mr-1 ml-1"
              onClick={() => onClick(gameID)}
            >
              {gameDate} | {gameMatchup}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectGames;
