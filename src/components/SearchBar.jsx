import React from "react";
import { useState } from "react";

const SearchBar = ({ onSearch, suggestion }) => {
  const [query, setQuery] = useState("");

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
    }
  };

  const updateQuery = () => {
    onSearch(suggestion);
    setQuery(suggestion);
  };

  let suggestionBarHeader = "";
  let suggestionBarName = "";
  if (suggestion !== "") {
    suggestionBarHeader = "Did you mean: ";
    suggestionBarName = suggestion;
  }

  return (
    <div className="bg-blue-50">
      <div className="container m-auto max-w-3xl py-5">
        <div className="bg-white px-4 py-4 shadow-md rounded-md m-4">
          <input
            className="w-full py-1 px-1"
            placeholder="Enter a player name"
            value={query}
            onChange={(query) => setQuery(query.target.value)}
            onKeyDown={(e) => onEnter(e)}
          />
        </div>
        <div className="text-blue-500 ml-5">
          <h1>{suggestionBarHeader}</h1>
          <h1 className="hover:underline" onClick={updateQuery}>
            {suggestionBarName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
