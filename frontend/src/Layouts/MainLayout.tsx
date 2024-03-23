import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const renderLayout =
    !pathname.startsWith("/signup") && !pathname.startsWith("/login");
  return (
    <>
      {renderLayout && (
        <>
          <Navbar />
          <SideBar />
          <div className="content ml-72 mt-28">
            <Outlet />
          </div>
        </>
      )}

      {!renderLayout && <Outlet />}
    </>
  );
};

export default MainLayout;
