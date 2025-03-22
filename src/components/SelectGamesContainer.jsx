import React from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByRange from "./SelectByRange";
import SelectBySeason from "./SelectBySeason";
import SelectByGameID from "./SelectByGameID";
import Loader from "./Loader.jsx";
import { HiOutlineExclamation } from "react-icons/hi";

const SelectGamesContainer = ({ onSelect, data, suggestion }) => {
  const [showSelection, setShowSelection] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  const [resetRecent, setResetRecent] = useState(false);
  const [resetID, setResetID] = useState(false);

  useEffect(() => {
    resetRecentAndID();
    if (data) {
      setLoading(false);
      setShowSelection(true);
    } else {
      setShowSelection(false);
    }

    if (suggestion) {
      setLoading(false);
    }
  }, [data, suggestion]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-white-500 p-3">
      {data ? (
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
                className={`absolute left-0 h-1 bg-purple-500 rounded-xl transition-all duration-300 ease-in-out ${
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
      ) : (
        <div className="flex items-center justify-center m-5">
          <div className="flex items-center text-orange-500 border border-orange-500 rounded-md p-1 text-2xl">
            <HiOutlineExclamation className="m-2 flex-shrink-0" />
            No player found.
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectGamesContainer;
