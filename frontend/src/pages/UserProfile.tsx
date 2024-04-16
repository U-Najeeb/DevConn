import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { baseURL, useAxios } from "../api/axiosConfig";
import coverImage from "/images/cover--photo.jpg";
import { FaRegEnvelope } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useEffect } from "react";
import CreateAPost from "../components/CreateAPost";
import PostCard from "../components/PostCard";
import { IoMdContact } from "react-icons/io";
import { PostType } from "../types/PostTypes";
import { useUserContext } from "../context/userContext";
import { motion } from "framer-motion";

const UserProfile = () => {
  const userId = useParams();
  const { userData } = useUserContext();
  const queryClient = useQueryClient();
  const { data, refetch: refetchUserData } = useQuery({
    queryKey: ["user-data", userId],
    queryFn: async () => {
      const response = await useAxios.get(`/users/${userId?.id}`);
      return response.data.user;
    },
  });

  const { data: userPostData, refetch: refetchUserPosts } = useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const response = await useAxios.get(`/posts/${userId?.id}`);
      return response?.data?.posts;
    },
  });

  useEffect(() => {
    refetchUserData();
    refetchUserPosts();
  }, [refetchUserData, refetchUserPosts]);

  const { mutate: connectionMutation } = useMutation({
    mutationKey: ["friend-request"],
    mutationFn: async (userId: string) => {
      await useAxios.post(`/friendrequest/sendfriendrequest/${userId}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["friend-requests-data"] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests-data"] });
    },
  });
  const connectionRequestHandler = (userId: string) => {
    connectionMutation(userId);
  };

  return (
    <motion.div
      className="ml-10 flex justify-start items-start max-w-[80%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, ease: "easeIn" }}
    >
      <div className="w-[100%] ">
        <div className="w-full flex flex-col justify-center p-3 bg-[#1B1A55]  rounded-lg ">
          <div className="relative">
            <div className="h-fit rounded-lg ">
              <img
                src={coverImage}
                alt="cover--photo"
                className="h-[22rem] w-full object-cover rounded-lg"
              />
            </div>
            <div className="rounded-full border-4 w-fit absolute top-[17rem] z-0 left-16  p-2">
              <img
                src={baseURL + data?.profilePicture}
                alt="userProfilePicture"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex justify-between items-center ml-56">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-white font-medium text-lg">{`${
                  data?.firstName + " " + data?.lastName
                }`}</h1>
                <h6 className="text-white text-xs">
                  {" " + "@" + data?.username}
                </h6>
              </div>
              <h1 className="text-white mt-1 text-sm ">{"Web Developer"}</h1>
            </div>
            <div className="flex items-center gap-4 mr-2 mt-2">
              {userData?._id !== data?._id && (
                <button
                  className="text-white bg-[#10D876] p-3 rounded-lg "
                  onClick={() => connectionRequestHandler(data._id)}
                >
                  Connect
                </button>
              )}
              {userData?._id !== data?._id && (
                <button className="bg-[#9290C3] p-4 rounded-lg">
                  <FaRegEnvelope
                    style={{ color: "#1E1D58", fontSize: "1.1rem" }}
                  />
                </button>
              )}
              <button className="bg-[#9290C3] p-4 rounded-lg">
                <BsThreeDots style={{ color: "#1E1D58", fontSize: "1.1rem" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-10 ">
          <div className="w-fit ">
            <aside className="bg-[#1B1A55] mt-4 w-[20rem] p-4 rounded-lg">
              <div>
                <h1 className="text-white text-lg">Skills</h1>
              </div>
              <hr className="mt-2" />
              <div className="flex flex-col gap-3 mt-3">
                {data?.skills
                  .slice(0, 5)
                  .map(
                    (skill: { name: string; level: number }, index: number) => (
                      <div className="flex flex-col gap-2" key={index}>
                        <h1 className="text-white">{skill?.name}</h1>
                        <div className="w-full bg-gray-200 rounded">
                          <div
                            className="bg-blue-500 rounded h-1"
                            style={{ width: `${skill?.level}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
              </div>
              <div className="flex justify-end mt-3">
                <button className="text-[#2257DF] text-[0.9rem]">
                  See more
                </button>
              </div>
            </aside>
            <aside className="bg-[#1B1A55] mt-4 w-[20rem] p-4 rounded-lg">
              <div>
                <h1 className="text-white text-lg">About</h1>
              </div>
              <hr className="mt-2" />
              <div>
                <p className="text-white mt-3 text-sm">{data?.bio}</p>
              </div>
              <div className="mt-3 flex gap-3 items-center">
                <IoMdContact style={{ color: "white", fontSize: "25px" }} />
                <a
                  href={`mailto:${data?.email}`}
                  className="text-white text-xs"
                >
                  {data?.email}
                </a>
              </div>
            </aside>
          </div>
          <div
            className={`w-full flex flex-col gap-4 ${
              userData?._id !== data?._id && "mt-4"
            }`}
          >
            {userData?._id == data?._id && (
              <div className="mt-4 w-full">
                <CreateAPost />
              </div>
            )}
            {userPostData?.map((postData: PostType) => (
              <PostCard key={postData?._id} data={postData} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
