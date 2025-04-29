import React from "react";
import { useState, useEffect } from "react";
import { colors } from "../constants/constants.jsx";
import { HiOutlineExclamation } from "react-icons/hi";

const SelectRecentGames = ({ onSelect, data, handleReset, resetRecent }) => {
  const [selectRecent, setSelectRecent] = useState("");

  // reset 'Recent Games' box when different selection method is used
  useEffect(() => {
    if (resetRecent) {
      setSelectRecent("");
    }
  }, [resetRecent]);

  const handleClick = (gameID) => {
    onSelect({ gameID: gameID }); // call onSelect function to get game / shot chart data based on gameID
    setSelectRecent(gameID);

    handleReset(); // reset SelectByGameID selection
  };

  // get regular season games played so far
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
      className={`bg-white-500 border-4 border-purple-300 hover:border-purple-500 rounded-[20px] p-3 mx-5`}
    >
      <h1 className="text-2xl text-center mb-3">Recent Games</h1>
      <div className="max-w-[95%] mx-auto h-[275px] overflow-y-auto p-1 mb-3">
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
                  } hover:scale-[1.05] text-white text-center text-sm sm:text-m rounded-[20px] px-5 py-5 sm:px-10 mx-1 mb-2 cursor-pointer`}
                  style={{
                    background: `linear-gradient(to right, rgb(${homeTeamColor}), rgb(${visitTeamColor}))`,
                  }}
                  onClick={() => {
                    handleClick(gameID);
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
          // no recent games found message
          <div className="flex items-center justify-center m-5">
            <div className="flex items-center justify-center text-xl text-orange-400 border border-orange-400 rounded-md w-1/3 p-1 justify-center">
              <HiOutlineExclamation className="mr-2 flex-shrink-0" />
              No recent games found!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRecentGames;
