import React from "react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";
import { useState } from "react";
import court from "../assets/images/nbahalfcourt.png";

const ShotChartContainer = ({ data, headerInfo }) => {
  if (!data) {
    return (
      <>
        <h1 className="flex items-center justify-center text-blue-400 text-xl font-bold mt-5 mb-5">
          Shot Chart
        </h1>

        <div className="bg-white-500 text-black">
          <div className="flex items-center justify-center">
            <div
              style={{ position: "relative", width: "750px", height: "705px" }}
            >
              <img
                src={court}
                alt="Empty NBA Half Court"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  console.log(data);

  return (
    <>
      <ShotChartHeader data={data} headerInfo={headerInfo} />
      <ShotChartDisplay data={data} />
    </>
  );
};

export default ShotChartContainer;
