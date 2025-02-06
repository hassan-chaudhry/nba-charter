import React from "react";
import { useState } from "react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByGameID from "./SelectByGameID";
import SelectByRange from "./SelectByRange";

const SelectGames = ({ onSelect, data }) => {
  const [textColor, setTextColor] = useState(true);
  const [showSelection, setShowSelection] = useState(true);

  return (
    <>
      <div className="bg-white-500 p-3">
        <h1
          className={`${
            data && textColor ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-500 text-2xl m-7`}
          onClick={() => {
            setShowSelection((prevState) => !prevState);
            data && setTextColor((prevState) => !prevState);
          }}
        >
          Select a Game
        </h1>
        {showSelection && data && (
          <>
            <SelectRecentGames onSelect={onSelect} data={data} />
            <div className="grid grid-cols-2 mt-7 p-10 items-center">
              <SelectByRange onSelect={onSelect} data={data} />
              <SelectByGameID onSelect={onSelect} data={data} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectGames;
