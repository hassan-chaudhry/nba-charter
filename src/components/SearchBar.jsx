import React from "react";
import { useState, useEffect } from "react";

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
    <div className="bg-white m-auto max-w-3xl">
      <input
        className="border border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-500 w-full p-4 rounded-[20px]"
        placeholder="Type a player's name and press 'Enter'"
        value={query}
        onChange={(query) => setQuery(query.target.value)}
        onKeyDown={(e) => onEnter(e)}
      />
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
