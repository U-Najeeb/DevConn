import { FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "/images/Devcon.png";
import { useMutation } from "@tanstack/react-query";
import { LoginTypes } from "../types/AuthTypes";
import { useAxios } from "../api/axiosConfig";
import { useUserContext } from "../context/userContext";
import Spinner from "../components/Spinner";
const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserData, userData } = useUserContext();
  const loginFn = async (loginData: LoginTypes) => {
    const res = await useAxios.post("/auth/login", loginData);
    return res.data.user;
  };
  const { mutate, status } = useMutation({
    mutationKey: ["login-data"],
    mutationFn: loginFn,
    onSuccess: (data) => {
      setUserData(data);
      navigate("/");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: LoginTypes = {
      email: (e.currentTarget as HTMLFormElement).email.value,
      password: (e.currentTarget as HTMLFormElement).password.value,
    };

    mutate(loginData);
  };

  if (userData) return <Navigate to="/" />;
  return (
    <div
      className="flex justify-center h-screen items-center object-cover"
      style={{
        backgroundImage: "url(/images/signup--background.jpg)",
        backgroundSize: "contain",
      }}
    >
      <div className="gap-4 px-8 py-8 rounded-lg bg-white mr-20 flex justify-center flex-col">
        <div className="bg-black rounded-lg w-full border-2 flex justify-center">
          <img src={logo} alt="logo" className=" w-[15rem]" />
        </div>
        <motion.form
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col gap-4 "
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center">
            <h1 className="text-[1.5rem] font-bold uppercase text-[#070F2B] text-center">
              Login
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="border-2 p-3 rounded-lg outline-none w-[17rem]"
                required //
                name="email"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="border-2 p-3 rounded-lg outline-none w-full"
                name="password"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col justify-center items-center">
            <div className=" flex justify-center gap-2 items-center">
              <h3 className=" text-sm w-fit">Not a user? </h3>
              <Link
                to={"/signup"}
                className="font-semibold text-[#1B1A55] text-sm w-fit "
              >
                SignUp
              </Link>
            </div>
            <hr className="border-1 w-52 mt-4" />
            <label className="mt-4 w-full flex justify-center">
              <button
                className="w-fit font-bold tracking-wider bg-[#070F2B] text-white px-4  py-2 rounded-lg"
                type="submit"
              >
                {status === "pending" ? <Spinner size={40} /> : "Login"}
              </button>
            </label>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginPage;
