import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SelectGamesContainer from "./components/SelectGamesContainer";
import ShotChartContainer from "./components/ShotChartContainer";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [playerGameLogData, setPlayerGameLogData] = useState(null);
  const [shotChartData, setShotChartData] = useState(null);
  const [headerInfo, setHeaderInfo] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const refShotChart = useRef(null);

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
      console.log("You made a big mistake pal", error);
    }
  };

  const fetchShotChartData = async (gameID, dateFrom, dateTo, season) => {
    setHeaderInfo([dateFrom, dateTo]);
    try {
      const response = await fetch(
        `http://localhost:5000/api/shotchartdetail?playerName=${playerName}&gameID=${gameID}&dateFrom=${dateFrom}&dateTo=${dateTo}&season=${season}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setShotChartData(data);
      setTimeout(() => {
        refShotChart.current?.scrollIntoView({ behavior: "smooth" });
      }, 15);
    } catch (error) {
      console.log("You made a big mistake pal", error);
    }
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={fetchPlayerGameLogData} suggestion={suggestion} />
      <SelectGamesContainer
        onSelect={fetchShotChartData}
        data={playerGameLogData}
      />
      <ShotChartContainer
        ref={refShotChart}
        data={shotChartData}
        headerInfo={headerInfo}
      />
    </>
  );
}

export default App;
