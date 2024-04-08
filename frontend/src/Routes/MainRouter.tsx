import { Suspense, lazy } from "react";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../pages/HomePage";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import Spinner from "../components/Spinner";
import UserProfile from "../pages/UserProfile";
import FriendList from "../pages/FriendList";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
      {
        path: "/friends",
        element: <FriendList />,
      },
    ],
  },
];

const routeList = [
  {
    path: "/",
    element: <MainLayout />,
    children: protectedRoutes,
    errorElement: <h1>Page Not Found</h1>,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner type="fullscreen" />}>
        <LoginPage />,
      </Suspense>
    ),
  },
];

export default routeList;
