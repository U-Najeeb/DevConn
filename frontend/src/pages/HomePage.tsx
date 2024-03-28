import CreateAPost from "../components/CreateAPost";
import PostCard from "../components/PostCard";
import RightSideBar from "../components/RightSideBar";
// import { useUserContext } from "../context/userContext";

const HomePage = () => {
  // const { userData } = useUserContext();
  return (
    <div className="h-dvh bg-[#070F2B] -mt-6">
      <div className="flex w-full justify-evenly p-12">
        <div className="w-1/2 flex flex-col gap-5 ">
          <CreateAPost />
          <PostCard />
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePage;
