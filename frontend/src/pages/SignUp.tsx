import React, { ChangeEvent, FormEvent, FormEventHandler } from "react";
import defaultProfile from "/images/defaultProfile.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SignUpTypes } from "../types/AuthTypes";
import { useAxios } from "../api/axiosConfig";
import { useUserContext } from "../context/userContext";

interface FileInputEvent extends ChangeEvent {
  target: HTMLInputElement & EventTarget;
}

const SignUp = () => {
  const [profilePicture, setProfilePicture] = React.useState<
    string | ArrayBuffer | null
  >(defaultProfile);
  const [stage, setStage] = React.useState(1);

  const [skills, setSkills] = React.useState<string[]>([]);
  const [skillsInput, setSkillsInput] = React.useState("");
  const { setUserData } = useUserContext();
  const navigate = useNavigate();

  const handleProfilePicture: FormEventHandler = (e: FileInputEvent) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target) {
          return null;
        }
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleNextStage = (e: FormEvent) => {
    e.preventDefault();

    const userData = {
      firstName: (e.currentTarget as HTMLFormElement).firstName.value,
      lastName: (e.currentTarget as HTMLFormElement).lastName.value,
      email: (e.currentTarget as HTMLFormElement).email.value,
      password: (e.currentTarget as HTMLFormElement).password.value,
      gender: (e.currentTarget as HTMLFormElement).gender.value,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    setStage(2);
  };

  const handleAddSkills = (e: FormEvent) => {
    e.preventDefault();
    setSkills([...skills, skillsInput]);
    setSkillsInput("");
  };
  const handleSkillsInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
  };

  const signUpFn = async (signupData: SignUpTypes) => {
    const response = await useAxios.post("/auth/signup", signupData);
    setUserData(response?.data?.newUser);
    response.status === 201 ? navigate("/") : navigate("/signup");
  };

  const { mutate } = useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUpFn,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const firstPageData = JSON.parse(
      localStorage.getItem("userData") || "{}"
    ) as SignUpTypes;

    const signupData: SignUpTypes = {
      firstName: firstPageData.firstName,
      lastName: firstPageData.lastName,
      email: firstPageData.email,
      password: firstPageData.password,
      gender: firstPageData.gender,
      bio: (e.currentTarget as HTMLFormElement).bio.value,
      dob: (e.currentTarget as HTMLFormElement).dob.value,
      profilePicture: profilePicture,
      username: `${firstPageData.firstName[0] + "." + firstPageData.lastName}`,
      skills: skills,
    };

    localStorage.removeItem("userData");
    mutate(signupData);
  };

  return (
    <div
      className="flex justify-center h-screen items-center"
      style={{
        backgroundImage: "url(/images/signup--background.jpg)",
        backgroundSize: "contain",
      }}
    >
      <div className="gap-4 px-8 py-8 rounded-lg bg-white mr-20 flex justify-center">
        {stage === 1 ? (
          <motion.form
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-4  "
            onSubmit={handleNextStage}
          >
            <div>
              <h1 className="text-[1.5rem] font-bold uppercase text-[#070F2B]">
                Register
              </h1>

              <div className="flex flex-col gap-2 justify-center items-center ">
                <img
                  src={profilePicture as string}
                  alt="profilepPicture"
                  className="rounded-full object-cover w-[9rem] h-[9rem] "
                />
                <label
                  onChange={handleProfilePicture}
                  className=" font-semibold text-sm border-2 p-3 rounded-xl cursor-pointer text-[#070F2B]"
                >
                  Add Profile Picture
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="text-xs pl-12"
                    hidden
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName" className="font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  className="border-2 p-3 rounded-lg outline-none"
                  required
                  name="firstName"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lastName" className="font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  className="border-2 p-3 rounded-lg outline-none"
                  required //
                  name="lastName"
                />
              </div>
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
              <div className="flex flex-col gap-4 ">
                <label className="font-medium">Gender</label>
                <div className="flex gap-2 items-center">
                  <label htmlFor="male" className="font-medium">
                    Male
                  </label>
                  <input type="radio" id="male" name="gender" value="male" />
                  <label htmlFor="female" className="font-medium">
                    Female
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  className="border-2 p-3 rounded-lg outline-none"
                  name="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword" className="font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="border-2 p-3 rounded-lg outline-none"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-4 ">
                <h3>Already a user? </h3>
                <Link to={"/login"} className="font-semibold text-[#1B1A55]">
                  Login
                </Link>
              </div>
              <label>
                <button
                  className="w-fit font-bold tracking-wider"
                  type="submit"
                >
                  NEXT
                </button>
              </label>
            </div>
          </motion.form>
        ) : (
          <>
            <motion.form
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-96 flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-3 ">
                <label htmlFor="dob" className="font-medium ">
                  {" "}
                  Date Of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="border-2 p-2 rounded-md outline-none"
                  name="dob"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className=" font-medium">Bio</h1>
                <textarea
                  className="border-2 outline-none rounded-lg p-4 resize-none"
                  placeholder="Write something about yourself"
                  rows={4}
                  name="bio"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium">Skills</h1>
                <div className="flex gap-3 flex-wrap">
                  {skills.map((skill, index) => (
                    <div
                      className="border-2 w-fit p-[5px] rounded-md flex gap-2 "
                      key={index}
                    >
                      <div className="border-2 w-[5.5px] h-[6px] rounded-lg border-black"></div>
                      <p className="text-sm font-semibold">{skill}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleSkillsInput}
                    className="border-2 w-full p-2 rounded-lg outline-none"
                    placeholder="Add Skills"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddSkills(e);
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <label>
                    <button
                      className="w-fit font-bold tracking-wider"
                      onClick={() => setStage(1)}
                    >
                      BACK
                    </button>
                  </label>
                  <div className="text-center p-2 mt-4">
                    <button
                      className="w-fit py-3 px-5 rounded-md bg-[#1B1A55] text-white font-semibold"
                      type="submit"
                    >
                      SIGN UP
                    </button>
                  </div>
                </div>
              </div>
            </motion.form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
