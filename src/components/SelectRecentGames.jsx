import React from "react";
import { useState, useEffect } from "react";
import { colors } from "../constants/constants.jsx";
import { HiOutlineExclamation } from "react-icons/hi";

const SelectRecentGames = ({ onSelect, data, handleReset, resetRecent }) => {
  const [selectRecent, setSelectRecent] = useState("");

  useEffect(() => {
    if (resetRecent) {
      setSelectRecent("");
    }
  }, [resetRecent]);

  const onClick = (gameID) => {
    onSelect(gameID, "", "", "", "");
    setSelectRecent(gameID);

    handleReset(); // reset Range and Game ID selections
  };

  let allGames = [];
  const gamesSoFar = data.resultSets[0].rowSet.length;

  if (data) {
    for (let i = 0; i < gamesSoFar; i++) {
      const matchup = data.resultSets[0].rowSet[i][4];
      const teams = matchup.split(" ");
      const homeTeam = teams[0];
      const visitTeam = teams[2];

      let game = {
        gameID: data.resultSets[0].rowSet[i][2],
        gameDate: data.resultSets[0].rowSet[i][3],
        gameMatchup: data.resultSets[0].rowSet[i][4],
        homeTeamColor: colors[homeTeam][0].toString(),
        visitTeamColor: colors[visitTeam][0].toString(),
      };
      allGames.push(game);
    }
  }

  return (
    <div
      className={`bg-white-500 border-4 border-gray-300 hover:border-blue-400 rounded-[20px] p-3 mx-5 mb-2`}
    >
      <h1 className="text-2xl text-center mb-3">Recent Games</h1>
      <div className="max-w-[95%] mx-auto h-[275px] overflow-y-auto p-3 mb-3">
        {allGames.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-center">
            {allGames.map(
              ({
                gameID,
                gameDate,
                gameMatchup,
                homeTeamColor,
                visitTeamColor,
              }) => (
                <div
                  key={gameID}
                  className={`${
                    selectRecent === gameID
                      ? "outline outline-white outline-offset-[-7px]"
                      : ""
                  } text-white text-center text-m rounded-[20px] px-10 py-5 mx-1 mb-3`}
                  style={{
                    background: `linear-gradient(to right, rgb(${homeTeamColor}), rgb(${visitTeamColor}))`,
                  }}
                  onClick={() => {
                    onClick(gameID);
                  }}
                >
                  {gameMatchup}
                  <br />
                  {gameDate}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center text-xl mt-5">
            <HiOutlineExclamation className="mr-2 flex-shrink-0" />
            No recent games found!
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRecentGames;
