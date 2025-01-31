import React from "react";

const ShotChartHeader = ({ data, headerInfo }) => {
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

  const playerName = JSON.stringify(
    data.resultSets[0].rowSet[0][4],
    null,
    2
  ).replace(/"/g, "");

  const playerTeamFullName = data.resultSets[0].rowSet[0][6];
  // const playerTeam = Object.keys(teams).find(
  //   (key) => teams[key] === playerTeamFullName
  // );
  // console.log("this is my team", playerTeam);

  const opponentTeam =
    teams[data.resultSets[0].rowSet[0][22]] == playerTeamFullName
      ? teams[data.resultSets[0].rowSet[0][23]]
      : teams[data.resultSets[0].rowSet[0][22]];
  const date = data.resultSets[0].rowSet[0][21];
  const formatDate =
    date.slice(4, 6) + "/" + date.slice(6, 8) + "/" + date.slice(0, 4);
  const header =
    headerInfo[0] !== ""
      ? `${playerName} from ${headerInfo[0]} to ${headerInfo[1]}`
      : `${playerName} vs. ${opponentTeam} on ${formatDate}`;

  return (
    <>
      <h1 className="flex items-center justify-center text-blue-400 text-xl font-bold mt-10 mb-1">
        Shot Chart
      </h1>

      <div className="bg-white-500 p-3">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl">{header}</h1>
        </div>
      </div>
    </>
  );
};

export default ShotChartHeader;
