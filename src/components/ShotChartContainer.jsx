import React from "react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";
import { useState, useEffect } from "react";

const ShotChartContainer = ({ data, headerInfo }) => {
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
    <div className="bg-white-500 p-3">
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
      {showChart && data && (
        <>
          <ShotChartHeader data={data} headerInfo={headerInfo} />
          <ShotChartDisplay data={data} />
        </>
      )}
    </div>
  );
};

export default ShotChartContainer;
