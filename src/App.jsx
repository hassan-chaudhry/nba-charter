import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SelectGames from "./components/SelectGames";
import ShotChartContainer from "./components/ShotChartContainer";

function App() {
  const [playerName, setPlayerName] = useState(null);
  const [playerGameLogData, setPlayerGameLogData] = useState(null);
  const [shotChartData, setShotChartData] = useState(null);

  const fetchPlayerGameLogData = async (query) => {
    const name = query.trim();
    setPlayerName(name);

    try {
      const response = await fetch(
        `http://localhost:5000/api/playergamelog?playerName=${name}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setPlayerGameLogData(data);
    } catch (error) {
      console.log("You made a big mistake pal", error);
    }
  };

  const fetchShotChartData = async (gameID) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/shotchartdetail?playerName=${playerName}&gameID=${gameID}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setShotChartData(data);
    } catch (error) {
      console.log("You made a big mistake pal", error);
    }
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={fetchPlayerGameLogData} />
      <SelectGames onClick={fetchShotChartData} data={playerGameLogData} />
      <ShotChartContainer data={shotChartData} />
    </>
  );
}

export default App;
