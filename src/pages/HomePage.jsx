import React from "react";
import SearchBar from "../components/SearchBar";
import logo from "/src/assets/images/logo-title.png";

const HomePage = () => {
  return (
    <div
      className={
        "bg-gradient-to-r from-purple-500 to-indigo-500 bg-cover rounded-[20px] m-5"
      }
    >
      <div className="h-[calc(100vh-40px)] flex justify-center sm:items-center translate-y-16 sm:-translate-y-24">
        <div>
          <div className="flex justify-center items-center m-5">
            <img
              className="mr-1 w-[75vw] sm:w-[55vw]"
              src={logo}
              alt="NBA Charter"
            />
          </div>
          <SearchBar onSearch={() => {}} suggestion={""} userQuery={""} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
