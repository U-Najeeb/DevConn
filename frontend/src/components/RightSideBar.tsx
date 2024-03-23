import React from "react";

const RightSideBar = () => {
  return (
    <div className="bg-white w-1/4 rounded-lg shadow-md border-2">
      <div className="rounded-lg ">
        <div className="flex justify-between items-center p-4 bg-[#1B1A55] rounded-t-lg">
          <h1 className="text-white text-sm font-semibold">Connections</h1>
          <button className="text-[#3884fd] text-xs font-bold">See all</button>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default RightSideBar;
