import React from "react";
import * as d3 from "d3";
import * as d3Hexbin from "d3-hexbin";
import court from "../assets/images/court.png";

const ShotChartHexbin = ({ data }) => {
  const leagueAvgs = data.resultSets[1].rowSet;

  // threes - 22-24 ft
  let aboveTheBreak3Center = [];
  let aboveTheBreak3Left = [];
  let aboveTheBreak3Right = [];
  let leftCorner3 = [];
  let rightCorner3 = [];

  // 16 to 24 ft
  let center16to24 = [];
  let leftCenter16to24 = [];
  let rightCenter16to24 = [];
  let left16to24 = [];
  let right16to24 = [];

  // 8 to 16 ft
  let center8to16 = [];
  let left8to16 = [];
  let right8to16 = [];

  // less than 8 ft
  let lessThan8 = [];

  for (let i = 0; i < leagueAvgs.length; i++) {
    // above the break 3s
    if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Center(C)"
    ) {
      aboveTheBreak3Center = leagueAvgs[i];
    } else if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Left Side Center(LC)"
    ) {
      aboveTheBreak3Left = leagueAvgs[i];
    } else if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Right Side Center(RC)"
    ) {
      aboveTheBreak3Right = leagueAvgs[i];
    }
    // left corner 3
    else if (leagueAvgs[i][1] === "Left Corner 3") {
      leftCorner3 = leagueAvgs[i];
    }
    // right corner 3
    else if (leagueAvgs[i][1] === "Right Corner 3") {
      rightCorner3 = leagueAvgs[i];
    }
    // 16 to 24 ft - center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Center(C)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      center16to24 = leagueAvgs[i];
    }
    // 16 to 24 - left center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Left Side Center(LC)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      leftCenter16to24 = leagueAvgs[i];
    }
    // 16 to 24 - right center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Right Side Center(RC)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      rightCenter16to24 = leagueAvgs[i];
    }
    // 16 to 24 ft - left
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Left Side(L)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      left16to24 = leagueAvgs[i];
    }
    // 16 to 24 ft - right
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Right Side(R)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      right16to24 = leagueAvgs[i];
    }
    // 8 to 16 ft - center
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Center(C)" &&
        leagueAvgs[i][3] === "8-16 ft.") ||
      (leagueAvgs[i][1] === "Mid-Range" &&
        leagueAvgs[i][2] === "Center(C)" &&
        leagueAvgs[i][3] === "8-16 ft.")
    ) {
      center8to16 = leagueAvgs[i];
    }
    // 8 to 16 ft - left
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Left Side(L)") ||
      (leagueAvgs[i][1] === "Mid-Range" &&
        leagueAvgs[i][2] === "Left Side(L)" &&
        leagueAvgs[i][3] === "8-16 ft.")
    ) {
      left8to16 = leagueAvgs[i];
    }
    // 8 to 16 ft - right
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Right Side(R)") ||
      (leagueAvgs[i][1] === "Mid-Range" &&
        leagueAvgs[i][2] === "Right Side(R)" &&
        leagueAvgs[i][3] === "8-16 ft.")
    ) {
      right8to16 = leagueAvgs[i];
    }
    // less than 8 ft
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Center(C)" &&
        leagueAvgs[i][3] === "Less Than 8 ft.") ||
      leagueAvgs[i][1] === "Restricted Area"
    ) {
      lessThan8.push([leagueAvgs[i]]);
    }
  }

  console.log("League Avgs:", leagueAvgs);

  console.log("aboveTheBreak3Center:", aboveTheBreak3Center);
  console.log("aboveTheBreak3Left:", aboveTheBreak3Left);
  console.log("aboveTheBreak3Right:", aboveTheBreak3Right);
  console.log("leftCorner3:", leftCorner3);
  console.log("rightCorner3:", rightCorner3);

  console.log("center16to24", center16to24);
  console.log("leftCenter16to24", leftCenter16to24);
  console.log("rightCenter16to24", rightCenter16to24);
  console.log("center16to24", center16to24);
  console.log("left16to24", left16to24);
  console.log("right16to24", right16to24);

  console.log("center8to16:", center8to16);
  console.log("left8to16:", left8to16);
  console.log("right8to16:", right8to16);

  console.log("lessThan8:", lessThan8);

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

  const hexbin = d3Hexbin
    .hexbin()
    .radius(10)
    .extent([
      [0, 0],
      [500, 470],
    ]);

  // Group shots into hexagonal bins
  const hexShots = hexbin(
    allShots.map((shot) => [shot.LOC_X, shot.LOC_Y, shot.SHOT_MADE_FLAG])
  ).map((hex) => {
    // Calculate efficiency: shots made / total shots
    const totalShots = hex.length;
    const madeShots = hex.filter((shot) => shot[2] === 1).length; // check if shot made
    const efficiency = totalShots > 0 ? madeShots / totalShots : 0;

    return {
      ...hex,
      totalShots, // Store shot count
      efficiency, // Store efficiency
    };
  });

  console.log("Hexbin Data:", hexShots);

  // Scale for color (efficiency)
  const colorScale = d3.scaleSequential(d3.interpolatePurples).domain([0, 1]); // low efficiency = light purple , high efficiency = dark purple

  return (
    <div className="bg-white-500 p-3">
      <div className="flex items-center justify-center">
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
            {hexShots.map((hex, index) => (
              <path
                key={index}
                d={`M${hex.x},${hex.y}` + hexbin.hexagon()}
                fill={colorScale(hex.efficiency)} // Color based on efficiency
                opacity={0.8}
              />
            ))}
          </svg>

          <div className="flex justify-center mt-1">
            <h1>FG% vs. League Average</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotChartHexbin;
