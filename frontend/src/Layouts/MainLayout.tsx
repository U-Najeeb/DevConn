import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
