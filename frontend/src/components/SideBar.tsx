import React from "react";
import { FaRegNewspaper } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { PiBrain } from "react-icons/pi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineTextSnippet } from "react-icons/md";

const SideBar = () => {
  return (
    <nav className="sidebar w-[18%] h-screen rounded-lg p-5 overflow-y-auto overflow-x-hidden fixed top-0  transition-all  duration-300 ease-in-out -z-50">
      <div className="mt-20 transition-all  duration-300 ease-in-out">
        <div className=" bg-white p-5 rounded-lg flex flex-col gap-3 shadow-md transition-all  duration-300 ease-in-out">
          <div>
            <h1 className="font-semibold text-sm text-gray-400">New Feeds</h1>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-500 p-3 rounded-full">
                <FaRegNewspaper
                  style={{ color: "white", fontSize: "1.2rem" }}
                />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Newsfeed
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#EE5F28] p-3 rounded-full">
                <SlBadge style={{ color: "white", fontSize: "1.2rem" }} />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Badges
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#F11D60] to-[#FC5817] p-3 rounded-full">
                <MdOutlineChat style={{ color: "white", fontSize: "1.3rem" }} />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Chats
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-500 p-3 rounded-full">
                <MdOutlinePerson
                  style={{ color: "white", fontSize: "1.3rem" }}
                />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Profile
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-white p-5 rounded-lg flex flex-col gap-4 shadow-md mt-3 transition-all  duration-300 ease-in-out">
          <div>
            <h1 className="font-semibold text-sm text-gray-400">More</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <MdOutlineTextSnippet
                  style={{ color: "gray", fontSize: "1.5rem" }}
                />
              </div>
              <button className="font-semibold text-md  text-gray-400">
                Blogs
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <HiOutlineOfficeBuilding
                  style={{ color: "gray", fontSize: "1.5rem" }}
                />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Jobs
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <PiBrain style={{ color: "gray", fontSize: "1.5rem" }} />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Learning
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className=" rounded-full">
                <TbWorld style={{ color: "gray", fontSize: "1.5rem" }} />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Events
              </button>
            </div>
          </div>
        </div>

        <div className=" bg-white p-5 rounded-lg flex flex-col gap-4 shadow-md mt-3 transition-all  duration-300 ease-in-out">
          <div>
            <h1 className="font-semibold text-sm text-gray-400">Account</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className=" rounded-full">
                <MdOutlineSettings
                  style={{ color: "gray", fontSize: "1.5rem" }}
                />
              </div>
              <button className="font-semibold text-md  text-gray-400">
                Settings
              </button>
            </div>
            <div className="flex items-center gap-3 pl-[2px]">
              <div className="rounded-full">
                <MdLogout style={{ color: "gray", fontSize: "1.5rem" }} />
              </div>
              <button className="font-semibold text-md text-gray-400">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
