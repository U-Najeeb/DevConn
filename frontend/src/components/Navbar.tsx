import { ChangeEventHandler, useState } from "react";
import logo from "/images/Devcon.png";
import { IoIosSearch } from "react-icons/io";
import { FiHome } from "react-icons/fi";
import { MdPerson, MdGroups } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [isActive, setIsActive] = useState("home");

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  const handleIconClick = (icon: string) => {
    setIsActive(icon);
  };

  return (
    <div className="nav--container p-2  flex justify-center items-center w-full shadow-md z-50 bg-white">
      <div className="nav--wrapper flex justify-between items-center p-2 gap-10 w-full max-w-[120rem] z-50">
        <div>
          <img src={logo} alt="logo" className="w-40" />
        </div>
        <div>
          <form>
            <div className="flex justify-center items-center border-2 rounded-full px-4">
              <IoIosSearch style={{ color: "grey" }} />
              <input
                type="text"
                value={searchText}
                name="search--bar"
                placeholder="Search"
                className="outline-0 w-80 p-3 rounded-full"
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
        <div className="flex gap-4">
          <div
            className={`p-4 rounded-full ${
              isActive === "home" ? "bg-[#D2E3FF]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("home")}
          >
            <FiHome
              style={{
                fontSize: "22px",
                color: `${isActive === "home" ? "blue" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "person" ? "bg-[#D2E3FF]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("person")}
          >
            <MdPerson
              style={{
                fontSize: "22px",
                color: `${isActive === "person" ? "blue" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "message" ? "bg-[#D2E3FF]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("message")}
          >
            <BiMessageSquareDetail
              style={{
                fontSize: "22px",
                color: `${isActive === "message" ? "blue" : "grey"}`,
              }}
            />
          </div>
          <div
            className={`p-4 rounded-full ${
              isActive === "groups" ? "bg-[#D2E3FF]" : "bg-[#F5F5F5]"
            } flex justify-center items-center`}
            onClick={() => handleIconClick("groups")}
          >
            <MdGroups
              style={{
                fontSize: "22px",
                color: `${isActive === "groups" ? "blue" : "grey"}`,
              }}
            />
          </div>
        </div>
        <div className="flex ">
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            <IoIosNotifications
              style={{
                fontSize: "28px",
                color: "blue",
              }}
            />
          </div>
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            <CiSettings
              style={{
                fontSize: "28px",
                color: "blue",
              }}
            />
          </div>
          <div className={`p-4 rounded-full flex justify-center items-center`}>
            <RxAvatar
              style={{
                fontSize: "28px",
                color: "blue",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
