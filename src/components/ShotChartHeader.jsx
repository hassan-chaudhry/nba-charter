import React from "react";
import { teams } from "../constants/constants.jsx";
import blank_pfp from "../assets/images/blank-profile-picture.png";

const ShotChartHeader = ({ shotChartData, headerInfo }) => {
  // get player name
  const playerName = JSON.stringify(
    shotChartData.resultSets[0].rowSet[0][4],
    null,
    2
  ).replace(/"/g, ""); // remove all double quotes

  // get player ID for picture
  const playerID = shotChartData.resultSets[0].rowSet[0][3];

  // default profile picture if image fails to load
  const useDefaultPic = (e) => {
    e.target.src = blank_pfp;
  };

  // connect to backend server to get player pic
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // get date(s)
  const formatDate = (date) => {
    // format the date from YYYY-MM-DD to MM/DD/YYYY
    const formattedDate = date.replaceAll("-", "");
    const finalDate =
      formattedDate.slice(4, 6) +
      "/" +
      formattedDate.slice(6, 8) +
      "/" +
      formattedDate.slice(0, 4);

    return finalDate;
  };

  // compile header depending on whether a range of games, a season, or a single game is selected
  let header;
  // Select By Range
  if (headerInfo[0] === "range") {
    // prettier-ignore
    header = `${playerName} ${"\n"} from ${formatDate(headerInfo[1])} to ${formatDate(headerInfo[2])}`; // range of games
  }
  // Select by Season
  else if (headerInfo[0] === "season") {
    headerInfo[1] = headerInfo[1].replace("+", " ");
    headerInfo[2] = headerInfo[2].replace("+", " ");
    // prettier-ignore
    header = `${playerName} ${"\n"} during the ${headerInfo[1]} ${headerInfo[2]}`; // season of games
  }
  // Select Single Game (Select Recent Games or Select by Game ID)
  else {
    // get opponent team name
    const playerTeamFullName = shotChartData.resultSets[0].rowSet[0][6];
    const opponentTeam =
      teams[shotChartData.resultSets[0].rowSet[0][22]] == playerTeamFullName
        ? teams[shotChartData.resultSets[0].rowSet[0][23]]
        : teams[shotChartData.resultSets[0].rowSet[0][22]];
    const date = shotChartData.resultSets[0].rowSet[0][21];

    header = `${playerName} ${"\n"} vs. ${opponentTeam} on ${formatDate(date)}`; // single game
  }

  return (
    <div className="bg-white-500 p-3">
      <div className="flex items-center justify-center">
        <img
          src={`${baseURL}/image/playerpic?playerID=${playerID}`}
          alt="Player Picture"
          crossOrigin="anonymous"
          onError={useDefaultPic} // if image fails to load, use default image
          className="mr-3 w-32 sm:w-48"
        />
        <p className="text-xl sm:text-2xl whitespace-pre-line">{header}</p>
      </div>
    </div>
  );
};

export default ShotChartHeader;
