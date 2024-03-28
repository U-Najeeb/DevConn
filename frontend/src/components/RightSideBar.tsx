import React from "react";
import { CgProfile } from "react-icons/cg";

const RightSideBar = () => {
  return (
    <div className="bg-[#1B1A55] w-1/4 rounded-lg shadow-md border-[1px] h-fit">
      <div className="rounded-lg  ">
        <div className="flex justify-between items-center p-4 bg-[#1B1A55] rounded-t-lg">
          <h1 className="text-white text-sm font-semibold">Connections</h1>
          <button className="text-[#3884fd] text-xs font-bold">See all</button>
        </div>
        <hr />
      </div>
      <div className="flex flex-col items-start ">
        <div className="w-full p-4 flex flex-col gap-1">
          <div className="text-white flex gap-4 items-center">
            <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
            <div>
              <h1 className="font-semibold text-[0.8rem]">Umair Najeeb</h1>
              <h2 className=" text-[0.8rem]">3 Hour ago</h2>
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full text-sm font-medium text-white">
              Confirm
            </button>
            <button className="bg-[#EEEEEE] px-6 py-2 rounded-full text-sm font-medium">
              Delete
            </button>
          </div>
        </div>

        <div className="w-full p-4 flex flex-col gap-2">
          <div className="text-white flex gap-4 items-center">
            <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
            <div>
              <h1 className="font-semibold text-[0.8rem]">Phil Dunphy</h1>
              <h2 className=" text-[0.8rem]">3 Hour ago</h2>
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full text-sm font-medium text-white">
              Confirm
            </button>
            <button className="bg-[#EEEEEE] px-6 py-2 rounded-full text-sm font-medium">
              Delete
            </button>
          </div>
        </div>

        <div className="w-full p-4 flex flex-col gap-4">
          <div className="text-white flex gap-4 items-center">
            <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
            <div>
              <h1 className="font-semibold text-[0.8rem]">Alex Dunphy</h1>
              <h2 className=" text-[0.8rem]">3 Hour ago</h2>
            </div>
          </div>

          <div className="flex justify-start gap-2">
            <button className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full text-sm font-medium text-white">
              Confirm
            </button>
            <button className="bg-[#EEEEEE] px-6 py-2 rounded-full text-sm font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
