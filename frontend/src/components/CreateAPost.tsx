import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../api/axiosConfig";
import { ChangeEventHandler, FormEvent, useState } from "react";
import { PostType } from "../types/PostTypes";

const CreateAPost = () => {
  const [textAreaText, setTextAreaText] = useState("");

  const handleTextAreaText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    setTextAreaText(e.target.value);
  };
  const { mutate } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (postData: PostType) => {
      await useAxios.post("/posts/", postData);
      setTextAreaText("");
      return;
    },
  });

  const handleCreatePost = (e: FormEvent) => {
    e.preventDefault();
    const postData: PostType = {
      content: textAreaText,
    };

    mutate(postData);
  };
  return (
    <div className="w-full rounded-lg bg-[#1B1A55] p-4 shadow-md border-[1px]">
      <div className="flex flex-col gap-4">
        <form className="flex flex-col gap-3" onSubmit={handleCreatePost}>
          <div className="flex items-center gap-2">
            <div className="bg-[#9290C3] p-2 rounded-full flex justify-center items-center">
              <FaRegPenToSquare style={{ color: "#1D1C57" }} />
            </div>
            <div>
              <button
                className="text-[#aeb6be] font-semibold text-sm"
                type="submit"
              >
                Create Post
              </button>
            </div>
          </div>
          <div>
            <textarea
              name="content"
              id="content"
              cols={10}
              rows={4}
              className="w-full p-3 border-2 rounded-lg outline-none resize-none bg-[#535C91] text-white"
              placeholder="What's on your mind?"
              onChange={handleTextAreaText}
              value={textAreaText}
            ></textarea>
          </div>
        </form>
        <div>
          <div className="flex gap-5 items-center">
            <div>
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 text-[0.8rem] font-semibold text-white cursor-pointer"
              >
                <MdOutlineInsertPhoto
                  style={{ color: "#10D876", fontSize: "1.5rem" }}
                />
                <input id="file-upload" type="file" hidden />
                Photo/Video
              </label>
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
