import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import logo from "/images/Devcon.png";
import { IoIosSearch } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { MdPerson, MdGroups } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { baseURL, useAxios } from "../api/axiosConfig";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { UserTypes } from "../types/User";
import { FiArrowRightCircle } from "react-icons/fi";

const Navbar = () => {
  const { userData } = useUserContext();
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const { status, data } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await useAxios.get("/users/");
      return response.data.users;
    },
  });

  const filtered = data?.filter((person: UserTypes) =>
    `${person.firstName} ${person.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
    if (!(e.target.value.length > 0)) {
      return setIsVisible(false);
    }
    setIsVisible(true);
  };

  const handleIconClick = (icon: string) => {
    navigate(icon === "home" ? "/" : `/${icon}`);
    setIsActive(icon);
  };

  const handleModalPopup: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  const handlePersonProfile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    person: UserTypes
  ) => {
    e.preventDefault();
    navigate(`/profile/${person._id}`);
    setIsVisible(false);
    setSearchText("");
  };

  return (
    <div className="nav--container p-2 flex justify-center items-center w-full shadow-md z-50 bg-[#070F2B] fixed top-0">
      <div className="nav--wrapper justify-between flex items-center p-2 w-full max-w-[100rem] z-50">
        <div className="w-1/4">
          <img src={logo} alt="logo" className="w-1/2" />
        </div>
        <div className="w-1/4 relative max-w-[23rem]">
          <form className="">
            <div className="flex justify-center items-center rounded-full px-4 bg-[#535C91]">
              <IoIosSearch style={{ color: "white" }} />
              <input
                type="text"
                value={searchText}
                name="search--bar"
                placeholder="Search"
                className="outline-0 w-40 sm:w-60 p-3 rounded-full bg-[#535C91] text-white"
                onChange={handleSearch}
                onClick={handleModalPopup}
              />
            </div>
            <div
              onClick={handleModalPopup}
              className={`fixed z-0 w-full h-screen top-0 left-0 ${
                isVisible ? "block" : "hidden"
              }`}
            />
            <motion.div
              className={`absolute w-[23.5rem] flex justify-center items-center ${
                filtered?.length > 0 ? "h-fit" : "h-32"
              } bg-[#1B1A55] rounded-lg top-14 ${
                isVisible ? "block" : "hidden"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ delay: 0.2, ease: "easeIn" }}
            >
              {status === "pending" || filtered?.length === 0 ? (
                <Spinner size={40} />
              ) : (
                <div className="w-full h-full p-2 flex flex-col gap-2">
                  {filtered?.map((person: UserTypes) => (
                    <div
                      className="border-2 flex justify-between items-center p-2 rounded-lg"
                      key={person._id}
                    >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full">
                          <img
                            src={baseURL + person.profilePicture}
                            alt="personPhoto"
                            className="w-[60px] h-[60px] object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h1 className="text-white text-sm font-semibold">
                            {person.firstName + " " + person.lastName}
                          </h1>
                          <p className="text-xs text-white">
                            10 mutual friends
                          </p>
                        </div>
                      </div>
                      <button
                        className="rounded-full"
                        onClick={(e) => handlePersonProfile(e, person)}
                      >
                        <FiArrowRightCircle
                          style={{ fontSize: "25px", color: "white" }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </form>
        </div>
        <div className="flex gap-4">
          <div
            className={`p-4 rounded-full ${
              isActive === "home" ? "bg-[#9290C3]" : "bg-[#1B1A55]"
            } flex justify-center items-center cursor-pointer`}
            onClick={() => handleIconClick("home")}
          >
            <FiHome
              style={{
                fontSize: "22px",
                color: `${isActive === "home" ? "#1B1A55" : "#9290C3"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "friends" ? "bg-[#9290C3]" : "bg-[#1B1A55]"
            } flex justify-center items-center cursor-pointer`}
            onClick={() => handleIconClick("friends")}
          >
            <MdPerson
              style={{
                fontSize: "22px",
                color: `${isActive === "friends" ? "#1B1A55" : "#9290C3"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "message" ? "bg-[#9290C3]" : "bg-[#1B1A55]"
            } flex justify-center items-center cursor-pointer`}
            onClick={() => handleIconClick("message")}
          >
            <BiMessageSquareDetail
              style={{
                fontSize: "22px",
                color: `${isActive === "message" ? "#1B1A55" : "#9290C3"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "groups" ? "bg-[#9290C3]" : "bg-[#1B1A55]"
            } flex justify-center items-center cursor-pointer`}
            onClick={() => handleIconClick("groups")}
          >
            <MdGroups
              style={{
                fontSize: "22px",
                color: `${isActive === "groups" ? "#1B1A55" : "#9290C3"}`,
              }}
            />
          </div>
        </div>
        <div className="flex ">
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            <IoIosNotifications
              style={{
                fontSize: "28px",
                color: "#9290C3",
              }}
            />
          </div>
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            <CiSettings
              style={{
                fontSize: "28px",
                color: "#9290C3",
              }}
            />
          </div>
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            {userData && userData.profilePicture ? (
              <img
                src={(baseURL + userData.profilePicture) as string}
                alt="profilePicture"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
            ) : (
              <RxAvatar
                style={{
                  fontSize: "28px",
                  color: "#9290C3",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
