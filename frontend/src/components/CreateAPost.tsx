import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";

const CreateAPost = () => {
  return (
    <div className="rounded-lg bg-[#1B1A55] w-1/2 p-4 shadow-md border-[1px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-[#9290C3] p-2 rounded-full flex justify-center items-center">
            <FaRegPenToSquare style={{ color: "#1D1C57" }} />
          </div>
          <div>
            <button className="text-[#aeb6be] font-semibold text-sm">
              Create Post
            </button>
          </div>
        </div>
        <div>
          <form>
            <textarea
              name=""
              id=""
              cols={10}
              rows={4}
              className="w-full p-3 border-2 rounded-lg outline-none resize-none bg-[#535C91] text-white"
              placeholder="What's on your mind?"
            ></textarea>
          </form>
        </div>
        <div>
          <div className="flex gap-5 items-center">
            <div>
              <button className="flex items-center gap-2">
                <MdOutlineInsertPhoto
                  style={{ color: "#10D876", fontSize: "1.5rem" }}
                />
                <h1 className=" text-[0.8rem] font-semibold text-white">
                  Photo/Video
                </h1>
              </button>
            </div>
            <div>
              <button className="flex items-center gap-2">
                <FaCode style={{ color: "yellow", fontSize: "1.4rem" }} />
                <h1 className=" text-[0.8rem] font-semibold text-white">
                  Code Snippet
                </h1>
              </button>
            </div>

            <div>
              <button className="flex items-center gap-2">
                <BsCalendar2DateFill
                  style={{ color: "#FEB46E", fontSize: "1.3rem" }}
                />
                <h1 className=" text-[0.8rem] font-semibold text-white">
                  Create Event
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAPost;
