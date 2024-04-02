import CreateAPost from "../components/CreateAPost";
import PostCard from "../components/PostCard";
import RightSideBar from "../components/RightSideBar";
// import { useUserContext } from "../context/userContext";
import { motion } from "framer-motion";

const HomePage = () => {
  // const { userData } = useUserContext();
  return (
    <motion.div
      className="h-dvh bg-[#070F2B] -mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeIn" }}
    >
      <div className="flex w-full justify-evenly p-12">
        <div className="w-1/2 flex flex-col gap-5 ">
          <CreateAPost />
          <PostCard />
        </div>
        <RightSideBar />
      </div>
    </motion.div>
  );
};

export default HomePage;
