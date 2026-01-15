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
  const [inputLength, setInputLength] = useState(0);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [bestMatch, setBestMatch] = useState(suggestion);

  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // wake backend on page load to avoid cold-start delay before fetching players
  useEffect(() => {
    const ping = () => {
      fetch(`${baseURL}/ping`).catch(() => {});
    };

    ping();
  }, []);

  /////////////////////////////////
  //   HANDLE PLAYER SELECTION   //
  /////////////////////////////////

  // search for selected player
  const onSelection = (selectedPlayer) => {
    setSuggestionsList([]);
    setInputLength(0);
    setSuggestionsLoading(false);
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
        setInputLength(0);
        setSuggestionsLoading(false);
        onSelection(query);
      }
    }
  };

  ////////////////////////////////
  //   HANDLE SUGGESTION LIST   //
  ////////////////////////////////

  // get player data from server on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setSuggestionsLoading(true);
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
      } finally {
        setSuggestionsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const updateFilteredPlayers = () => {
      const filteredPlayers = allPlayers
        .map((player) => player.full_name)
        .filter((player) => {
          return player.toLowerCase().includes(query.toLowerCase()); // get player names that include input
        });
      setSuggestionsList(filteredPlayers); // fill suggestions list with those players
    };

    updateFilteredPlayers();
  }, [allPlayers]);

  // dynamically update suggestion list as user types
  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);
    setInputLength(input.length);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    let filteredPlayers = [];
    debounceRef.current = setTimeout(() => {
      // limit suggestion list updates to when user input is longer than 1 character
      if (input.length > 1) {
        filteredPlayers = allPlayers
          .map((player) => player.full_name)
          .filter((player) => {
            return player.toLowerCase().includes(input.toLowerCase()); // get player names that include input
          });
        setSuggestionsList(filteredPlayers); // fill suggestions list with those players
      } else {
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
        {inputLength > 1 && (
          <>
            {suggestionsLoading ? (
              <div className="bg-white rounded-lg border border-purple-500 p-2 shadow-xl absolute w-full top-14 mt-1 sm:mt-2 z-10 flex items-center justify-center h-20">
                <Loader height={50} width={50} />
              </div>
            ) : (
              suggestionsList.length >= 1 && (
                <ul className="bg-white rounded-lg border border-purple-500 p-2 shadow-xl absolute w-full top-14 mt-1 sm:mt-2 z-10 h-auto max-h-48 overflow-y-auto ">
                  {suggestionsList.map((player, index) => (
                    <li
                      key={index}
                      className="hover:bg-purple-100 hover:rounded-md cursor-default"
                      onClick={() => onSelection(player)}
                    >
                      {player}
                    </li>
                  ))}
                </ul>
              )
            )}
          </>
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
