import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Loader from "./Loader.jsx";

const SearchBar = ({ onSearch, suggestion, userQuery }) => {
  const navigate = useNavigate();

  const [query, setQuery] = useState(userQuery); // initialize with userQuery to keep search bar value in sync between home & results page
  const [allPlayers, setAllPlayers] = useState([]);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [bestMatch, setBestMatch] = useState(suggestion);

  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  /////////////////////////////////
  //   HANDLE PLAYER SELECTION   //
  /////////////////////////////////

  // search for selected player
  const onSelection = (selectedPlayer) => {
    setSuggestionsList([]);
    setBestMatch("");

    setQuery(selectedPlayer);
    onSearch(selectedPlayer);

    navigate(`/${selectedPlayer}`);
  };

  // search for player when user presses enter
  const onEnterPress = (e) => {
    // check to see if enter key was pressed
    if (e.key === "Enter") {
      e.preventDefault();
      // check to see if input is not empty
      if (query !== "") {
        onSelection(query);
      }
    }
  };

  ////////////////////////////////
  //   HANDLE SUGGESTION LIST   //
  ////////////////////////////////

  // get player data from server on component mount
  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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

  // dynamically update suggestion list as user types
  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      // limit suggestion list updates to when user input is longer than 1 character
      if (input.length > 1) {
        setSuggestionsLoading(true);
        const filteredPlayers = allPlayers
          .map((player) => player.full_name)
          .filter((player) => {
            return player.toLowerCase().includes(input.toLowerCase()); // get player names that include input
          });
        setSuggestionsLoading(false);
        setSuggestionsList(filteredPlayers); // fill suggestions list with those players
      } else {
        setSuggestionsLoading(false);
        setSuggestionsList([]); // if input is empty, clear suggestions list
      }
    }, 250); // debounce the input to limit suggestion list updates
  };

  // close suggestion list if user clicks elsewhere
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

  ///////////////////////////
  //   HANDLE BEST MATCH   //
  ///////////////////////////

  // set best match when a suggestion is available
  useEffect(() => {
    setBestMatch(suggestion);
  }, [suggestion]);

  // display best match suggestion if available
  let suggestionBarHeader, suggestionBarName;
  if (bestMatch) {
    suggestionBarHeader = "Did you mean: ";
    suggestionBarName = suggestion;
  } else {
    suggestionBarHeader = "";
    suggestionBarName = "";
  }

  return (
    <div className="m-auto w-[75vw] relative" ref={searchRef}>
      {/* search bar */}
      <div className="grid grid-col-1">
        <div className="flex bg-white items-center border border-gray-500 focus-within:border-purple-500 focus-within:text-purple-500 p-4 rounded-[20px]">
          <FaSearch className="mr-3" />
          <input
            className="focus:outline-none focus:ring-0 w-full text-black text-base sm:text-lg"
            placeholder="Enter a player's name"
            value={query}
            onChange={handleInputChange}
            onKeyDown={onEnterPress}
          />
        </div>

        {/* suggestions list dropdown */}
        {suggestionsList.length > 0 && (
          <ul className="bg-white max-h-60 rounded-lg overflow-y-auto p-2 border border-purple-500 shadow-xl absolute w-full top-14 mt-1 sm:mt-2 z-10">
            {suggestionsLoading ? (
              <div className="flex items-center justify-center h-20">
                <Loader height={50} width={50} />
              </div>
            ) : (
              <div>
                {suggestionsList.map((player, index) => (
                  <li
                    key={index}
                    className="px-1 hover:bg-purple-100 hover:rounded-md cursor-default"
                    onClick={() => onSelection(player)}
                  >
                    {player}
                  </li>
                ))}
              </div>
            )}
          </ul>
        )}

        {/* best match suggestion */}
        <div className="flex text-blue-500 m-2">
          <h1 className="mr-1 cursor-default">{suggestionBarHeader}</h1>
          <h1
            className="hover:underline cursor-pointer"
            onClick={() => onSelection(suggestion)}
          >
            {suggestionBarName}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
