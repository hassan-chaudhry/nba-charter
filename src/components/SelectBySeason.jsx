import React from "react";
import { useState, useEffect } from "react";
import SelectionCard from "./SelectionCard";
import Select from "react-select";

const SelectBySeason = ({ onSelect, handleReset }) => {
  const [selectSeasonType, setSelectSeasonType] = useState({
    value: "Regular+Season",
    label: "Regular Season",
  });
  const [selectSeason, setSelectSeason] = useState({
    value: "2024-25",
    label: "2024-25",
  });

  const onClick = () => {
    onSelect("", "", "", selectSeason.value, selectSeasonType.value);

    handleReset(); // reset Recent and Game ID selections
  };

  const optionsSeasonType = [
    { value: "Pre+Season", label: "Pre Season" },
    { value: "Regular+Season", label: "Regular Season" },
    { value: "Playoffs", label: "Playoffs" },
  ];

  const optionsSeason = [
    { value: "2024-25", label: "2024-25" },
    { value: "2023-24", label: "2023-24" },
    { value: "2022-23", label: "2022-23" },
    { value: "2021-22", label: "2021-22" },
    { value: "2020-21", label: "2020-21" },
  ];

  return (
    <SelectionCard>
      <h1 className="text-2xl mb-2">Select By Season</h1>

      <div className="m-2">
        Season Type
        <Select
          className="border border-gray-500 hover:border-purple-500 rounded-md"
          options={optionsSeasonType}
          value={optionsSeasonType.value}
          defaultValue={selectSeasonType}
          onChange={setSelectSeasonType}
        />
      </div>

      <div className="m-2">
        Season
        <Select
          className="border border-gray-500 hover:border-purple-500 rounded-md"
          options={optionsSeason}
          value={optionsSeason.value}
          defaultValue={selectSeason}
          onChange={setSelectSeason}
        />
      </div>

      <button
        className="bg-gray-400 hover:bg-purple-500 text-white py-2 px-4 m-3 rounded-xl"
        type="submit"
        onClick={() => onClick()}
      >
        Generate Chart
      </button>
    </SelectionCard>
  );
};

export default SelectBySeason;
