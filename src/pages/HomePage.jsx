import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import logo from "/src/assets/images/logo-title.png";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToPrivacyPolicy = () => {
    navigate("/privacy-policy");
  };
  const navigateToTermsOfService = () => {
    navigate("/terms-of-service");
  };
  const navigateToContact = () => {
    navigate("/contact");
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-cover rounded-[20px] m-5">
      <div className="h-[calc(100vh-40px)] flex flex-col">
        {/* Main Content */}
        <div className="flex-1 pt-32">
          <div className="flex justify-center items-center m-5">
            <img
              className="mr-1 w-[75vw] sm:w-[55vw]"
              src={logo}
              alt="NBA Shot Charts"
            />
          </div>
          <SearchBar onSearch={() => {}} suggestion={""} userQuery={""} />
        </div>

        {/* Footer Info */}
        <div className="flex justify-center text-purple-800 pb-6">
          <text
            className="cursor-pointer hover:underline"
            onClick={navigateToPrivacyPolicy}
          >
            Privacy Policy
          </text>
          <text className="px-3">·</text>
          <text
            className="cursor-pointer hover:underline"
            onClick={navigateToTermsOfService}
          >
            Terms of Service
          </text>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
