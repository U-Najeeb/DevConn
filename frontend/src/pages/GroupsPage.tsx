import {
  MouseEventHandler,
  useState,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
} from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { baseURL, useAxios } from "../api/axiosConfig";
import { useUserContext } from "../context/userContext";
import { UserTypes } from "../types/User";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupTypes } from "../types/GroupTypes";
import GroupCard from "../components/GroupCard";

const GroupPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { userData } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMembersSearchText, setAddMemberSearchText] = useState("");
  const [members, setMembers] = useState<UserTypes[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<
    GroupTypes[] | undefined
  >(undefined);
  const [filteredConnections, setFilteredConnections] = useState<
    UserTypes[] | undefined
  >(undefined);
  const queryClient = useQueryClient();

  useEffect(() => {
    const filteredConnections = userData?.connections.filter(
      (connection: UserTypes) => {
        return connection?.firstName
          ?.toLowerCase()
          .includes(addMembersSearchText);
      }
    );

    setFilteredConnections(filteredConnections);
  }, [addMembersSearchText, searchText, userData?.connections]);

  const handleCreateGroupClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalPopup: MouseEventHandler<HTMLInputElement> = (e) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setAddMemberSearchText(e.target.value);
    setIsVisible(e.target.value.length > 0);
  };

  const handleAddMembers = (user: UserTypes) => {
    console.log("igot called");
    setMembers([...members, user]);
  };

  const handleSearchText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };

  const { mutate: createGroupMutation } = useMutation({
    mutationKey: ["create-group"],
    mutationFn: async (formData: GroupTypes) => {
      try {
        await useAxios.post("/groups/create-group", {
          formData,
        });
      } catch (error) {
        console.error("Error creating group:", error);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-groups"] });
    },
  });

  const { data: groupData } = useQuery({
    queryKey: ["all-groups"],
    queryFn: async () => {
      const response = await useAxios.get("/groups/");
      return response?.data?.groups;
    },
  });

  useEffect(() => {
    const filteredGroups = groupData?.filter((group: GroupTypes) => {
      return group?.name?.toLowerCase().includes(addMembersSearchText);
    });

    setFilteredGroups(filteredGroups);
  }, [addMembersSearchText, filteredConnections, groupData]);

  const createGroup: FormEventHandler = (e) => {
    e.preventDefault();
    const formData: GroupTypes = {
      name: (e.currentTarget as HTMLFormElement).groupName.value,
      description: (e.currentTarget as HTMLFormElement).groupDescription.value,
      members: members,
    };
    createGroupMutation(formData);
    setMembers([]);
    handleCloseModal();
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-full px-4 md:px-10">
        <div className="flex justify-between items-center header p-4 md:p-5 rounded-lg bg-[#1B1A55] w-full">
          <h1 className="text-2xl font-semibold text-white">Groups</h1>
          <div className="flex gap-2 md:gap-4">
            <form>
              <input
                type="text"
                placeholder="Search here..."
                value={searchText}
                className="outline-0 w-40 md:w-68 p-2 md:p-3 rounded-2xl bg-[#535C91] text-white"
                onChange={handleSearchText}
              />
            </form>
            <button
              className="bg-[#10D876] p-2 rounded-lg text-white text-sm"
              type="button"
              onClick={handleCreateGroupClick}
            >
              Create Group
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {filteredGroups?.map((group: GroupTypes | null) => (
            <GroupCard data={group!} key={groupData?._id} />
          ))}
        </div>

        {isModalOpen && (
          <form
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 "
            onSubmit={createGroup}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[25rem]">
              <h2 className="mb-4 text-2xl font-semibold">Create Group</h2>
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  placeholder="Enter group name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="groupDescription"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Group Description
                </label>
                <textarea
                  id="groupDescription"
                  placeholder="Enter group description"
                  name="groupDescription"
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-blue-500"
                  rows={4}
                />
              </div>
              <div className="max-w-full mb-4 ">
                <label
                  htmlFor="members"
                  className="block mb-2 font-semibold text-gray-800"
                >
                  Members
                </label>
                <div
                  className={`flex gap-2 overflow-x-auto md:gap-3 text-xs pt-2 ${
                    members.length > 0 ? "block" : "hidden"
                  }`}
                >
                  {members?.map((person: UserTypes | null) => (
                    <div className="relative" key={person?._id}>
                      <span className="absolute top-[-7px] right-[-7px] bg-gray-400 rounded-full w-4 h-4 p-[10px] text-center flex justify-center items-center font-bold cursor-pointer">
                        X
                      </span>
                      <div className="px-3 py-2 text-gray-800 bg-gray-200 rounded-lg ">
                        {person?.firstName} {person?.firstName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="Add Members"
                  value={addMembersSearchText}
                  onChange={handleSearch}
                  onClick={handleModalPopup}
                />

                <div
                  className={`absolute w-full h-[10rem] top-11 bg-white ${
                    filteredConnections!.length > 0 ? "h-fit" : "h-32"
                  } ${isVisible ? "block" : "hidden"} rounded-lg border-2`}
                  onClick={handleModalPopup}
                >
                  <div className="flex flex-col w-full h-full gap-2 p-2 rounded-lg">
                    {filteredConnections?.map((person: UserTypes | null) => (
                      <div
                        className="flex items-center justify-between p-2 border-2 rounded-lg"
                        key={person?._id}
                      >
                        <div className="flex items-center gap-2">
                          <div className="rounded-full">
                            <img
                              src={baseURL + person?.profilePicture}
                              alt="personPhoto"
                              className="w-[60px] h-[60px] object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <h1 className="text-sm font-semibold text-black">
                              {person?.firstName} {person?.lastName}
                            </h1>
                            <p className="text-xs text-black">
                              10 mutual friends
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="rounded-full"
                          onClick={() => handleAddMembers(person as UserTypes)}
                        >
                          <FaCirclePlus
                            style={{ fontSize: "25px", color: "black" }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-6 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  type="submit"
                >
                  Create Group
                </button>
                <button
                  className="px-6 py-2 font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 "
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GroupPage;
