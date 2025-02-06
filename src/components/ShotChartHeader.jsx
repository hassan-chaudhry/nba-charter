import React from "react";
import blank_pfp from "../assets/images/blank-profile-picture.png";

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

  const formatDate = (date) => {
    const formattedDate = date.replaceAll("-", "");
    const finalDate =
      formattedDate.slice(4, 6) +
      "/" +
      formattedDate.slice(6, 8) +
      "/" +
      formattedDate.slice(0, 4);

    return finalDate;
  };

  const playerTeamFullName = data.resultSets[0].rowSet[0][6];
  const opponentTeam =
    teams[data.resultSets[0].rowSet[0][22]] == playerTeamFullName
      ? teams[data.resultSets[0].rowSet[0][23]]
      : teams[data.resultSets[0].rowSet[0][22]];
  const date = data.resultSets[0].rowSet[0][21];

  const header =
    headerInfo[0] !== ""
      ? `${playerName} ${"\n"} from ${formatDate(
          headerInfo[0]
        )} to ${formatDate(headerInfo[1])}`
      : `${playerName} ${"\n"} vs. ${opponentTeam} on ${formatDate(date)}`;

  const playerID = data.resultSets[0].rowSet[0][3];
  const useDefaultPic = (e) => {
    e.target.src = blank_pfp;
  };

  return (
    <div className="bg-white-500 p-3">
      <div className="flex items-center justify-center">
        <img
          src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${playerID}.png`}
          alt="Player Picture"
          onError={useDefaultPic}
          className="mr-3 w-48"
        />
        <p className="text-2xl whitespace-pre-line">{header}</p>
      </div>
    </div>
  );
};

export default ShotChartHeader;
