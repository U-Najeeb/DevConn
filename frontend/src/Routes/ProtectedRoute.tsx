import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect, useState } from "react";
import { useAxios } from "../api/axiosConfig";
import Spinner from "../components/Spinner";

export default function ProtectedRoute() {
  const { userData, setUserData } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const autoLogin = async () => {
      try {
        setIsLoading(true);
        if (!userData) {
          const response = await useAxios.get("/auth/validate-token");
          if (response.status === 200) {
            setUserData(response.data.user);
          } else {
            return;
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Auto-login failed:", error);
        setIsLoading(false);
      }
    };
    autoLogin();
  }, []);

  if (isLoading) return <Spinner size={95} type="fullscreen" />;
  return userData ? <Outlet /> : <Navigate to="/login" />;
}
