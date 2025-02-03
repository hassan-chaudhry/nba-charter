import React, { useState } from "react";

const SelectByGameID = ({ onSelect, data }) => {
  const [showGameID, setShowGameID] = useState("");
  const [textColor, setTextColor] = useState(false);
  const [queryGameID, setQueryGameID] = useState("");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelect(queryGameID, "", "");
      setQueryGameID("");
    }
  };

  return (
    <div className="bg-white-500 p-3">
      <h1
        className={`${
          textColor ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500 text-2xl m-7`}
        onClick={() => {
          setShowGameID((prevState) => !prevState);
          data && setTextColor((prevState) => !prevState);
        }}
      >
        Select by Game ID
      </h1>
      {showGameID && data && (
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
      )}
    </div>
  );
};

export default SelectByGameID;
