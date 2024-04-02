import { CgProfile } from "react-icons/cg";
import { BsThreeDots } from "react-icons/bs";
import { LuThumbsUp } from "react-icons/lu";
import { FaRegComment } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { PostType } from "../types/PostTypes";
import { UserTypes } from "../types/User";
import { baseURL } from "../api/axiosConfig";
import { useState } from "react";
import CodeSnippet from "./CodeSnippet";
// import { CodeBlock, dracula } from "react-code-blocks";

type postCardPropTypes = {
  data?: PostType;
};
const PostCard: React.FC<postCardPropTypes> = ({ data }) => {
  const [showContent, setShowFullContent] = useState(false);
  const maxLength = 100;
  const toggleShowFullContent = () => {
    setShowFullContent(!showContent);
  };
  const [minImages, setMinImages] = useState(3);

  return (
    <div className="w-full bg-[#1B1A55] border-[1px] rounded-lg">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="text-white flex gap-4 items-center">
            {(data?.user as UserTypes)?.profilePicture ? (
              <div className="">
                <img
                  src={baseURL + (data?.user as UserTypes)?.profilePicture}
                  alt="profilePicture"
                  className="rounded-full w-[2.5rem] h-10 object-cover"
                />
              </div>
            ) : (
              <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
            )}
            <div>
              <h1 className="font-semibold text-[0.8rem]">
                {(data?.user as UserTypes)?.username}
              </h1>
              <h2 className=" text-[0.8rem]">3 Hour ago</h2>
            </div>
          </div>
          <button className="text-[#070F2B] bg-[#9290C3] p-2 rounded-full flex justify-center items-center w-9">
            <BsThreeDots />
          </button>
        </div>
        <div className="w-11/12">
          {data?.type !== "code" ? (
            <p className="text-white text-sm leading-6">
              {showContent ? data?.content : data?.content.slice(0, maxLength)}
              {(data?.content.length as number) > maxLength &&
                (showContent ? (
                  <button
                    className="ml-2 text-[#2566F4] text-xs"
                    onClick={toggleShowFullContent}
                  >
                    Show less
                  </button>
                ) : (
                  <button
                    className="ml-2 text-[#2566F4] text-xs"
                    onClick={toggleShowFullContent}
                  >
                    See more
                  </button>
                ))}
            </p>
          ) : (
            <CodeSnippet snippet={data.content} />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {data?.images.slice(0, minImages).map((image, index) => (
            <div
              key={index}
              className={`relative w-[10rem] h-[10rem] rounded-lg overflow-hidden `}
            >
              {index === minImages - 1 && index !== data?.images.length - 1 && (
                <div
                  onClick={() => {
                    setMinImages(data?.images.length);
                  }}
                  className=" cursor-pointer absolute inset-0 flex items-center justify-center bg-black opacity-50 hover:opacity-0 transition-opacity duration-300"
                >
                  <span className="text-white text-lg">
                    +{data?.images.length - minImages}
                  </span>
                </div>
              )}
              <img
                src={baseURL + image}
                alt="postImage"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
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

        {/* {data?.content && (
          <div className="mt-4">
            <CodeBlock
              text={codeSnippet}
              language="jsx"
              showLineNumbers={false}
              theme={dracula}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PostCard;
