import { ChangeEventHandler, useState } from "react";
import FriendCard from "../components/FriendCard";
import { useUserContext } from "../context/userContext";
import { UserTypes } from "../types/User";

const FriendList = () => {
  const { userData } = useUserContext();
  const [searchText, setSearchText] = useState("");

  const handleSearchText: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
  };
  const filteredConnections = userData?.connections.filter(
    (connection: UserTypes) => {
      return connection?.firstName.includes(searchText);
    }
  );

  return (
    <div className="flex justify-center ">
      <div className="flex justify-center flex-col items-center w-full px-10">
        <div className="flex justify-between items-center header p-5 rounded-lg bg-[#1B1A55] w-full">
          <div>
            <h1 className="text-white text-2xl font-semibold">Connections</h1>
          </div>
          <div>
            <form>
              <input
                type="text"
                placeholder="Search here..."
                value={searchText}
                className="outline-0 w-68 p-3 rounded-2xl bg-[#535C91] text-white"
                onChange={handleSearchText}
              />
            </form>
          </div>
        </div>

        <div className="flex gap-10 w-full justify-center">
          {filteredConnections?.map((connection: UserTypes) => (
            <FriendCard data={connection!} key={connection?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
