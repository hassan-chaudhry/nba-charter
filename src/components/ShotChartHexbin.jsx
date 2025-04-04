import React from "react";
import * as d3 from "d3";
import * as d3Hexbin from "d3-hexbin";
import court from "../assets/images/court.png";

const ShotChartHexbin = ({ data }) => {
  const leagueAvgs = data.resultSets[1].rowSet;

  // threes - 22-24 ft
  let aboveTheBreak3CenterLA = [];
  let aboveTheBreak3LeftLA = [];
  let aboveTheBreak3RightLA = [];
  let leftCorner3LA = [];
  let rightCorner3LA = [];

  // 16 to 24 ft
  let center16to24LA = [];
  let leftCenter16to24LA = [];
  let rightCenter16to24LA = [];
  let left16to24LA = [];
  let right16to24LA = [];

  // 8 to 16 ft
  let center8to16LA = [];
  let left8to16LA = [];
  let right8to16LA = [];

  // less than 8 ft
  let lessThan8LA = [];

  for (let i = 0; i < leagueAvgs.length; i++) {
    // above the break 3s
    if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Center(C)"
    ) {
      aboveTheBreak3CenterLA = leagueAvgs[i];
    } else if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Left Side Center(LC)"
    ) {
      aboveTheBreak3LeftLA = leagueAvgs[i];
    } else if (
      leagueAvgs[i][1] === "Above the Break 3" &&
      leagueAvgs[i][2] === "Right Side Center(RC)"
    ) {
      aboveTheBreak3RightLA = leagueAvgs[i];
    }
    // left corner 3
    else if (leagueAvgs[i][1] === "Left Corner 3") {
      leftCorner3LA = leagueAvgs[i];
    }
    // right corner 3
    else if (leagueAvgs[i][1] === "Right Corner 3") {
      rightCorner3LA = leagueAvgs[i];
    }
    // 16 to 24 ft - center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Center(C)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      center16to24LA = leagueAvgs[i];
    }
    // 16 to 24 - left center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Left Side Center(LC)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      leftCenter16to24LA = leagueAvgs[i];
    }
    // 16 to 24 - right center
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Right Side Center(RC)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      rightCenter16to24LA = leagueAvgs[i];
    }
    // 16 to 24 ft - left
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Left Side(L)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      left16to24LA = leagueAvgs[i];
    }
    // 16 to 24 ft - right
    else if (
      leagueAvgs[i][1] === "Mid-Range" &&
      leagueAvgs[i][2] === "Right Side(R)" &&
      leagueAvgs[i][3] === "16-24 ft."
    ) {
      right16to24LA = leagueAvgs[i];
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
      center8to16LA.push(leagueAvgs[i]);
    }
    // 8 to 16 ft - left
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Left Side(L)") ||
      (leagueAvgs[i][1] === "Mid-Range" &&
        leagueAvgs[i][2] === "Left Side(L)" &&
        leagueAvgs[i][3] === "8-16 ft.")
    ) {
      left8to16LA.push(leagueAvgs[i]);
    }
    // 8 to 16 ft - right
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Right Side(R)") ||
      (leagueAvgs[i][1] === "Mid-Range" &&
        leagueAvgs[i][2] === "Right Side(R)" &&
        leagueAvgs[i][3] === "8-16 ft.")
    ) {
      right8to16LA.push(leagueAvgs[i]);
    }
    // less than 8 ft
    else if (
      (leagueAvgs[i][1] === "In The Paint (Non-RA)" &&
        leagueAvgs[i][2] === "Center(C)" &&
        leagueAvgs[i][3] === "Less Than 8 ft.") ||
      leagueAvgs[i][1] === "Restricted Area"
    ) {
      lessThan8LA.push(leagueAvgs[i]);
    }
  }

  // console.log("League Avgs:", leagueAvgs);

  // console.log("aboveTheBreak3CenterLA:", aboveTheBreak3CenterLA);
  // console.log("aboveTheBreak3LeftLA:", aboveTheBreak3LeftLA);
  // console.log("aboveTheBreak3RightLA:", aboveTheBreak3RightLA);
  // console.log("leftCorner3LA:", leftCorner3LA);
  // console.log("rightCorner3LA:", rightCorner3LA);

  // console.log("center16to24LA", center16to24LA);
  // console.log("leftCenter16to24LA", leftCenter16to24LA);
  // console.log("rightCenter16to24LA", rightCenter16to24LA);
  // console.log("left16to24LA", left16to24LA);
  // console.log("right16to24LA", right16to24LA);

  // console.log("center8to16LA:", center8to16LA);
  // console.log("left8to16LA:", left8to16LA);
  // console.log("right8to16LA:", right8to16LA);

  // console.log("lessThan8LA:", lessThan8LA);

  // threes - 22-24 ft
  let aboveTheBreak3CenterPlayer = [];
  let aboveTheBreak3LeftPlayer = [];
  let aboveTheBreak3RightPlayer = [];
  let leftCorner3Player = [];
  let rightCorner3Player = [];

  // 16 to 24 ft
  let center16to24Player = [];
  let leftCenter16to24Player = [];
  let rightCenter16to24Player = [];
  let left16to24Player = [];
  let right16to24Player = [];

  // 8 to 16 ft
  let center8to16Player = [];
  let left8to16Player = [];
  let right8to16Player = [];

  // less than 8 ft
  let lessThan8Player = [];

  let allShots = [];
  for (let i = 0; i < data.resultSets[0].rowSet.length; i++) {
    let shot = {
      LOC_X: data.resultSets[0].rowSet[i][17],
      LOC_Y: data.resultSets[0].rowSet[i][18],
      SHOT_ATTEMPTED_FLAG: data.resultSets[0].rowSet[i][19],
      SHOT_MADE_FLAG: data.resultSets[0].rowSet[i][20],
      SHOT_ZONE_BASIC: data.resultSets[0].rowSet[i][13],
      SHOT_ZONE_AREA: data.resultSets[0].rowSet[i][14],
      SHOT_ZONE_RANGE: data.resultSets[0].rowSet[i][15],
    };
    allShots.push(shot);

    // above the break 3s
    if (
      shot.SHOT_ZONE_BASIC === "Above the Break 3" &&
      shot.SHOT_ZONE_AREA === "Center(C)"
    ) {
      aboveTheBreak3CenterPlayer.push(shot);
    } else if (
      shot.SHOT_ZONE_BASIC === "Above the Break 3" &&
      shot.SHOT_ZONE_AREA === "Left Side Center(LC)"
    ) {
      aboveTheBreak3LeftPlayer.push(shot);
    } else if (
      shot.SHOT_ZONE_BASIC === "Above the Break 3" &&
      shot.SHOT_ZONE_AREA === "Right Side Center(RC)"
    ) {
      aboveTheBreak3RightPlayer.push(shot);
    }
    // left corner 3
    else if (shot.SHOT_ZONE_BASIC === "Left Corner 3") {
      leftCorner3Player.push(shot);
    }
    // right corner 3
    else if (shot.SHOT_ZONE_BASIC === "Right Corner 3") {
      rightCorner3Player.push(shot);
    }
    // 16 to 24 ft - center
    else if (
      shot.SHOT_ZONE_BASIC === "Mid-Range" &&
      shot.SHOT_ZONE_AREA === "Center(C)" &&
      shot.SHOT_ZONE_RANGE === "16-24 ft."
    ) {
      center16to24Player.push(shot);
    }
    // 16 to 24 - left center
    else if (
      shot.SHOT_ZONE_BASIC === "Mid-Range" &&
      shot.SHOT_ZONE_AREA === "Left Side Center(LC)" &&
      shot.SHOT_ZONE_RANGE === "16-24 ft."
    ) {
      leftCenter16to24Player.push(shot);
    }
    // 16 to 24 - right center
    else if (
      shot.SHOT_ZONE_BASIC === "Mid-Range" &&
      shot.SHOT_ZONE_AREA === "Right Side Center(RC)" &&
      shot.SHOT_ZONE_RANGE === "16-24 ft."
    ) {
      rightCenter16to24Player.push(shot);
    }
    // 16 to 24 ft - left
    else if (
      shot.SHOT_ZONE_BASIC === "Mid-Range" &&
      shot.SHOT_ZONE_AREA === "Left Side(L)" &&
      shot.SHOT_ZONE_RANGE === "16-24 ft."
    ) {
      left16to24Player.push(shot);
    }
    // 16 to 24 ft - right
    else if (
      shot.SHOT_ZONE_BASIC === "Mid-Range" &&
      shot.SHOT_ZONE_AREA === "Right Side(R)" &&
      shot.SHOT_ZONE_RANGE === "16-24 ft."
    ) {
      right16to24Player.push(shot);
    }
    // 8 to 16 ft - center
    else if (
      (shot.SHOT_ZONE_BASIC === "In The Paint (Non-RA)" &&
        shot.SHOT_ZONE_AREA === "Center(C)" &&
        shot.SHOT_ZONE_RANGE === "8-16 ft.") ||
      (shot.SHOT_ZONE_BASIC === "Mid-Range" &&
        shot.SHOT_ZONE_AREA === "Center(C)" &&
        shot.SHOT_ZONE_RANGE === "8-16 ft.")
    ) {
      center8to16Player.push(shot);
    }
    // 8 to 16 ft - left
    else if (
      (shot.SHOT_ZONE_BASIC === "In The Paint (Non-RA)" &&
        shot.SHOT_ZONE_AREA === "Left Side(L)") ||
      (shot.SHOT_ZONE_BASIC === "Mid-Range" &&
        shot.SHOT_ZONE_AREA === "Left Side(L)" &&
        shot.SHOT_ZONE_RANGE === "8-16 ft.")
    ) {
      left8to16Player.push(shot);
    }
    // 8 to 16 ft - right
    else if (
      (shot.SHOT_ZONE_BASIC === "In The Paint (Non-RA)" &&
        shot.SHOT_ZONE_AREA === "Right Side(R)") ||
      (shot.SHOT_ZONE_BASIC === "Mid-Range" &&
        shot.SHOT_ZONE_AREA === "Right Side(R)" &&
        shot.SHOT_ZONE_RANGE === "8-16 ft.")
    ) {
      right8to16Player.push(shot);
    }
    // less than 8 ft
    else if (
      (shot.SHOT_ZONE_BASIC === "In The Paint (Non-RA)" &&
        shot.SHOT_ZONE_AREA === "Center(C)" &&
        shot.SHOT_ZONE_RANGE === "Less Than 8 ft.") ||
      shot.SHOT_ZONE_BASIC === "Restricted Area"
    ) {
      lessThan8Player.push(shot);
    }
  }

  let aboveTheBreak3CenterPlayerFGPercent = 0;
  let aboveTheBreak3CenterPlayerShotsMade = 0;

  for (let i = 0; i < aboveTheBreak3CenterPlayer.length; i++) {
    if (aboveTheBreak3CenterPlayer[i].SHOT_MADE_FLAG === 1) {
      aboveTheBreak3CenterPlayerShotsMade += 1;
    }
  }

  aboveTheBreak3CenterPlayerFGPercent =
    aboveTheBreak3CenterPlayerShotsMade / aboveTheBreak3CenterPlayer.length;

  console.log("FG% vs. LA");
  console.log(
    "Above The Break 3 - Center (Player, LA):",
    aboveTheBreak3CenterPlayerFGPercent,
    aboveTheBreak3CenterLA[6]
  );

  // console.log("Player Shot Chart Location Specifics:");

  // console.log("aboveTheBreak3CenterPlayer:", aboveTheBreak3CenterPlayer);
  // console.log("aboveTheBreak3LeftPlayer:", aboveTheBreak3LeftPlayer);
  // console.log("aboveTheBreak3RightPlayer:", aboveTheBreak3RightPlayer);
  // console.log("leftCorner3Player:", leftCorner3Player);
  // console.log("rightCorner3Player:", rightCorner3Player);

  // console.log("center16to24Player", center16to24Player);
  // console.log("leftCenter16to24Player", leftCenter16to24Player);
  // console.log("rightCenter16to24Player", rightCenter16to24Player);
  // console.log("left16to24Player", left16to24Player);
  // console.log("right16to24Player", right16to24Player);

  // console.log("center8to16Player:", center8to16Player);
  // console.log("left8to16Player:", left8to16Player);
  // console.log("right8to16Player:", right8to16Player);

  // console.log("lessThan8Player:", lessThan8Player);

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
