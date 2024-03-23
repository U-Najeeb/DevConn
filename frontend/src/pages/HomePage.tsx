import CreateAPost from "../components/CreateAPost";
import RightSideBar from "../components/RightSideBar";
// import StoryCard from "../components/StoryCard";

const HomePage = () => {
  return (
    <div className="h-dvh bg-[#070F2B] -mt-6">
      <div className="flex ">
        <div className="flex w-full justify-evenly p-12 ">
          {/* <StoryCard /> */}
          <CreateAPost />
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
