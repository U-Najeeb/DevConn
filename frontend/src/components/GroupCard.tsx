import React from "react";
import coverPhoto from "/images/cover--photo.jpg";
import { useNavigate } from "react-router-dom";
import { GroupTypes } from "../types/GroupTypes";

type FriendCardPropTypes = {
  data: GroupTypes;
};
const GroupCard: React.FC<FriendCardPropTypes> = ({ data }) => {
  const navigate = useNavigate();
  // const viewProfileHandler = (userId: string) => {
  //   navigate(`/profile/${userId}`);
  // };
  return (
    <div className="mt-5 rounded-lg w-[35rem]">
      <div className="w-full bg-[#1B1A55] rounded-lg ">
        <div className="relative ">
          <div className="h-[9rem] rounded-lg ">
            <img
              src={coverPhoto}
              alt="cover--photo"
              className="h-full w-full object-cover rounded-t-lg"
            />
          </div>
          {/* <div className="rounded-full border-4 w-fit absolute top-[7rem] z-0 left-2  p-1">
            <img
              src={baseURL + data?.}
              alt="userProfilePicture"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div> */}
        </div>

        <div className="p-3 flex justify-between items-center">
          <div className="ml-20 text-white ">
            <div className="flex items-center gap-3">
              <h1 className="">{data?.name}</h1>
              <h6 className="text-xs">
                {"Members" + " " + "(" + data?.members?.length + ")"}
              </h6>
            </div>
            <h2 className="text-xs">{data?.description}</h2>
          </div>
          <div className="flex justify-center items-center gap-5">
            <button
              className="text-white bg-[#10D876] p-3 rounded-lg text-sm"
              // onClick={() => viewProfileHandler(data._id)}
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
