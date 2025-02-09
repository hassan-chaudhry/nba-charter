import React, { useState, useEffect } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import gameIDPic from "../assets/images/game-id-url.png";

const SelectByGameID = ({ onSelect, handleReset, resetID }) => {
  const [selectID, setSelectID] = useState("");

  useEffect(() => {
    if (resetID) {
      setSelectID("");
    }
  }, [resetID]);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectID.length !== 0) {
        onSelect(selectID, "", "", "");

        handleReset(); // reset Recent and Range selections
      }
    }
  };

  return (
    <div className="bg-white-500 border-4 border-gray-300 hover:border-blue-400 rounded-[20px] p-5 py-16 sm:py-20 h-72 m-1 ml-4">
      <div className="flex items-center justify-center mb-3">
        <h1 className="text-2xl">Select by Game ID</h1>
        <a
          data-tooltip-id="GameIDTip"
          data-tooltip-html={`
            <div class="flex flex-col items-center text-center">
              <p class="mb-2">
                Game IDs can be found at the end of the URLs for games on the official NBA website.
              </p>
              <img src="${gameIDPic}" alt="Game ID URL Example" class="w-[500px] rounded-md mb-2">
            </div>`}
          data-tooltip-place="top"
        >
          <BsExclamationCircleFill className="m-2 text-lg" />
        </a>
        <Tooltip id="GameIDTip" />
      </div>
      <div className="m-auto max-w-2xl">
        <input
          className="border border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 w-full p-3 rounded-[20px]"
          placeholder="Enter game ID"
          value={selectID}
          onChange={(selectID) => {
            setSelectID(selectID.target.value);
          }}
          onKeyDown={(e) => onEnter(e)}
        />
      </div>
    </div>
  );
};

export default SelectByGameID;
