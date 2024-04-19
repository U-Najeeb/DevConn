import { useState } from "react";
// import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  //   useEffect(async () => {
  //     setUserName(
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       ).username
  //     );
  //   }, []);
  return (
    <div className=" w-full flex justify-center items-center text-white flex-col border-2">
      {/* <img src={Robot} alt="" className="h-80" /> */}
      <h1>
        Welcome, <span className="text-blue-600">{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
  );
}
