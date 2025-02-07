import React, { useState } from "react";

const SelectByGameID = ({ onSelect, data }) => {
  const [queryGameID, setQueryGameID] = useState("");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelect(queryGameID, "", "");
      setQueryGameID("");
    }
  };

  return (
    <div className="bg-white-500 border-4 border-gray-300 hover:border-blue-400 rounded-[20px] p-5 py-24 m-1 ml-4">
      <h1 className="text-2xl text-center mb-3">Select by Game ID</h1>
      <div className="m-auto max-w-2xl">
        <input
          className="border border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 w-full p-3 rounded-[20px]"
          placeholder="Enter game ID"
          value={queryGameID}
          onChange={(queryGameID) => setQueryGameID(queryGameID.target.value)}
          onKeyDown={(e) => onEnter(e)}
        />
      </div>
    </div>
  );
};

export default SelectByGameID;
