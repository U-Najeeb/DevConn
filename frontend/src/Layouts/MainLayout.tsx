import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SideBar />
      <div className="content ml-80 mt-28 ">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
