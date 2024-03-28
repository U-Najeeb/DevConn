import { FaRegNewspaper } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { TbWorld } from "react-icons/tb";
import { MdOutlinePerson } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdOutlineChat } from "react-icons/md";
import { PiBrain } from "react-icons/pi";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineTextSnippet } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../api/axiosConfig";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const SideBar = () => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const { mutate: logoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await useAxios.post("/auth/logout", {});
    },
    onSuccess: () => {
      setUserData(undefined);
      navigate("/login");
    },
  });

  const handleLogout: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    logoutMutation();
  };
  return (
    <nav className="pt-28 sidebar w-[20%] max-w-[20rem] h-full p-5 overflow-y-auto overflow-x-hidden fixed top-0  transition-all  duration-300 ease-in-out bg-[#070F2B]">
      <div className="transition-all  duration-300 ease-in-out rounded-lg">
        <div className=" bg-[#1B1A55] p-5 rounded-lg flex flex-col gap-3 shadow-md transition-all  duration-300 ease-in-out">
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
              <button className="font-semibold text-md text-white">
                Newsfeed
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#EE5F28] p-3 rounded-full">
                <SlBadge style={{ color: "white", fontSize: "1.2rem" }} />
              </div>
              <button className="font-semibold text-md text-white">
                Badges
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#F11D60] to-[#FC5817] p-3 rounded-full">
                <MdOutlineChat style={{ color: "white", fontSize: "1.3rem" }} />
              </div>
              <button className="font-semibold text-md text-white">
                Chats
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-900 to-blue-500 p-3 rounded-full">
                <MdOutlinePerson
                  style={{ color: "white", fontSize: "1.3rem" }}
                />
              </div>
              <button className="font-semibold text-md text-white">
                Profile
              </button>
            </div>
          </div>
        </div>
        <div className=" bg-[#1B1A55] p-5 rounded-lg flex flex-col gap-4 shadow-md mt-3 transition-all  duration-300 ease-in-out">
          <div>
            <h1 className="font-semibold text-sm text-gray-400">More</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <MdOutlineTextSnippet
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
              </div>
              <button className="font-semibold text-md  text-white">
                Blogs
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <FaSuitcase style={{ color: "white", fontSize: "1.4rem" }} />
              </div>
              <button className="font-semibold text-md text-white">Jobs</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full">
                <PiBrain style={{ color: "white", fontSize: "1.5rem" }} />
              </div>
              <button className="font-semibold text-md text-white">
                Learning
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className=" rounded-full">
                <TbWorld style={{ color: "white", fontSize: "1.5rem" }} />
              </div>
              <button className="font-semibold text-md text-white">
                Events
              </button>
            </div>
          </div>
        </div>

        <div className=" bg-[#1B1A55] p-5 rounded-lg flex flex-col gap-4 shadow-md mt-3 transition-all  duration-300 ease-in-out">
          <div>
            <h1 className="font-semibold text-sm text-gray-400">Account</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className=" rounded-full">
                <MdOutlineSettings
                  style={{ color: "white", fontSize: "1.5rem" }}
                />
              </div>
              <button className="font-semibold text-md  text-white">
                Settings
              </button>
            </div>
            <div className="flex items-center gap-3 pl-[2px]">
              <div className="rounded-full">
                <MdLogout style={{ color: "white", fontSize: "1.5rem" }} />
              </div>
              <button
                className="font-semibold text-md text-white"
                onClick={handleLogout}
              >
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
