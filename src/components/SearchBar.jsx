import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, suggestion, userQuery }) => {
  const [query, setQuery] = useState(userQuery);
  const [allPlayers, setAllPlayers] = useState([]);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [showBestMatch, setShowBestMatch] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutsideSearchBar = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestionsList([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideSearchBar);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/database/allplayers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }

        const data = await response.json();
        setAllPlayers(data.players);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (input.length > 1) {
        const filteredPlayers = allPlayers
          .map((player) => player.full_name)
          .filter((player) => {
            return player.toLowerCase().includes(input.toLowerCase());
          });
        setSuggestionsList(filteredPlayers);
      } else {
        setSuggestionsList([]);
      }
    }, 250);
  };

  const handleSuggestionClick = (playerName) => {
    setQuery(playerName);
    setSuggestionsList([]);
    onSearch(playerName);
    setShowBestMatch(false);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query !== "") {
        onSearch(query);
      }
    }
  };

  const updateQuery = () => {
    // after clicking best match suggestion
    onSearch(suggestion);
    setQuery(suggestion);
    setShowBestMatch(false);
  };

  useEffect(() => {
    setShowBestMatch(suggestion !== "");
  }, [suggestion]);

  let suggestionBarHeader, suggestionBarName;
  if (showBestMatch) {
    suggestionBarHeader = "Did you mean: ";
    suggestionBarName = suggestion;
  } else {
    suggestionBarHeader = "";
    suggestionBarName = "";
  }

  return (
    <div
      className="m-auto max-w-md sm:max-w-xl md:max-w-3xl relative"
      ref={searchRef}
    >
      <div className="grid grid-col-1">
        <div className="flex bg-white items-center border border-gray-500 focus-within:border-purple-500 focus-within:text-purple-500 p-4 rounded-[20px]">
          <FaSearch className="mr-3" />
          <input
            className="focus:outline-none focus:ring-0 w-full text-black"
            placeholder="Type a player's name and press 'Enter'"
            value={query}
            onChange={handleInputChange}
            onKeyDown={onEnter}
          />
        </div>

        {suggestionsList.length > 0 && (
          <ul className="bg-white max-h-20 sm:max-h-40 md:max-h-60 rounded-lg overflow-y-auto p-2 border border-purple-500 shadow-xl absolute w-full top-14 mt-1 z-10">
            {suggestionsList.map((player, index) => (
              <li
                key={index}
                className="px-1 hover:bg-purple-100 hover:rounded-md cursor-default"
                onClick={() => handleSuggestionClick(player)}
              >
                {player}
              </li>
            ))}
          </ul>
        )}

        <div className="flex text-blue-500 m-2">
          <h1 className="mr-1 cursor-default">{suggestionBarHeader}</h1>
          <h1 className="hover:underline cursor-pointer" onClick={updateQuery}>
            {suggestionBarName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
