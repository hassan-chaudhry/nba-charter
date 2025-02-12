import React from "react";
import { useState, useEffect } from "react";
import SelectionCard from "./SelectionCard";

const SelectBySeason = ({ onSelect, handleReset, resetSeason }) => {
  const [selectSeasonType, setSelectSeasonType] = useState("Regular Season");
  const [selectSeason, setSelectSeason] = useState("2024-25");

  useEffect(() => {
    if (resetSeason) {
      setSelectSeason("Regular Season");
      setSelectSeasonType("2024-25");
    }
  }, [resetSeason]);

  const handleSeasonTypeChange = (e) => {
    setSelectSeasonType(e.target.value);
  };

  const handleSeasonChange = (e) => {
    setSelectSeason(e.target.value);
  };

  const onClick = () => {
    onSelect("", "", "", selectSeason, selectSeasonType);

    handleReset(); // reset Recent and Game ID selections
  };

  return (
    <SelectionCard>
      <h1 className="text-2xl mb-2">Select By Season</h1>

      <div className="m-2">
        <label className="m-1">Season Type</label>
        <select
          value={selectSeasonType}
          onChange={handleSeasonTypeChange}
          className=""
        >
          <option value="Pre+Season">Pre Season</option>
          <option value="Regular+Season">Regular Season</option>
          <option value="Playoffs">Playoffs</option>
        </select>
      </div>

      <div className="m-2">
        <label className="m-1">Season</label>
        <select value={selectSeason} onChange={handleSeasonChange} className="">
          <option value="2024-25">2024-25</option>
          <option value="2023-24">2023-24</option>
          <option value="2022-23">2022-23</option>
          <option value="2021-22">2021-22</option>
          <option value="2020-21">2020-21</option>
        </select>
      </div>

      <button
        className="bg-gray-400 hover:bg-blue-500 text-white py-2 px-4 m-3 rounded-xl"
        type="submit"
        onClick={() => onClick()}
      >
        Generate Chart
      </button>
    </SelectionCard>
  );
};

export default SelectBySeason;
