import { useQuery } from "@tanstack/react-query";
import CreateAPost from "../components/CreateAPost";
import PostCard from "../components/PostCard";
import RightSideBar from "../components/RightSideBar";
import { motion } from "framer-motion";
import { useAxios } from "../api/axiosConfig";
import Spinner from "../components/Spinner";
import { PostType } from "../types/PostTypes";

const HomePage = () => {
  const { data: AllPostsData, status } = useQuery({
    queryKey: ["all-posts"],
    queryFn: async () => {
      const response = await useAxios.get("/posts/");
      return response?.data?.posts;
    },
  });

  return (
    <motion.div
      className="h-dvh bg-[#070F2B] -mt-6 py-[1.45rem]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeIn" }}
    >
      <div className="flex w-full gap-16">
        <div className="w-1/2 flex flex-col gap-5 ">
          <CreateAPost />
          {status === "success" ? (
            AllPostsData.sort((a: PostType, b: PostType) => {
              return (
                new Date(b.createdAt as string).getTime() -
                new Date(a.createdAt as string).getTime()
              );
            }).map((post: PostType, index: number) => (
              <PostCard data={post} key={index} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
        <RightSideBar />
      </div>
    </motion.div>
  );
};

export default HomePage;
