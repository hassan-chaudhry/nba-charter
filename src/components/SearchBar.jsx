import React from "react";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, suggestion, userQuery }) => {
  const [query, setQuery] = useState(userQuery); // initialize with userQuery to keep search bar value in sync between home & results page
  const [allPlayers, setAllPlayers] = useState([]);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [bestMatch, setBestMatch] = useState(suggestion);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  ///////////////////////////
  //   HANDLE USER INPUT   //
  ///////////////////////////

  // search for player when user presses enter
  const onEnter = (e) => {
    // check to see if enter key was pressed
    if (e.key === "Enter") {
      e.preventDefault();
      // check to see if input is not empty
      if (query !== "") {
        onSearch(query);
      }
    }
  };

  // handle input change as user types
  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // limit API calls to when user input is longer than 1 character
      if (input.length > 1) {
        const filteredPlayers = allPlayers
          .map((player) => player.full_name)
          .filter((player) => {
            return player.toLowerCase().includes(input.toLowerCase()); // get player names that include input
          });
        setSuggestionsList(filteredPlayers); // fill suggestions list with those players
      } else {
        setSuggestionsList([]); // if input is empty, clear suggestions list
      }
    }, 250); // debounce the input to limit API calls
  };

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    // get player data from server on component mount
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          `${baseURL}/database/allplayers` // call to backend server
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

  ////////////////////////////
  //   HANDLE SUGGESTIONS   //
  ////////////////////////////

  const handleSuggestionListClick = (playerName) => {
    // after clicking a player name in the suggestions dropdown menu
    setQuery(playerName);
    setSuggestionsList([]);
    onSearch(playerName);
    setBestMatch("");
  };

  // handle best match suggestion

  useEffect(() => {
    // set best match when a suggestion is passed in
    setBestMatch(suggestion);
  }, [suggestion]);

  const handleBestMatchClick = () => {
    // after clicking best match suggestion under search bar
    setQuery(suggestion);
    onSearch(suggestion);
    setBestMatch("");
  };

  // display best match suggestion if available
  let suggestionBarHeader, suggestionBarName;
  if (bestMatch) {
    suggestionBarHeader = "Did you mean: ";
    suggestionBarName = suggestion;
  } else {
    suggestionBarHeader = "";
    suggestionBarName = "";
  }

  ////////////////////////////
  //   HANDLE DOM CHANGES   //
  ////////////////////////////

  useEffect(() => {
    // close search bar if user clicks elsewhere
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

  return (
    <div
      className="m-auto max-w-md sm:max-w-xl md:max-w-3xl relative"
      ref={searchRef}
    >
      {/* search bar */}
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

        {/* suggestions list dropdown */}
        {suggestionsList.length > 0 && (
          <ul className="bg-white max-h-20 sm:max-h-40 md:max-h-60 rounded-lg overflow-y-auto p-2 border border-purple-500 shadow-xl absolute w-full top-14 mt-1 z-10">
            {suggestionsList.map((player, index) => (
              <li
                key={index}
                className="px-1 hover:bg-purple-100 hover:rounded-md cursor-default"
                onClick={() => handleSuggestionListClick(player)}
              >
                {player}
              </li>
            ))}
          </ul>
        )}

        {/* best match suggestion */}
        <div className="flex text-blue-500 m-2">
          <h1 className="mr-1 cursor-default">{suggestionBarHeader}</h1>
          <h1
            className="hover:underline cursor-pointer"
            onClick={handleBestMatchClick}
          >
            {suggestionBarName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
