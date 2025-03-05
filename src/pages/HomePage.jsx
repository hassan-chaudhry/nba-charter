import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import logo from "/src/assets/images/temp-logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleEnter = (query) => {
    navigate("/results", { state: { query: query } });
  };

  return (
    <div className="items-center">
      <div className="flex justify-center items-center m-5">
        <img
          className="mr-1"
          src={logo}
          alt="NBA Charter"
          style={{ width: "40px", height: "35px" }}
        />
        <div className="text-2xl">NBA Charter</div>
      </div>
      <SearchBar onSearch={handleEnter} suggestion={""} userQuery={""} />
    </div>
  );
};

export default HomePage;
