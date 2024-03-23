import { ChangeEventHandler, useState } from "react";
import logo from "/images/Devcon.png";
import { IoIosSearch } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { MdPerson, MdGroups } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState("home");

  const navigate = useNavigate();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  const handleIconClick = (icon: string) => {
    navigate(icon === "home" ? "/" : `/${icon}`);
    setIsActive(icon);
  };

  return (
    <div className="nav--container p-2  flex justify-center items-center w-full shadow-md z-50 bg-[#070F2B] fixed top-0 ">
      <div className="nav--wrapper justify-between  flex items-center p-2 w-full max-w-[120rem] z-50">
        <div className=" w-1/4">
          <img src={logo} alt="logo" className="w-1/2" />
        </div>
        <div className="w-1/4 ">
          <form className="">
            <div className="flex justify-center items-center border-2 rounded-full px-4  bg-[#EEEEEE]">
              <IoIosSearch style={{ color: "grey" }} />
              <input
                type="text"
                value={searchText}
                name="search--bar"
                placeholder="Search"
                className="outline-0 w-80 p-3 rounded-full  bg-[#EEEEEE]"
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
        <div className="flex gap-4">
          <div
            className={`p-4 rounded-full ${
              isActive === "home" ? "bg-[#9290C3]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("home")}
          >
            <FiHome
              style={{
                fontSize: "22px",
                color: `${isActive === "home" ? "#1B1A55" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "person" ? "bg-[#9290C3]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("person")}
          >
            <MdPerson
              style={{
                fontSize: "22px",
                color: `${isActive === "person" ? "#1B1A55" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "message" ? "bg-[#9290C3]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("message")}
          >
            <BiMessageSquareDetail
              style={{
                fontSize: "22px",
                color: `${isActive === "message" ? "#1B1A55" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "groups" ? "bg-[#9290C3]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("groups")}
          >
            <MdGroups
              style={{
                fontSize: "22px",
                color: `${isActive === "groups" ? "#1B1A55" : "grey"}`,
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
            <RxAvatar
              style={{
                fontSize: "28px",
                color: "#9290C3",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
