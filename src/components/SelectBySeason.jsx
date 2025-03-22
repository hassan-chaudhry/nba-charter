import React from "react";
import { useState } from "react";
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
    { value: "2019-20", label: "2019-20" },
    { value: "2018-19", label: "2018-19" },
    { value: "2017-18", label: "2017-18" },
    { value: "2016-17", label: "2016-17" },
    { value: "2015-16", label: "2015-16" },
    { value: "2014-15", label: "2014-15" },
    { value: "2013-14", label: "2013-14" },
    { value: "2012-13", label: "2012-13" },
    { value: "2011-12", label: "2011-12" },
    { value: "2010-11", label: "2010-11" },
    { value: "2009-10", label: "2009-10" },
    { value: "2008-09", label: "2008-09" },
    { value: "2007-08", label: "2007-08" },
    { value: "2006-07", label: "2006-07" },
    { value: "2005-06", label: "2005-06" },
    { value: "2004-05", label: "2004-05" },
    { value: "2003-04", label: "2003-04" },
    { value: "2002-03", label: "2002-03" },
    { value: "2001-02", label: "2001-02" },
    { value: "2000-01", label: "2000-01" },
    { value: "1999-00", label: "1999-00" },
    { value: "1998-99", label: "1998-99" },
    { value: "1997-98", label: "1997-98" },
    { value: "1996-97", label: "1996-97" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#a854f4" // selected color
        : state.isFocused
        ? "#d8b4fc" // hover color
        : "white", // default color
      color: state.isSelected ? "white" : "black", // text color
      cursor: "pointer",
    }),
  };

  return (
    <SelectionCard>
      <h1 className="text-2xl mb-2">Select By Season</h1>

      <div className="m-2">
        Season Type
        <Select
          className="border border-gray-500 hover:border-purple-500 rounded-md"
          styles={customStyles}
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
          styles={customStyles}
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
