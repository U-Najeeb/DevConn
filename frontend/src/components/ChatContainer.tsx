import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { UserTypes } from "../types/User";
import { baseURL } from "../api/axiosConfig";

type ChatContainerTypes = {
  currentChat: UserTypes;
};
const ChatContainer: React.FC<ChatContainerTypes> = ({
  currentChat,
  socket,
}) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const handleSendMsg = async (message) => {
    const messages = [...message];
    messages.push({ fromSelf: true, message: messages });
    setMessages(messages);
  };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //     });
  //   }
  // }, [socket]);

  // useEffect(() => {
  //   arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage]);

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  return (
    <div className="w-full border-2 q">
      <div className=" flex justify-between items-center p-5">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-lg bg-gray-300">
            <img
              src={baseURL + currentChat?.profilePicture}
              alt="profilePicture"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white">{currentChat?.username}</h3>
            <h6 className="text-white text-xs">
              {currentChat?.isActive ? "Active" : "Last Seen"}
            </h6>
          </div>
        </div>
      </div>
      <div className=" p-8 flex flex-col gap-4 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-600 border-2 h-[71%]">
        {messages.map((message, index: number) => (
          <div key={index} ref={scrollRef}>
            <div
              className={`flex ${
                message.fromSelf ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-40 overflow-wrap break-word p-4 rounded ${
                  message.fromSelf ? "bg-purple-500" : "bg-purple-400"
                } text-white`}
              >
                <p>{message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleMessage={handleSendMsg} />
    </div>
  );
};

export default ChatContainer;
