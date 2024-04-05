import { useQuery } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { baseURL, useAxios } from "../api/axiosConfig";
import { useUserContext } from "../context/userContext";
import { FriendRequestTypes } from "../types/FriendRequestTypes";
import { UserTypes } from "../types/User";
import TimeAndDateFormatter from "../utils/TimeAndDateFormatter";

const RightSideBar = () => {
  const { userData } = useUserContext();
  const {
    data: friendRequestData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friend-requests-data", userData?._id],
    queryFn: async () => {
      const response = await useAxios.get(
        `/friendrequest/sendfriendrequest/${userData?._id}`
      );
      return response?.data?.friendRequests || [];
    },
  });

  // const handleConfirm = (requestId: string) => {
  //   // Handle confirmation logic here
  // };

  // const handleDelete = (requestId: string) => {
  //   // Handle deletion logic here
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="bg-[#1B1A55] w-1/4 rounded-lg shadow-md border-[1px] h-fit">
      <div className="rounded-lg  ">
        <div className="flex justify-between items-center p-4 bg-[#1B1A55] rounded-t-lg">
          <h1 className="text-white text-sm font-semibold">Connections</h1>
          <button className="text-[#3884fd] text-xs font-bold">See all</button>
        </div>
        <hr />
      </div>
      <div className="flex flex-col items-start ">
        {friendRequestData?.slice(0, 3).map((request: FriendRequestTypes) => (
          <div className="w-full p-4 flex flex-col gap-1" key={request._id}>
            <div className="text-white flex gap-4 items-center mb-2">
              {(request?.sender as UserTypes)?.profilePicture ? (
                <div>
                  <img
                    src={
                      baseURL + (request?.sender as UserTypes)?.profilePicture
                    }
                    alt="profilePicture"
                    className="rounded-full w-[2.5rem] h-10 object-cover"
                  />
                </div>
              ) : (
                <CgProfile style={{ color: "white", fontSize: "1.8rem" }} />
              )}
              <div>
                <h1 className="font-semibold text-[0.8rem]">
                  {(request?.sender as UserTypes)?.username}
                </h1>
                <h2 className=" text-[0.8rem]">
                  {TimeAndDateFormatter(request?.createdAt)}
                </h2>
              </div>
            </div>

            <div className="flex justify-start gap-3">
              <button
                // onClick={() => handleConfirm(request._id)}
                className="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-2 rounded-full text-sm font-medium text-white"
              >
                Confirm
              </button>
              <button
                // onClick={() => handleDelete(request._id)}
                className="bg-[#EEEEEE] px-6 py-2 rounded-full text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideBar;
