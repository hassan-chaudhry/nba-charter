import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import ShotChartHeader from "./ShotChartHeader";
import ShotChartRegular from "./ShotChartRegular";
import ShotChartHexbin from "./ShotChartHexbin";
import html2canvas from "html2canvas-pro";
import GamesInfo from "./GamesInfo";
import errorPic from "../assets/images/shot-chart-unavailable.jpg";
import xoPic from "../assets/images/xo-icon.png";
import { Tooltip } from "react-tooltip";
import { HiOutlineExclamation } from "react-icons/hi";
import { TbHexagons } from "react-icons/tb";
import { MdDownload } from "react-icons/md";
import { CgOptions } from "react-icons/cg";

const ShotChartContainer = forwardRef((props, ref) => {
  const { data, headerInfo } = props;
  const [showChart, setShowChart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showRegChart, setShowRegChart] = useState(true);
  const [showHexbinChart, setShowHexbinChart] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [makesChecked, setMakesChecked] = useState(true);
  const [missesChecked, setMissesChecked] = useState(true);
  const [colorsChecked, setColorsChecked] = useState(true);

  const shotChartRef = useRef(null);
  const optionsButtonRef = useRef(null);
  const optionsPopoverRef = useRef(null);

  // open Shot Chart tab when data loaded
  useEffect(() => {
    if (data) {
      setShowChart(true);
    } else {
      setShowChart(false);
    }
  }, [data]);

  // switch between displaying regular chart and hexbin chart
  const handleRegChartSwitch = () => {
    setShowRegChart(true);
    setShowHexbinChart(false);
  };
  const handleHexbinChartSwitch = () => {
    setShowRegChart(false);
    setShowHexbinChart(true);
  };

  // download chart using html2canvas
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

  // control options on regular chart
  const handleOptions = () => {
    setShowOptions((prevState) => !prevState);
  };

  const handleMakesChange = () => {
    setMakesChecked(!makesChecked);
  };
  const handleMissesChange = () => {
    setMissesChecked(!missesChecked);
  };
  const handleColorsChange = () => {
    setColorsChecked(!colorsChecked);
  };

  ////////////////////////////
  //   HANDLE DOM CHANGES   //
  ////////////////////////////

  useEffect(() => {
    // Close options popover when clicking elsewhere
    const handleClickOutsideOptions = (e) => {
      if (
        optionsButtonRef.current &&
        !optionsButtonRef.current.contains(e.target) &&
        optionsPopoverRef.current &&
        !optionsPopoverRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideOptions);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideOptions);
    };
  }, []);

  return (
    <div ref={ref} className="bg-white">
      {data ? (
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
                className={`absolute left-0 h-1 bg-purple-500 rounded-xl transition-all duration-300 ease-in-out ${
                  hovered ? "w-full" : "w-0"
                } ${showChart ? "w-full" : "w-0"}`}
              ></div>
            </motion.div>
          </div>

          {showChart &&
            (data.resultSets[0].rowSet.length !== 0 ? (
              <div className="grid items-center justify-center">
                {/* chart settings bar */}
                <div className="flex justify-between">
                  {/* select chart */}
                  <div className="flex bg-white border border-black rounded-md text-3xl ml-3">
                    <button
                      className={`${
                        showRegChart ? "bg-purple-500" : ""
                      } flex items-center rounded-md hover:bg-purple-300 p-1`}
                    >
                      <a
                        data-tooltip-id="RegChartTip"
                        data-tooltip-html={`<p class="text-lg"> Makes & Misses chart</p>`}
                        data-tooltip-place="bottom"
                      >
                        <img
                          src={xoPic}
                          alt="xo"
                          className="w-8 items-center"
                          onClick={handleRegChartSwitch}
                        />
                      </a>
                      <Tooltip id="RegChartTip" />
                    </button>
                    <button
                      className={`${
                        showHexbinChart ? "bg-purple-500" : ""
                      } flex items-center rounded-md hover:bg-purple-300 p-1`}
                    >
                      <a
                        data-tooltip-id="RegChartTip"
                        data-tooltip-html={`<p class="text-lg"> Field Goal % vs. League Average chart </p>`}
                        data-tooltip-place="bottom"
                      >
                        <TbHexagons
                          onClick={handleHexbinChartSwitch}
                          className="w-8 items-center"
                        />
                      </a>
                      <Tooltip id="HexbinChartTip" />
                    </button>
                  </div>

                  {/* options button */}
                  <div className="mr-3 relative">
                    {showRegChart && (
                      <button
                        ref={optionsButtonRef}
                        className={`${
                          showOptions ? "bg-purple-500" : "bg-white"
                        } text-3xl border border-black rounded-md p-1 hover:bg-purple-300 mr-1`}
                        onClick={handleOptions}
                      >
                        <CgOptions />
                      </button>
                    )}
                    {showOptions && (
                      <div
                        ref={optionsPopoverRef}
                        className="text-lg mt-1 absolute top-10 right-0"
                      >
                        <div className="grid grid-cols-1 bg-white border border-black shadow-md rounded-md p-2 w-56">
                          <div className="text-center underline">Options</div>
                          <div className="text-left">
                            <input // toggle makes
                              type="checkbox"
                              className="m-2"
                              checked={makesChecked}
                              onChange={handleMakesChange}
                            />
                            Makes
                          </div>
                          <div className="text-left">
                            <input // toggle misses
                              type="checkbox"
                              className="m-2"
                              checked={missesChecked}
                              onChange={handleMissesChange}
                            />
                            Misses
                          </div>
                          <div className="text-left">
                            <input // toggle between team or default colors (for visiiblity)
                              type="checkbox"
                              className="m-2"
                              checked={colorsChecked}
                              onChange={handleColorsChange}
                            />
                            Team Colors
                          </div>
                        </div>
                      </div>
                    )}

                    {/* download button */}
                    <button
                      className="bg-white text-3xl border border-black rounded-md p-1 hover:bg-purple-300"
                      onClick={handleDownload}
                    >
                      <MdDownload />
                    </button>
                  </div>
                </div>

                {/* shot charts */}
                <div ref={shotChartRef}>
                  <ShotChartHeader data={data} headerInfo={headerInfo} />
                  {showRegChart ? (
                    <ShotChartRegular
                      data={data}
                      showMakes={makesChecked}
                      showMisses={missesChecked}
                      showTeamColors={colorsChecked}
                    />
                  ) : (
                    <ShotChartHexbin data={data} />
                  )}
                  <div className="mb-1"></div>
                </div>
                <GamesInfo data={data} />
              </div>
            ) : (
              // if no data available, show error message
              <div className="bg-white-500 p-10">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center bg-white-500 border-2 border-orange-400 text-xl text-center text-orange-400 rounded-md mb-5 p-2 w-5/6">
                    <HiOutlineExclamation className="m-2 flex-shrink-0" />
                    <h1>
                      The data for this game is not available. If the game is
                      still being played, check back after it's over!
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
      ) : (
        <div className="py-10"></div>
      )}
    </div>
  );
});

export default ShotChartContainer;
