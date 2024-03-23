import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logo from "/images/Devcon.png";
import { useMutation } from "@tanstack/react-query";
import { LoginTypes } from "../types/User";
import { useAxios } from "../api/axiosConfig";

const LoginPage = () => {
  const navigate = useNavigate();

  const loginFn = async (loginData: LoginTypes) => {
    const response = await useAxios.post("/auth/login", loginData);
    response.status === 200 ? navigate("/") : navigate("/login");
  };
  const { mutate } = useMutation({
    mutationKey: ["login-data"],
    mutationFn: loginFn,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const loginData: LoginTypes = {
      email: (e.currentTarget as HTMLFormElement).email.value,
      password: (e.currentTarget as HTMLFormElement).password.value,
    };

    mutate(loginData);
  };
  return (
    <div
      className="flex justify-center h-screen items-center object-cover"
      style={{
        backgroundImage: "url(/images/signup--background.jpg)",
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
          <div>
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
          <div className="flex justify-between items-center mt-3 flex-col">
            <div className="flex gap-2 flex-col justify-center items-center ">
              <h3>Not a user? </h3>
              <Link to={"/signup"} className="font-semibold text-[#1B1A55]">
                SignUp
              </Link>
            </div>
            <label className="mt-6 w-full flex justify-center">
              <button
                className="w-fit font-bold tracking-wider bg-[#070F2B] text-white px-4   py-2 rounded-lg"
                type="submit"
              >
                Login
              </button>
            </label>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginPage;
