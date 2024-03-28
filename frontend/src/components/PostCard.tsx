import { CgProfile } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { LuThumbsUp } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
// import { UserTypes } from "../types/User";
import { PostType } from "../types/PostTypes";

type postCardPropTypes = {
  data: PostType;
};
const PostCard: React.FC<postCardPropTypes> = ({ data }) => {
  return (
    <div className="w-full bg-[#1B1A55] border-[1px] rounded-lg">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-white flex gap-4 items-center">
            <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
            <div>
              <h1 className="font-semibold text-[0.8rem]">
                {data.user!.username}
              </h1>
              <h2 className=" text-[0.8rem]">3 Hour ago</h2>
            </div>
          </div>
          <button className="text-[#070F2B] bg-[#9290C3] p-2 rounded-full flex justify-center items-center w-9">
            <BsThreeDots />
          </button>
        </div>
        <div className="w-11/12">
          <p className="text-white text-sm leading-6">
            {data.content}
            <button className="ml-2 text-[#2566F4] text-xs">See more</button>
          </p>
        </div>

        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#9290C3] w-fit p-2 rounded-full">
                <LuThumbsUp style={{ color: "white" }} />
              </div>
              <span className="text-sm text-white font-semibold">
                2.8K Likes
              </span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="bg-[#9290C3] w-fit p-2 rounded-full">
                <FaRegComment style={{ color: "white" }} />
              </div>
              <span className="text-sm text-white font-semibold">
                22 Comments
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-white">
            <GoShareAndroid style={{ fontSize: "1.3rem" }} />
            <span className="text-sm font-medium">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
