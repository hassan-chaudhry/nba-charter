import React, { forwardRef } from "react";
import { useState, useEffect } from "react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";
import GamesInfo from "./GamesInfo";
import errorPic from "../assets/images/shot-chart-unavailable.jpg";
import { HiOutlineExclamation } from "react-icons/hi";

const ShotChartContainer = forwardRef((props, ref) => {
  const { data, headerInfo } = props;
  const [showChart, setShowChart] = useState(false);
  const [isChartActive, setIsChartActive] = useState(false);

  // open Shot Chart tab when data loaded
  useEffect(() => {
    if (data) {
      setShowChart(true);
      setIsChartActive(true);
    } else {
      setShowChart(false);
      setIsChartActive(false);
    }
  }, [data]);

  return (
    <div ref={ref} className="bg-white-500 p-3">
      <div className="flex items-center justify-center">
        <h1
          className={`${
            isChartActive ? "bg-blue-400" : "bg-gray-500"
          } hover:bg-blue-400 text-2xl text-white text-center max-w-2xl m-7 px-12 py-3 rounded-[20px]`}
          onClick={() => {
            if (data) {
              setShowChart((prevState) => !prevState);
              setIsChartActive((prevState) => !prevState);
            }
          }}
        >
          Shot Chart
        </h1>
      </div>
      {showChart &&
        data &&
        (data.resultSets[0].rowSet.length !== 0 ? (
          <>
            <ShotChartHeader data={data} headerInfo={headerInfo} />
            <ShotChartDisplay data={data} />
            <GamesInfo data={data} />
          </>
        ) : (
          <div className="bg-white-500 p-10">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center bg-white-500 border-2 border-orange-400 text-xl text-center text-orange-400 border-orange-400 rounded-md mb-5 p-2 w-5/6">
                <HiOutlineExclamation className="m-2 flex-shrink-0" />
                <h1>
                  The data for this game is not yet available. Check back after
                  the game is over!
                </h1>
              </div>
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
