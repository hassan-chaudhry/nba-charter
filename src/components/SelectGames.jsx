import React from "react";
import { useState } from "react";

const SelectGames = ({ onSelect, data }) => {
  const [queryGameID, setQueryGameID] = useState("");
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-01-07");

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

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelect(queryGameID, "", "");
      setQueryGameID("");
    }
  };

  const onClick = () => {
    onSelect("", dateFrom, dateTo);
  };

  return (
    <>
      <div className="bg-white-500 p-3">
        <h1 className="flex items-center justify-center text-blue-400 text-xl font-bold mt-5 mb-5">
          Recent Games
        </h1>
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

        <h1 className="flex items-center justify-center text-blue-400 text-xl font-bold mb-5">
          Select by Game ID
        </h1>
        <div className="container m-auto max-w-2xl">
          <div className="bg-white px-4 py-1 shadow-md rounded-md m-4">
            <input
              className="w-full py-1 px-1"
              placeholder="Enter game ID"
              value={queryGameID}
              onChange={(queryGameID) =>
                setQueryGameID(queryGameID.target.value)
              }
              onKeyDown={(e) => onEnter(e)}
            />
          </div>
        </div>
      </div>

      <h1 className="flex items-center justify-center text-blue-400 text-xl font-bold mt-3 mb-5">
        Select Range
      </h1>
      <div className="container m-auto max-w-2xl">
        <div className="bg-blue-50 px-4 py-4 shadow-md rounded-md m-4">
          <h1 className="mb-2">Date From:</h1>

          <input
            className="w-full py-1 px-1 mb-3"
            placeholder="Enter start date"
            value={dateFrom}
            onChange={(dateFrom) => setDateFrom(dateFrom.target.value)}
          />
          <h1 className="mb-2">Date To:</h1>
          <input
            className="w-full py-1 px-1"
            placeholder="Enter end date"
            value={dateTo}
            onChange={(dateTo) => setDateTo(dateTo.target.value)}
          />
          <div className="flex justify-center">
            <button
              className="bg-gray-500 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded-full"
              type="submit"
              onClick={() => onClick()}
            >
              Generate Chart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectGames;
