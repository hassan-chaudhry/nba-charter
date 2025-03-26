import React from "react";
import { useState } from "react";
import SelectionCard from "./SelectionCard";
import MyDateRangePicker from "./MyDateRangePicker";
import { BsExclamationCircleFill } from "react-icons/bs";
import { HiOutlineExclamation } from "react-icons/hi";
import { Tooltip } from "react-tooltip";

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
      onSelect("", startDate, endDate, season, "");
    } else {
      setInvalidRange(true);
    }

    handleReset(); // reset Recent and Game ID selections
  };

  const isValidSeason = (startDate, endDate) => {
    // check if range is within a single NBA season
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
    // convert date from "MM/DD/YYYY" to "YYYY-MM-DD"
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
    <SelectionCard>
      <div className="flex mb-2">
        <h1 className="text-2xl mb-2">Select By Range</h1>
        <a
          data-tooltip-id="GameRangeTip"
          data-tooltip-html={`
                  <div class="flex flex-col items-center text-center">
                    <p>
                      Select a range of dates within a single NBA season.
                    </p>
                  
                  </div>`}
          data-tooltip-place="top"
        >
          <BsExclamationCircleFill className="text-lg m-1.5" />
        </a>
        <Tooltip id="GameRangeTip" />
      </div>

      <div className="p-1 rounded-[20px]">
        <MyDateRangePicker
          label="Game Dates"
          selectRange={selectRange}
          onChange={(selectRange) => {
            setSelectRange(selectRange);
          }}
        />
      </div>

      <button
        className="bg-gray-400 hover:bg-purple-500 text-white py-2 px-4 m-3 rounded-xl"
        type="submit"
        onClick={() => onClick()}
      >
        Generate Chart
      </button>

      <div className="h-8">
        {invalidRange && (
          <div className="flex border border-red-400 text-red-400 rounded-md items-center justify-center">
            <HiOutlineExclamation className="flex-shrink-0 m-1" />
            <p className="m-1">Invalid Range. Please Try Again.</p>
          </div>
        )}
      </div>
    </SelectionCard>
  );
};

export default SelectByRange;
