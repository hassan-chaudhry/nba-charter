import React from "react";
import { useState } from "react";

const SelectByRange = ({ onSelect, data }) => {
  const [showRange, setShowRange] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-01-07");

  const onClick = () => {
    onSelect("", dateFrom, dateTo);
  };

  return (
    <div className="bg-white-500 p-3">
      <h1
        className={`${
          textColor ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500 text-2xl m-7`}
        onClick={() => {
          setShowRange((prevState) => !prevState);
          data && setTextColor((prevState) => !prevState);
        }}
      >
        Select Range
      </h1>
      {showRange && data && (
        <div className="container m-auto max-w-2xl">
          <div className="bg-blue-50 px-4 py-4 shadow-md rounded-md m-4">
            <h1 className="mb-2">Date From:</h1>

            <input
              className="w-full py-1 px-1 mb-3"
              placeholder="Enter start date"
              value={dateFrom}
              onChange={(dateFrom) => setDateFrom(dateFrom.target.value)}
            />
            <h1 className="mb-2">Date To:</h1>
            <input
              className="w-full py-1 px-1"
              placeholder="Enter end date"
              value={dateTo}
              onChange={(dateTo) => setDateTo(dateTo.target.value)}
            />
            <div className="flex justify-center">
              <button
                className="bg-gray-500 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-5 rounded-full"
                type="submit"
                onClick={() => onClick()}
              >
                Generate Chart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectByRange;
