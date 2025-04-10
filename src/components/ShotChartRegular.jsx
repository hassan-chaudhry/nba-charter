import React from "react";
import { teams, colors } from "../constants/constants.jsx";
import court from "../assets/images/court.png";
import { FaRegCircle } from "react-icons/fa6";
import { VscChromeClose } from "react-icons/vsc";

const ShotChartRegular = ({ data, showMakes, showMisses, showTeamColors }) => {
  const playerTeamFullName = data.resultSets[0].rowSet[0][6];

  // set default color values
  let primaryColor = "7,107,237";
  let secondaryColor = "237,49,7";

  // get team-specific colors for makes and misses
  let teamPrimaryColor;
  let teamSecondaryColor;
  try {
    const playerTeam = Object.keys(teams).find(
      (key) => teams[key] === playerTeamFullName
    );
    teamPrimaryColor = JSON.stringify(colors[playerTeam][0]).replace(
      /[\[\]]/g,
      ""
    );
    teamSecondaryColor = JSON.stringify(colors[playerTeam][1]).replace(
      /[\[\]]/g,
      ""
    );
  } catch (error) {
    console.error(
      "The player's team could not be found. This usually occurs when the team has changed names, relocated, or is no longer active in the NBA."
    );
  }

  // toggle team colors
  if (showTeamColors) {
    primaryColor = teamPrimaryColor;
    secondaryColor = teamSecondaryColor;
  }

  // get all shots from the data
  let allShots = [];
  for (let i = 0; i < data.resultSets[0].rowSet.length; i++) {
    // for each shot, get x- and y- coordinates & shot made/attempted flags
    let shot = {
      LOC_X: data.resultSets[0].rowSet[i][17],
      LOC_Y: data.resultSets[0].rowSet[i][18],
      SHOT_ATTEMPTED_FLAG: data.resultSets[0].rowSet[i][19],
      SHOT_MADE_FLAG: data.resultSets[0].rowSet[i][20],
    };
    allShots.push(shot);
  }

  return (
    <div className="bg-white-500 p-3">
      <div className="grid grid-cols-1 items-center justify-center">
        <div className="relative w-full max-w-[750px] aspect-[500/470]">
          <img
            src={court}
            alt="NBA Half Court"
            style={{ width: "100%", height: "100%" }}
          />
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
            viewBox="-250 -47.5 500 470"
            preserveAspectRatio="none"
          >
            {/* <circle // center of basket should be at (0,0)
              className="opacity-75"
              cx="0"
              cy="0"
              r="4"
              stroke="red"
              strokeWidth="5"
              fill="red"
            /> */}
            {allShots.map(({ LOC_X, LOC_Y, SHOT_MADE_FLAG }, index) =>
              showMakes && SHOT_MADE_FLAG === 1 ? ( // makes
                <circle
                  key={index}
                  className="opacity-75"
                  cx={LOC_X}
                  cy={LOC_Y}
                  r="4"
                  stroke={`rgb(${primaryColor})`}
                  strokeWidth="2"
                  fill="none"
                />
              ) : (
                showMisses && ( // misses
                  <g key={`${index} - 0`} className="opacity-75">
                    <line
                      key={`${index} - 1`}
                      x1={LOC_X - 4.5}
                      y1={LOC_Y - 4.5}
                      x2={LOC_X + 4.5}
                      y2={LOC_Y + 4.5}
                      stroke={`rgb(${secondaryColor})`}
                      strokeWidth="3"
                    />
                    <line
                      key={`${index} - 2`}
                      x1={LOC_X - 4.5}
                      y1={LOC_Y + 4.5}
                      x2={LOC_X + 4.5}
                      y2={LOC_Y - 4.5}
                      stroke={`rgb(${secondaryColor})`}
                      strokeWidth="3"
                    />
                  </g>
                )
              )
            )}
          </svg>
        </div>

        {/* shots legend */}
        <div className="grid grid-cols-1 mt-1">
          <svg viewBox="0 0 100 7">
            {/* make */}
            <circle
              key={"makeLegend"}
              className="opacity-75"
              cx={47}
              cy={2}
              r="1"
              stroke={`rgb(${primaryColor})`}
              strokeWidth="0.5"
              fill="none"
            />
            <text x="49" y="2.755" style={{ fontSize: "2.5px" }}>
              Make
            </text>

            {/* miss */}
            <g key={"missLegend"} className="opacity-75">
              <line
                key={"missLegend1"}
                x1={47 - 1}
                y1={5 - 1}
                x2={47 + 1}
                y2={5 + 1}
                stroke={`rgb(${secondaryColor})`}
                strokeWidth="0.65"
              />
              <line
                key={"missLegend2"}
                x1={47 - 1}
                y1={5 + 1}
                x2={47 + 1}
                y2={5 - 1}
                stroke={`rgb(${secondaryColor})`}
                strokeWidth="0.65"
              />
            </g>
            <text x="49" y="5.755" style={{ fontSize: "2.5px" }}>
              Miss
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ShotChartRegular;
