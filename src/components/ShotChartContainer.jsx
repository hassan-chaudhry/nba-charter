import React, { forwardRef } from "react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";
import GamesInfo from "./GamesInfo";
import errorPic from "../assets/images/shot-chart-unavailable.jpg";
import { useState, useEffect } from "react";

const ShotChartContainer = forwardRef((props, ref) => {
  const { data, headerInfo } = props;
  const [showChart, setShowChart] = useState(false);
  const [isChartActive, setIsChartActive] = useState(false);

  // open Shot Chart tab when data loaded
  useEffect(() => {
    if (data) {
      setShowChart(true);
      setIsChartActive(true);
    }
  }, [data]);

  return (
    <div ref={ref} className="bg-white-500 p-3">
      <h1
        className={`${
          isChartActive ? "text-blue-500" : "text-gray-500"
        } hover:text-blue-500 text-2xl m-7`}
        onClick={() => {
          if (data) {
            setShowChart((prevState) => !prevState);
            setIsChartActive((prevState) => !prevState);
          }
        }}
      >
        Shot Chart
      </h1>
      {showChart &&
        (data.resultSets[0].rowSet.length !== 0 ? (
          <>
            <ShotChartHeader data={data} headerInfo={headerInfo} />
            <ShotChartDisplay data={data} />
            <GamesInfo data={data} />
          </>
        ) : (
          <div className="bg-white-500 p-10">
            <div className="flex items-center justify-center">
              <h1 className="text-xl text-center text-white bg-orange-400 rounded-[20px] mb-5 p-2 w-3/4">
                ⚠︎ The data for this game is unavailable. Check back after the
                game's over!
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={errorPic}
                alt="A picture of LeBron James kneeling on the court after Mario Hezonja blocks his potential game-winner."
                className="w-72"
              />
            </div>
          </div>
        ))}
    </div>
  );
});

export default ShotChartContainer;
