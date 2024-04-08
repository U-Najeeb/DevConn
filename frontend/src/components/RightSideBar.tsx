import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { baseURL, useAxios } from "../api/axiosConfig";
import { useUserContext } from "../context/userContext";
import { FriendRequestTypes } from "../types/FriendRequestTypes";
import { UserTypes } from "../types/User";
import TimeAndDateFormatter from "../utils/TimeAndDateFormatter";
import { motion } from "framer-motion";
import { useState } from "react";

const RightSideBar = () => {
  const { userData } = useUserContext();
  const queryClient = useQueryClient();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { data: friendRequestData } = useQuery({
    queryKey: ["friend-requests-data", userData?._id],
    queryFn: async () => {
      const response = await useAxios.get(
        `/friendrequest/sendfriendrequest/${userData?._id}`
      );
      return response?.data?.friendRequests || [];
    },
  });

  const { mutate: confirmMutation } = useMutation({
    mutationKey: ["friend-request"],
    mutationFn: async (requestId: string) => {
      await useAxios.patch(`/friendrequest/sendfriendrequest/${requestId}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["friend-requests-data"] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests-data"] });
    },
  });

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["delete-request"],
    mutationFn: async (requestId: string) => {
      await useAxios.delete(`/friendrequest/deletefriendrequest/${requestId}`);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["friend-requests-data"] });
      queryClient.invalidateQueries({ queryKey: ["friend-requests-data"] });
    },
  });

  const handleConfirm = (requestId: string) => {
    confirmMutation(requestId);
    setIsConfirmed(true);
  };

  const handleDelete = (requestId: string) => {
    deleteMutation(requestId);
  };

  return (
    <div className="bg-[#1B1A55] w-1/4 rounded-lg shadow-md border-[1px] h-fit max-w-80">
      <div className="rounded-lg  ">
        <div className="flex justify-between items-center p-4 bg-[#1B1A55] rounded-t-lg">
          <h1 className="text-white text-sm font-semibold">Connections</h1>
          <button className="text-[#3884fd] text-xs font-bold">See all</button>
        </div>
        <hr />
      </div>
      <div className="flex flex-col items-start ">
        {friendRequestData?.length > 0 ? (
          <>
            {friendRequestData
              .slice(0, 3)
              .map((request: FriendRequestTypes) => {
                if (request?.status === "Pending") {
                  return (
                    <motion.div
                      key={request?._id}
                      initial={{ x: 0, opacity: 1 }}
                      animate={
                        isConfirmed
                          ? { x: "100%", opacity: 0 }
                          : { x: 0, opacity: 1, overflow: "hidden" }
                      }
                      exit={{ x: "100%", opacity: 0, overflow: "hidden" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="w-full"
                    >
                      <div className="w-full p-4 flex flex-col gap-1">
                        <div className="text-white flex gap-4 items-center mb-2">
                          {(request?.sender as UserTypes)?.profilePicture ? (
                            <div>
                              <img
                                src={
                                  baseURL +
                                  (request?.sender as UserTypes)?.profilePicture
                                }
                                alt="profilePicture"
                                className="rounded-full w-[2.5rem] h-10 object-cover"
                              />
                            </div>
                          ) : (
                            <CgProfile
                              style={{ color: "white", fontSize: "1.8rem" }}
                            />
                          )}
                          <div>
                            <h1 className="font-semibold text-[0.8rem]">
                              {(request?.sender as UserTypes)?.username}
                            </h1>
                            <h2 className="text-[0.8rem]">
                              {TimeAndDateFormatter(request?.createdAt)}
                            </h2>
                          </div>
                        </div>

                        <div className="flex justify-start gap-3">
                          <button
                            onClick={() => handleConfirm(request._id)}
                            className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full text-sm font-medium text-white"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="bg-[#EEEEEE] px-6 py-2 rounded-full text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                } else {
                  return null;
                }
              })}
            {friendRequestData.every(
              (request: FriendRequestTypes) => request.status !== "Pending"
            ) && (
              <div className="h-24 flex justify-center items-center w-full">
                <h1 className="text-white text-center">
                  No new friend requests
                </h1>
              </div>
            )}
          </>
        ) : (
          <div className="h-24 flex justify-center items-center w-full">
            <h1 className="text-white text-center">No new friend requests</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
