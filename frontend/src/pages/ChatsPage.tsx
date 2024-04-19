import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";
import { useUserContext } from "../context/userContext";
import { UserTypes } from "../types/User";

export default function ChatPage() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState<UserTypes[] | undefined>([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  // const [currentUser, setCurrentUser] = useState(undefined);
  const { userData } = useUserContext();
  // useEffect(async () => {
  //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(
  //       await JSON.parse(
  //         localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
  //       )
  //     );
  //   }
  // }, []);
  // useEffect(() => {
  //   if (currentUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", currentUser._id);
  //   }
  // }, [currentUser]);

  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <div className="h-[37rem] flex flex-col justify-center items-center gap-y-4 bg-gray-900 ">
        <div className="h-full w-full bg-black bg-opacity-60 flex flex-row-reverse sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <Contacts
            currentUser={userData}
            changeChat={handleChatChange}
            setContacts={setContacts}
            contacts={contacts}
          />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </div>
    </>
  );
}
