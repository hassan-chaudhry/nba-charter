import React from "react";
import { useState, useEffect } from "react";
import court from "../assets/images/nbahalfcourt.png";

const ShotChartDisplay = ({ data }) => {
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

  const playerTeam = data.resultSets[0].rowSet[0][22];
  const teamPrimaryColor = JSON.stringify(colors[playerTeam][0]).replace(
    /[\[\]]/g,
    ""
  );
  const teamSecondaryColor = JSON.stringify(colors[playerTeam][1]).replace(
    /[\[\]]/g,
    ""
  );

  let allShots = [];
  for (let i = 0; i < data.resultSets[0].rowSet.length; i++) {
    let shot = {
      LOC_X: data.resultSets[0].rowSet[i][17],
      LOC_Y: data.resultSets[0].rowSet[i][18],
      SHOT_ATTEMPTED_FLAG: data.resultSets[0].rowSet[i][19],
      SHOT_MADE_FLAG: data.resultSets[0].rowSet[i][20],
    };
    allShots.push(shot);
  }

  return (
    <>
      <div className="bg-white-500 p-3">
        <div className="flex items-center justify-center">
          <div
            style={{ position: "relative", width: "750px", height: "705px" }}
          >
            <img
              src={court}
              alt="NBA Court"
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
              {allShots.map(({ LOC_X, LOC_Y, SHOT_MADE_FLAG }, index) =>
                SHOT_MADE_FLAG === 1 ? (
                  <circle
                    key={index}
                    cx={LOC_X}
                    cy={LOC_Y}
                    r="5"
                    stroke={`rgb(${teamPrimaryColor})`}
                    strokeWidth="2"
                    fill="none"
                  />
                ) : (
                  <g key={`${index} - 0`}>
                    <line
                      key={`${index} - 1`}
                      x1={LOC_X - 5}
                      y1={LOC_Y - 5}
                      x2={LOC_X + 5}
                      y2={LOC_Y + 5}
                      stroke={`rgb(${teamSecondaryColor})`}
                      strokeWidth="2"
                    />
                    <line
                      key={`${index} - 2`}
                      x1={LOC_X - 5}
                      y1={LOC_Y + 5}
                      x2={LOC_X + 5}
                      y2={LOC_Y - 5}
                      stroke={`rgb(${teamSecondaryColor})`}
                      strokeWidth="2"
                    />
                  </g>
                )
              )}
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShotChartDisplay;
