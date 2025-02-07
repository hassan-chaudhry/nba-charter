import React from "react";
import { useState } from "react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByGameID from "./SelectByGameID";
import SelectByRange from "./SelectByRange";

const SelectGamesContainer = ({ onSelect, data }) => {
  const [textColor, setTextColor] = useState(true);
  const [showSelection, setShowSelection] = useState(true);

  return (
    <>
      <div className="bg-white-500 p-3">
        <div className="flex items-center justify-center">
          <h1
            className={`${
              data && textColor ? "bg-blue-400" : "bg-gray-500"
            } hover:bg-blue-400 text-2xl text-white text-center max-w-2xl m-5 px-6 py-3 rounded-[20px]`}
            onClick={() => {
              data && setShowSelection((prevState) => !prevState);
              data && setTextColor((prevState) => !prevState);
            }}
          >
            Select a Game
          </h1>
        </div>
        {showSelection && data && (
          <>
            <SelectRecentGames onSelect={onSelect} data={data} />
            <div className="grid grid-cols-2 mt-1 p-3 items-center">
              <SelectByRange onSelect={onSelect} data={data} />
              <SelectByGameID onSelect={onSelect} data={data} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectGamesContainer;
