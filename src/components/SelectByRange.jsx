import React from "react";
import { useState } from "react";
import MyDateRangePicker from "./MyDateRangePicker";

const SelectByRange = ({ onSelect }) => {
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
    <div className="bg-white-500 border-4 border-gray-300 hover:border-blue-400 rounded-[20px] p-5 m-1 mr-4">
      <h1 className="text-2xl text-center mb-3">Select By Range</h1>
      <div className="container m-auto max-w-md">
        <div className="p-5 rounded-[20px]">
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
              className="bg-gray-400 hover:bg-blue-500 text-white py-2 px-4 m-3 rounded-xl"
              type="submit"
              onClick={() => onClick()}
            >
              Generate Chart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectByRange;
