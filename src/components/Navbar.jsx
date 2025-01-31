import React from "react";
import logo from "/src/assets/images/temp-logo.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-5">
      <div className="flex items-center justify-center">
        <img
          className="mr-1"
          src={logo}
          alt="NBA Charter"
          style={{ width: "40px", height: "35px" }}
        />
        <div>NBA Charter</div>
      </div>
    </nav>
  );
};

export default Navbar;
