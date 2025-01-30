import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("Jalen Brunson, 0022400641");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <div className="bg-blue-50">
      <div className="container m-auto max-w-3xl py-5">
        <div className="bg-white px-4 py-4 shadow-md rounded-md m-4">
          <input
            className="w-full py-1 px-1"
            placeholder="Enter a player name and game ID (e.g. 'Jalen Brunson, 0022400641')"
            value={query}
            onChange={(query) => setQuery(query.target.value)}
            onKeyDown={(e) => onEnter(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
