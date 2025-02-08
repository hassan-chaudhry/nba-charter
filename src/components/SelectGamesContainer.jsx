import React from "react";
import { useState, useEffect } from "react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByGameID from "./SelectByGameID";
import SelectByRange from "./SelectByRange";

const SelectGamesContainer = ({ onSelect, data }) => {
  const [textColor, setTextColor] = useState(false);
  const [showSelection, setShowSelection] = useState(false);

  const [resetRecent, setResetRecent] = useState(false);
  const [resetRange, setResetRange] = useState(false);
  const [resetID, setResetID] = useState(false);

  useEffect(() => {
    if (data) {
      setTextColor(true);
      setShowSelection(true);
    } else {
      setTextColor(false);
      setShowSelection(false);
    }
  }, [data]);

  const resetRangeAndID = () => {
    setResetRange(true);
    setResetID(true);
    setResetRecent(false);
  };

  const resetRecentAndID = () => {
    setResetRecent(true);
    setResetID(true);
    setResetRange(false);
  };

  const resetRecentAndRange = () => {
    setResetRecent(true);
    setResetRange(true);
    setResetID(false);
  };

  return (
    <>
      <div className="bg-white-500 p-3">
        <div className="flex items-center justify-center">
          <h1
            className={`${
              data && textColor ? "bg-blue-400" : "bg-gray-500"
            } hover:bg-blue-400 text-2xl text-white text-center max-w-2xl m-5 px-6 py-3 rounded-[20px]`}
            onClick={() => {
              if (data) {
                setTextColor((prevState) => !prevState);
                setShowSelection((prevState) => !prevState);
              }
            }}
          >
            Select a Game
          </h1>
        </div>
        {showSelection && data && (
          <>
            <SelectRecentGames
              onSelect={onSelect}
              data={data}
              handleReset={resetRangeAndID}
              resetRecent={resetRecent}
            />
            <div className="grid grid-cols-2 mt-1 p-3 items-center">
              <SelectByRange
                onSelect={onSelect}
                handleReset={resetRecentAndID}
                resetRange={resetRange}
              />
              <SelectByGameID
                onSelect={onSelect}
                handleReset={resetRecentAndRange}
                resetID={resetID}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SelectGamesContainer;
