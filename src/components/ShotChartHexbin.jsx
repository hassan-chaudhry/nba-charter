import React from "react";
import * as d3 from "d3";
import * as d3Hexbin from "d3-hexbin";
import court from "../assets/images/court.png";

const ShotChartHexbin = ({ data }) => {
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
  const colorScale = d3.scaleSequential(d3.interpolatePurples).domain([0, 1]); // low efficiency light purple = , high efficiency = dark purple

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
