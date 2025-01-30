import React from "react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";

const ShotChartContainer = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-white-500 text-black p-10">
        <div className="flex items-center justify-center"></div>
      </div>
    );
  }

  console.log(data);

  return (
    <>
      <ShotChartHeader data={data} />
      <ShotChartDisplay data={data} />
    </>
  );
};

export default ShotChartContainer;
