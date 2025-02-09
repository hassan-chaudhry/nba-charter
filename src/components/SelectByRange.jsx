import React from "react";
import { useState } from "react";
import MyDateRangePicker from "./MyDateRangePicker";
import { HiOutlineExclamation } from "react-icons/hi";

const SelectByRange = ({ onSelect, handleReset }) => {
  const [selectRange, setSelectRange] = useState({
    start: null,
    end: null,
  });
  const [invalidRange, setInvalidRange] = useState(false);

  const onClick = () => {
    let startDate = selectRange.start;
    let endDate = selectRange.end;

    const season = isValidSeason(startDate, endDate);

    if (season) {
      setInvalidRange(false);
      startDate = convertDateToYMD(startDate);
      endDate = convertDateToYMD(endDate);
      onSelect("", startDate, endDate, season);
    } else {
      setInvalidRange(true);
    }

    handleReset(); // reset Recent and Game ID selections
  };

  const isValidSeason = (startDate, endDate) => {
    let startYear = startDate.year;
    let endYear = endDate.year;

    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(endDate);

    let season;

    if (startYear !== endYear) {
      season = startYear + "-" + endYear.toString().slice(2, 4);
    } else {
      const startMonth = startDate.month;

      if (startMonth >= 10) {
        endYear = parseInt(startYear) + 1;
        season = startYear + "-" + endYear.toString().slice(2, 4);
      } else if (startMonth <= 4) {
        startYear = parseInt(startYear) - 1;
        season = startYear + "-" + endYear.toString().slice(2, 4);
      }
    }

    const seasonStart = new Date(startYear + "-10-01");
    const seasonEnd = new Date(endYear + "-04-30");

    if (
      seasonStart <= rangeStart &&
      rangeEnd <= seasonEnd &&
      rangeStart < rangeEnd &&
      endYear - startYear <= 1
    ) {
      return season;
    } else {
      return "";
    }
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
    <div className="bg-white-500 border-4 border-gray-300 hover:border-blue-400 rounded-[20px] p-5 m-1 mr-4 h-72">
      <h1 className="text-2xl text-center">Select By Range</h1>
      <div className="container m-auto max-w-md">
        <div className="p-2 rounded-[20px]">
          <div className="flex items-center justify-center m-2">
            <MyDateRangePicker
              label="Game Dates"
              selectRange={selectRange}
              onChange={(selectRange) => {
                setSelectRange(selectRange);
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-400 hover:bg-blue-500 text-white py-2 px-4 m-2 rounded-xl"
              type="submit"
              onClick={() => onClick()}
            >
              Generate Chart
            </button>
          </div>
          <div className="flex justify-center">
            <div
              className={`${
                invalidRange
                  ? "border text-red-400 border-red-400 rounded-md"
                  : ""
              } flex items-center bg-white-500 p-1 sm:m-3`}
            >
              {invalidRange ? (
                <>
                  <HiOutlineExclamation className="flex-shrink-0 m-1" />
                  <p>Invalid Range. Please Try Again.</p>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectByRange;
