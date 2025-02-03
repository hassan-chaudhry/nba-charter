import React from "react";
import logo from "/src/assets/images/temp-logo.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white rounded-[20px] p-5 m-5">
      <div className="flex">
        <img
          className="mr-1"
          src={logo}
          alt="NBA Charter"
          style={{ width: "40px", height: "35px" }}
        />
        <div className="text-2xl">NBA Charter</div>
      </div>
    </nav>
  );
};

export default Navbar;
