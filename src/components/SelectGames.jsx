import React from "react";
import { useState } from "react";
import SelectRecentGames from "./SelectRecentGames";
import SelectByGameID from "./SelectByGameID";
import SelectByRange from "./SelectByRange";

const SelectGames = ({ onSelect, data }) => {
  return (
    <>
      <SelectRecentGames onSelect={onSelect} data={data} />
      <SelectByRange onSelect={onSelect} data={data} />
      <SelectByGameID onSelect={onSelect} data={data} />
    </>
  );
};

export default SelectGames;
