import React from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByRange from "./SelectByRange";
import SelectBySeason from "./SelectBySeason";
import SelectByGameID from "./SelectByGameID";

const SelectGamesContainer = ({ onSelect, data }) => {
  const [showSelection, setShowSelection] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [resetRecent, setResetRecent] = useState(false);
  const [resetID, setResetID] = useState(false);

  useEffect(() => {
    resetRecentAndID();
    if (data) {
      setShowSelection(true);
    } else {
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
    <div className="bg-white-500 p-3">
      {data && (
        <>
          <div className="flex flex-col items-center m-5">
            <motion.div
              className="text-2xl text-black text-center font-bold relative cursor-default"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onClick={() => {
                if (data) {
                  setShowSelection((prevState) => !prevState);
                }
              }}
            >
              Select Games
              <div
                className={`absolute left-0 h-1 bg-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                  hovered ? "w-full" : "w-0"
                } ${showSelection ? "w-full" : "w-0"}`}
              ></div>
            </motion.div>
          </div>

          {showSelection && (
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
                />
                <SelectByGameID
                  onSelect={onSelect}
                  handleReset={resetRecentOnly}
                  resetID={resetID}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelectGamesContainer;
