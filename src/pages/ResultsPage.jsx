import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SelectGamesContainer from "../components/SelectGamesContainer";
import ShotChartContainer from "../components/ShotChartContainer";
import "react-tooltip/dist/react-tooltip.css";

function ResultsPage() {
  const [playerName, setPlayerName] = useState(null);
  const [playerGameLogData, setPlayerGameLogData] = useState(null);
  const [shotChartData, setShotChartData] = useState(null);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const refShotChart = useRef(null);
  const { state } = useLocation();
  const [userQuery, setUserQuery] = useState(state.query || "");

  const fetchPlayerGameLogData = async (query) => {
    setShotChartData(null); // reset shot chart after user searches for new player
    const name = query.trim();
    setPlayerName(name);

    try {
      const response = await fetch(
        `http://localhost:5000/api/playergamelog?playerName=${name}`
      );
      if (response.status === 404) {
        const data = await response.json();
        if (data.bestMatch) {
          setSuggestion(data.bestMatch);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setPlayerGameLogData(data);
    } catch (error) {
      console.log("Could not fetch player", error);
    }
  };

  const fetchShotChartData = async (
    gameID,
    dateFrom,
    dateTo,
    season,
    seasonType
  ) => {
    if (dateFrom && dateTo) {
      setHeaderInfo(["range", dateFrom, dateTo]);
    } else if (season && seasonType) {
      setHeaderInfo(["season", season, seasonType]);
    } else {
      setHeaderInfo([]);
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/shotchartdetail?playerName=${playerName}&gameID=${gameID}&dateFrom=${dateFrom}&dateTo=${dateTo}&season=${season}&seasonType=${seasonType}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setShotChartData(data);
      setTimeout(() => {
        refShotChart.current?.scrollIntoView({ behavior: "smooth" });
      }, 5);
    } catch (error) {
      console.log("Could not fetch shot chart", error);
    }
  };

  useEffect(() => {
    // if search comes from home page
    if (userQuery) {
      fetchPlayerGameLogData(userQuery);
    }
  }, [userQuery]);

  return (
    <>
      <Navbar />
      <SearchBar
        onSearch={fetchPlayerGameLogData}
        suggestion={suggestion}
        userQuery={userQuery}
      />
      <SelectGamesContainer
        onSelect={fetchShotChartData}
        data={playerGameLogData}
        suggestion={suggestion}
      />
      <ShotChartContainer
        ref={refShotChart}
        data={shotChartData}
        headerInfo={headerInfo}
      />
    </>
  );
}

export default ResultsPage;
