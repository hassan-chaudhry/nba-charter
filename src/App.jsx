import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SelectGames from "./components/SelectGames";
import ShotChartContainer from "./components/ShotChartContainer";

function App() {
  const [data, setData] = useState(null);

  const fetchData = async (query) => {
    const querySplit = query.split(",");
    const playerName = querySplit[0].trim();
    const gameID = querySplit[1].trim();
    console.log(playerName, gameID);

    try {
      const response = await fetch(
        `http://localhost:5000/api/shotchartdetail?playerName=${playerName}&gameID=${gameID}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log("You made a big mistake pal", error);
    }
  };

  return (
    <>
      <Navbar />
      <SearchBar onSearch={fetchData} />
      <SelectGames />
      <ShotChartContainer data={data} />
    </>
  );
}

export default App;
