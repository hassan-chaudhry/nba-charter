import React from "react";
import { useState } from "react";
import MyDateRangePicker from "./MyDateRangePicker";
import { parseDate } from "@internationalized/date";

const SelectByRange = ({ onSelect, data }) => {
  const [showRange, setShowRange] = useState(false);
  const [textColor, setTextColor] = useState(false);
  const [value, setValue] = useState({
    start: null,
    end: null,
  });

  const onClick = () => {
    let startDate = value.start;
    let endDate = value.end;
    startDate = convertDateToYMD(startDate);
    endDate = convertDateToYMD(endDate);

    onSelect("", startDate, endDate);
  };

  const convertDateToYMD = (date) => {
    let month = date.month;
    let day = date.day;
    let year = date.year;

    if (parseInt(day) < 10) {
      day = "0" + day;
    }
    if (parseInt(month) < 10) {
      month = "0" + month;
    }

    const convertedDate = year + "-" + month + "-" + day;

    return convertedDate;
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
        <div className="container m-auto max-w-md">
          <div className="p-5 border border-gray-500 hover:border-blue-500 rounded-[20px]">
            <div className="flex items-center justify-center m-2">
              <MyDateRangePicker
                label="Game Dates"
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-gray-500 hover:bg-blue-500 text-white font-bold py-2 px-4 m-3 rounded-xl"
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
