import React from "react";
import { teams } from "../constants/constants.jsx";
import blank_pfp from "../assets/images/blank-profile-picture.png";

const ShotChartHeader = ({ data, headerInfo }) => {
  // get player name
  const playerName = JSON.stringify(
    data.resultSets[0].rowSet[0][4],
    null,
    2
  ).replace(/"/g, ""); // remove all double quotes

  // get player ID
  const playerID = data.resultSets[0].rowSet[0][3];

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

  // get the player team name and opponent team names
  const playerTeamFullName = data.resultSets[0].rowSet[0][6];
  const opponentTeam =
    teams[data.resultSets[0].rowSet[0][22]] == playerTeamFullName
      ? teams[data.resultSets[0].rowSet[0][23]]
      : teams[data.resultSets[0].rowSet[0][22]];
  const date = data.resultSets[0].rowSet[0][21];

  // compile header depending on whether a range of games, a season, or a single game is selected
  let header;
  if (headerInfo[0] === "range") {
    // prettier-ignore
    header = `${playerName} ${"\n"} from ${formatDate(headerInfo[1])} to ${formatDate(headerInfo[2])}`; // range of games
  } else if (headerInfo[0] === "season") {
    headerInfo[1] = headerInfo[1].replace("+", " ");
    headerInfo[2] = headerInfo[2].replace("+", " ");
    // prettier-ignore
    header = `${playerName} ${"\n"} during the ${headerInfo[1]} ${headerInfo[2]}`; // season of games
  } else {
    header = `${playerName} ${"\n"} vs. ${opponentTeam} on ${formatDate(date)}`; // single game
  }

  // default profile picture if image fails to load
  const useDefaultPic = (e) => {
    e.target.src = blank_pfp;
  };

  return (
    <div className="bg-white-500 p-3">
      <div className="flex items-center justify-center">
        <img
          src={`http://localhost:5000/image/playerpic?playerID=${playerID}`}
          alt="Player Picture"
          crossOrigin="anonymous"
          onError={useDefaultPic} // if image fails to load, use default image
          className="mr-3 w-48"
        />
        <p className="text-2xl whitespace-pre-line">{header}</p>
      </div>
    </div>
  );
};

export default ShotChartHeader;
