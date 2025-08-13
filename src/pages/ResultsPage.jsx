import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import SelectGamesContainer from "../components/SelectGamesContainer";
import ShotChartContainer from "../components/ShotChartContainer";
import "react-tooltip/dist/react-tooltip.css";

function ResultsPage() {
  const [playerName, setPlayerName] = useState(null);
  const [playerGameLogData, setPlayerGameLogData] = useState(null);
  const [loadChart, setLoadChart] = useState(null);
  const [shotChartData, setShotChartData] = useState(null);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const refShotChart = useRef(null);
  const { userQuery } = useParams();

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  //////////////////////////////
  //   PLAYER GAME LOG DATA   //
  //////////////////////////////

  const fetchPlayerGameLogData = async (query) => {
    setShotChartData(null); // reset shot chart after user searches for new player

    const name = query.trim();
    setPlayerName(name);
    const encodedName = encodeURIComponent(name);

    try {
      const response = await fetch(
        `${baseURL}/api/playergamelog?playerName=${encodedName}`
      );
      if (response.status === 404) {
        const data = await response.json();
        if (data.bestMatch) {
          setSuggestion(data.bestMatch);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setPlayerGameLogData(data);
    } catch (error) {
      console.log("Could not fetch player game logs", error);
    }
  };

  /////////////////////////
  //   SHOT CHART DATA   //
  /////////////////////////

  const fetchShotChartData = async ({
    gameID = "",
    dateFrom = "",
    dateTo = "",
    season = "",
    seasonType = "",
  }) => {
    if (dateFrom && dateTo) {
      setHeaderInfo(["range", dateFrom, dateTo]); // set header info to date range
    } else if (season && seasonType) {
      setHeaderInfo(["season", season, seasonType]); // set header info to season and season type
    } else {
      setHeaderInfo([]); // set header info to single game (default)
    }

    const params = new URLSearchParams();
    if (playerName) params.append("playerName", playerName);
    if (gameID) params.append("gameID", gameID);
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);
    if (season) params.append("season", season);
    if (seasonType) params.append("seasonType", seasonType);

    setLoadChart(true);
    refShotChart.current?.scrollIntoView({ behavior: "smooth" }); // scroll down to chart automatically

    try {
      const response = await fetch(
        `${baseURL}/api/shotchartdetail?${params.toString()}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data);
      setLoadChart(false);
      setShotChartData(data);
      return data;
    } catch (error) {
      console.log("Could not fetch shot chart data", error);
    }
  };

  // if search comes from home page, game log must be retrieved
  useEffect(() => {
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
        playerGameLogData={playerGameLogData}
        suggestion={suggestion}
      />
      <ShotChartContainer
        ref={refShotChart}
        loadChartSection={loadChart}
        shotChartData={shotChartData}
        headerInfo={headerInfo}
      />
    </>
  );
}

export default ResultsPage;
