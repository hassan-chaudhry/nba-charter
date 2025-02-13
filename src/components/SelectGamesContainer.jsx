import React from "react";
import { useState, useEffect } from "react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByRange from "./SelectByRange";
import SelectBySeason from "./SelectBySeason";
import SelectByGameID from "./SelectByGameID";

const SelectGamesContainer = ({ onSelect, data }) => {
  const [textColor, setTextColor] = useState(false);
  const [showSelection, setShowSelection] = useState(false);

  const [resetRecent, setResetRecent] = useState(false);
  const [resetID, setResetID] = useState(false);
  const [resetSeason, setResetSeason] = useState("");

  useEffect(() => {
    if (data) {
      setTextColor(true);
      setShowSelection(true);
    } else {
      setTextColor(false);
      setShowSelection(false);
    }
  }, [data]);

  const resetRecentAndID = () => {
    setResetRecent(true);
    setResetID(true);
  };

  const resetRecentOnly = () => {
    setResetRecent(true);
    setResetID(false);
  };

  const resetIDOnly = () => {
    setResetID(true);
    setResetRecent(false);
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
              handleReset={resetIDOnly}
              resetRecent={resetRecent}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3">
              <SelectByRange
                onSelect={onSelect}
                handleReset={resetRecentAndID}
              />
              <SelectBySeason
                onSelect={onSelect}
                handleReset={resetRecentAndID}
                resetSeason={resetSeason}
              />
              <SelectByGameID
                onSelect={onSelect}
                handleReset={resetRecentOnly}
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
