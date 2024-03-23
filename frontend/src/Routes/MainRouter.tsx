import MainLayout from "../Layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";

const routeList = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
    ],
    errorElement: <h1>Page Not Found</h1>,
  },
];

export default routeList;
