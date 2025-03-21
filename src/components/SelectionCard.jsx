import React from "react";

const SelectionCard = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-white-500 border-4 border-purple-300 hover:border-purple-500 rounded-[20px] p-5 m-2 h-72">
      <div className="flex flex-col items-center text-center w-full">
        {children}
      </div>
    </div>
  );
};

export default SelectionCard;
