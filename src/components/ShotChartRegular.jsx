import React from "react";
import { teams, colors } from "../constants/constants.jsx";
import court from "../assets/images/court.png";
import { FaRegCircle } from "react-icons/fa6";
import { VscChromeClose } from "react-icons/vsc";

const ShotChartRegular = ({ data, showMakes, showMisses, showTeamColors }) => {
  // get team-specific colors for makes and misses
  const playerTeamFullName = data.resultSets[0].rowSet[0][6];

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

  let primaryColor;
  let secondaryColor;

  // toggle team colors
  if (showTeamColors) {
    // team-specific colors
    primaryColor = teamPrimaryColor;
    secondaryColor = teamSecondaryColor;
  } else {
    // default colors
    primaryColor = "7,107,237";
    secondaryColor = "237,49,7";
  }

  // convert rgb to hex so that chart (uses rgb) and legend (uses hex) colors are in sync
  function valueToHex(v) {
    // convert number to hex
    let hex = v.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(rgb) {
    // convert rgb string to hex string

    if (!rgb) return "#000000"; // default to black in case of error

    const rgbValues = rgb.split(",");
    const r = Number(rgbValues[0]);
    const g = Number(rgbValues[1]);
    const b = Number(rgbValues[2]);
    return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
  }

  let primaryColorHex = rgbToHex(primaryColor);
  let secondaryColorHex = rgbToHex(secondaryColor);

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
        <div className="relative w-full max-w-[800px] aspect-[500/470]">
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
        <div className="grid grid-cols-1">
          <div className="flex justify-center items-center -mb-5">
            <h1
              className="text-3xl sm:text-5xl mr-1"
              style={{ color: primaryColorHex }}
            >
              ⚬
            </h1>
            <h1 className="text-m sm:text-x mt-1">Make</h1>
          </div>

          <div className="flex justify-center items-center">
            <h1
              className="text-3xl sm:text-5xl mr-2"
              style={{ color: secondaryColorHex }}
            >
              ⨯
            </h1>
            <h1 className="text-m sm:text-xl mt-1">Miss</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotChartRegular;
