import React from "react";
import { useState } from "react";

const SelectRecentGames = ({ onSelect, data }) => {
  const [selectGame, setSelectedGame] = useState("");

  const teams = {
    NYK: "New York Knicks",
    ATL: "Atlanta Hawks",
    BOS: "Boston Celtics",
    BKN: "Brooklyn Nets",
    CHA: "Charlotte Hornets",
    CHI: "Chicago Bulls",
    CLE: "Cleveland Cavaliers",
    DAL: "Dallas Mavericks",
    DEN: "Denver Nuggets",
    DET: "Detroit Pistons",
    GSW: "Golden State Warriors",
    HOU: "Houston Rockets",
    IND: "Indiana Pacers",
    LAC: "Los Angeles Clippers",
    LAL: "Los Angeles Lakers",
    MEM: "Memphis Grizzlies",
    MIA: "Miami Heat",
    MIL: "Milwaukee Bucks",
    MIN: "Minnesota Timberwolves",
    NOP: "New Orleans Pelicans",
    OKC: "Oklahoma City Thunder",
    ORL: "Orlando Magic",
    PHI: "Philadelphia 76ers",
    PHX: "Phoenix Suns",
    POR: "Portland Trail Blazers",
    SAC: "Sacramento Kings",
    SAS: "San Antonio Spurs",
    TOR: "Toronto Raptors",
    UTA: "Utah Jazz",
    WAS: "Washington Wizards",
  };

  const colors = {
    NYK: [
      [0, 107, 182],
      [245, 132, 38],
    ],
    ATL: [
      [200, 16, 46],
      [253, 185, 39],
    ],
    BOS: [
      [0, 122, 51],
      [139, 111, 78],
    ],
    BKN: [
      [0, 0, 0],
      [192, 192, 192],
    ],
    CHA: [
      [29, 17, 96],
      [0, 120, 140],
    ],
    CHI: [
      [206, 17, 65],
      [6, 25, 34],
    ],
    CLE: [
      [134, 0, 56],
      [4, 30, 66],
    ],
    DAL: [
      [0, 83, 188],
      [0, 43, 92],
    ],
    DEN: [
      [255, 198, 39],
      [29, 66, 138],
    ],
    DET: [
      [200, 16, 6],
      [29, 66, 138],
    ],
    GSW: [
      [29, 66, 138],
      [255, 199, 44],
    ],
    HOU: [
      [206, 17, 65],
      [6, 25, 34],
    ],
    IND: [
      [0, 45, 98],
      [253, 187, 48],
    ],
    LAC: [
      [200, 16, 46],
      [255, 255, 255],
    ],
    LAL: [
      [85, 37, 130],
      [29, 66, 148],
    ],
    MEM: [
      [93, 118, 169],
      [18, 23, 63],
    ],
    MIA: [
      [152, 0, 46],
      [249, 160, 27],
    ],
    MIL: [
      [0, 71, 27],
      [0, 125, 197],
    ],
    MIN: [
      [12, 35, 64],
      [35, 97, 146],
    ],
    NOP: [
      [225, 58, 62],
      [180, 151, 90],
    ],
    OKC: [
      [0, 125, 195],
      [239, 59, 36],
    ],
    ORL: [
      [0, 125, 197],
      [196, 206, 211],
    ],
    PHI: [
      [0, 107, 182],
      [237, 23, 76],
    ],
    PHX: [
      [29, 17, 96],
      [229, 95, 32],
    ],
    POR: [
      [224, 58, 62],
      [6, 25, 34],
    ],
    SAC: [
      [91, 43, 130],
      [99, 113, 122],
    ],
    SAS: [
      [196, 206, 211],
      [6, 25, 34],
    ],
    TOR: [
      [206, 17, 65],
      [6, 25, 34],
    ],
    UTA: [
      [0, 43, 92],
      [0, 71, 27],
    ],
    WAS: [
      [0, 43, 92],
      [227, 24, 55],
    ],
  };

  let homeTeamColor = "bg-blue-50";
  let visitTeamColor = "bg-blue-50";
  const gamesSoFar = data.resultSets[0].rowSet.length;

  let allGames = [];
  if (data) {
    for (let i = 0; i < gamesSoFar; i++) {
      const matchup = data.resultSets[0].rowSet[i][4];
      const teams = matchup.split(" ");
      const homeTeam = teams[0];
      const visitTeam = teams[2];

      let game = {
        gameID: data.resultSets[0].rowSet[i][2],
        gameDate: data.resultSets[0].rowSet[i][3],
        gameMatchup: data.resultSets[0].rowSet[i][4],
        homeTeamColor: colors[homeTeam][0].toString(),
        visitTeamColor: colors[visitTeam][0].toString(),
      };
      allGames.push(game);
    }
  }

  return (
    <div className="bg-white-500 p-3">
      <h1 className="text-2xl text-center ml-10 mb-3">Recent Games</h1>
      <div className="max-w-[95%] mx-auto h-[300px] overflow-y-auto border border-gray-500 p-3 rounded-[20px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1 justify-center">
          {allGames.map(
            ({
              gameID,
              gameDate,
              gameMatchup,
              homeTeamColor,
              visitTeamColor,
            }) => (
              <div
                key={gameID}
                className={`${
                  selectGame === gameID
                    ? "outline outline-white outline-offset-[-7px]"
                    : ""
                } text-white text-m text-center px-10 py-5 rounded-[20px] mr-1 ml-1 mb-3`}
                style={{
                  background: `linear-gradient(to right, rgb(${homeTeamColor}), rgb(${visitTeamColor}))`,
                }}
                onClick={() => {
                  onSelect(gameID, "", "");
                  setSelectedGame(gameID);
                }}
              >
                {gameMatchup}
                <br />
                {gameDate}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectRecentGames;
