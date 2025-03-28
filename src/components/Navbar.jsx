import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/images/logo-title.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-[20px] py-2 m-4">
      <div className="flex">
        <img
          className="h-16 w-auto ml-3 cursor-pointer"
          src={logo}
          alt="NBA Charter"
          onClick={handleClick}
        />
      </div>
    </nav>
  );
};

export default Navbar;
