import React, { useState, useEffect } from "react";
import SelectionCard from "./SelectionCard";
import { BsExclamationCircleFill } from "react-icons/bs";
import { HiOutlineExclamation } from "react-icons/hi";
import { Tooltip } from "react-tooltip";
import gameIDPic from "../assets/images/game-id-url.png";

const SelectByGameID = ({ onSelect, handleReset, resetID }) => {
  const [selectID, setSelectID] = useState("");
  const [invalidID, setInvalidID] = useState(false);

  // reset 'Select By GameID' box (including invalidID message) when different selection method is used
  useEffect(() => {
    if (resetID) {
      setSelectID("");
      setInvalidID(false);
    }
  }, [resetID]);

  const onEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectID.length !== 0) {
        const result = await onSelect({ gameID: selectID }); // call onSelect function to get game / shot chart data based on gameID
        if (result) {
          setInvalidID(false);
        } else {
          setInvalidID(true);
          setSelectID("");
        }
        handleReset(); // reset SelectRecentGames selection
      }
    }
  };

  return (
    <SelectionCard>
      <div className="flex mb-2">
        <h1 className="text-2xl">Select by Game ID</h1>
        <a
          data-tooltip-id="GameIDTip"
          data-tooltip-html={`
            <div class="flex flex-col items-center text-center h-auto w-[300px] sm:w-[500px]">
              <p class="mb-2">
                Game IDs can be found at the end of the URLs for games on the official NBA website.
              </p>
              <img src="${gameIDPic}" alt="Game ID URL Example" class="w-[500px] rounded-md mb-2">
            </div>`}
          data-tooltip-place="top"
        >
          <BsExclamationCircleFill className="text-lg m-1.5" />
        </a>
        <Tooltip id="GameIDTip" />
      </div>

      <input
        className="border border-gray-500 focus:outline-none focus:ring-0 focus:border-purple-500 hover:border-purple-500 w-full p-3 rounded-[20px]"
        placeholder="Enter game ID"
        value={selectID}
        onChange={(selectID) => {
          setSelectID(selectID.target.value);
        }}
        onKeyDown={(e) => onEnter(e)}
      />

      {/* invalidID message */}
      <div className="h-8">
        {invalidID && (
          <div className="flex border border-red-400 text-red-400 rounded-md items-center justify-center m-3">
            <HiOutlineExclamation className="flex-shrink-0 m-1" />
            <p className="m-1">Invalid Game ID. Please Try Again.</p>
          </div>
        )}
      </div>
    </SelectionCard>
  );
};

export default SelectByGameID;
