import React from "react";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, suggestion }) => {
  const [query, setQuery] = useState("jalen brunson");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(query);
    }
  };

  const updateQuery = () => {
    onSearch(suggestion);
    setQuery(suggestion);
    setShowSuggestion(false);
    onScroll();
  };

  useEffect(() => {
    setShowSuggestion(suggestion !== "");
  }, [suggestion]);

  let suggestionBarHeader, suggestionBarName;
  if (showSuggestion) {
    console.log("show suggestion");
    suggestionBarHeader = "Did you mean: ";
    suggestionBarName = suggestion;
  } else {
    suggestionBarHeader = "";
    suggestionBarName = "";
  }

  return (
    <div className="bg-white m-auto max-w-md sm:max-w-xl md:max-w-3xl">
      <div className="flex items-center border border-gray-500 focus-within:border-blue-500 focus-within:text-blue-500 p-4 rounded-[20px]">
        <FaSearch className="mr-3" />
        <input
          className="focus:outline-none focus:ring-0 w-full text-black"
          placeholder="Type a player's name and press 'Enter'"
          value={query}
          onChange={(query) => setQuery(query.target.value)}
          onKeyDown={(e) => onEnter(e)}
        />
      </div>
      <div className="flex text-blue-500 m-2">
        <h1 className="mr-1">{suggestionBarHeader}</h1>
        <h1 className="hover:underline" onClick={updateQuery}>
          {suggestionBarName}
        </h1>
      </div>
    </div>
  );
};

export default SearchBar;
