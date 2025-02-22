import React, { forwardRef, useRef } from "react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartDisplay from "./ShotChartDisplay";
import html2canvas from "html2canvas-pro";
import GamesInfo from "./GamesInfo";
import errorPic from "../assets/images/shot-chart-unavailable.jpg";
import { HiOutlineExclamation } from "react-icons/hi";
import { MdDownload } from "react-icons/md";

const ShotChartContainer = forwardRef((props, ref) => {
  const { data, headerInfo } = props;
  const [showChart, setShowChart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const shotChartRef = useRef(null);

  // open Shot Chart tab when data loaded
  useEffect(() => {
    if (data) {
      setShowChart(true);
    } else {
      setShowChart(false);
    }
  }, [data]);

  const handleDownload = async () => {
    const element = shotChartRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
    });

    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = "shotchart.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  return (
    <div ref={ref} className="bg-white-500 p-3">
      {data && (
        <>
          <div className="flex flex-col items-center m-5">
            <motion.div
              className="text-2xl text-black text-center font-bold relative cursor-default"
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              onClick={() => {
                if (data) {
                  setShowChart((prevState) => !prevState);
                }
              }}
            >
              Shot Chart
              <div
                className={`absolute left-0 h-1 bg-blue-500 rounded-xl transition-all duration-300 ease-in-out ${
                  hovered ? "w-full" : "w-0"
                } ${showChart ? "w-full" : "w-0"}`}
              ></div>
            </motion.div>
          </div>

          {showChart &&
            (data.resultSets[0].rowSet.length !== 0 ? (
              <div className="grid items-center justify-center">
                <div className="grid justify-end mr-5">
                  <button
                    className="bg-white-500 text-3xl border border-black rounded-md p-1 hover:bg-gray-100"
                    onClick={handleDownload}
                  >
                    <MdDownload />
                  </button>
                </div>
                <div ref={shotChartRef}>
                  <ShotChartHeader data={data} headerInfo={headerInfo} />
                  <ShotChartDisplay data={data} />
                  <div className="mb-4"></div>
                </div>
                <GamesInfo data={data} />
              </div>
            ) : (
              <div className="bg-white-500 p-10">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center bg-white-500 border-2 border-orange-400 text-xl text-center text-orange-400 border-orange-400 rounded-md mb-5 p-2 w-5/6">
                    <HiOutlineExclamation className="m-2 flex-shrink-0" />
                    <h1>
                      The data for this game is not yet available. Check back
                      after the game is over!
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
        </>
      )}
    </div>
  );
});

export default ShotChartContainer;
