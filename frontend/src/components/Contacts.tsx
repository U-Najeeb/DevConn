import React, { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { baseURL } from "../api/axiosConfig";
import { UserTypes } from "../types/User";
import { IoFilterOutline, IoVideocamOutline } from "react-icons/io5";
import { PiDotsThreeCircle } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { CiPhone } from "react-icons/ci";

// Define prop types for Contacts component
type ContactPagePropTypes = {
  currentUser: UserTypes | undefined;
  changeChat: (chat: UserTypes) => void;
  setContacts: React.Dispatch<React.SetStateAction<UserTypes[] | undefined>>;
  contacts: UserTypes[] | undefined;
};

const Contacts: React.FC<ContactPagePropTypes> = ({
  currentUser,
  changeChat,
  setContacts,
  contacts,
}) => {
  // State variables
  const [newChatSearch, setNewChatSearch] = useState("");
  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [chatData, setChatData] = useState<UserTypes | undefined>();

  // Open and close modal functions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to change the current chat
  const changeCurrentChat = (index: number, contact: UserTypes) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  // Handler for new chat search input
  const handleNewChatSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewChatSearch(e.target.value);
  };

  // Filtered contacts based on search input
  const filteredContacts = currentUser?.connections?.filter(
    (contact: UserTypes) =>
      contact?.firstName?.toLowerCase().includes(newChatSearch.toLowerCase())
  );

  // Open second modal with selected person
  const handleOpenSecondModal = (person: UserTypes) => {
    setIsSecondModalOpen(true);
    setChatData(person);
  };

  // Close second modal
  const closeSecondModal = () => setIsSecondModalOpen(false);

  // Start a new chat and add to contacts
  const handleStartNewChat: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (contacts) {
      const isPresent = contacts.find(
        (contact) => contact?._id === chatData?._id
      );
      if (!isPresent) {
        setContacts([...contacts, chatData!]);
      }
    }
  };

  return (
    <>
      <div className="currentUser h-full w-[30rem] grid grid-rows-[10%,75%,15%] overflow-hidden bg-gray-900 border-2 border-white ">
        <div className="flex justify-between items-center p-4 ">
          <h3 className="text-white text-[1.25rem] font-semibold">Chats</h3>
          <div className="flex gap-4">
            <button className="text-white text-sm" onClick={openModal}>
              + New
            </button>
            <button className="text-white flex items-center gap-3 text-sm justify-center">
              <IoFilterOutline />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-600 flex flex-col gap-2 ">
          {contacts?.map((contact: UserTypes, index: number) => (
            <div
              key={contact?._id}
              className={`flex items-center gap-4 p-2 cursor-pointer ${
                index === currentSelected ? "bg-indigo-600" : "bg-gray-600"
              } p-[12px]`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="h-12 w-12 rounded-lg bg-gray-300">
                <img
                  src={baseURL + contact?.profilePicture}
                  alt=""
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  {contact?.firstName + " " + contact?.lastName}
                </h3>
                <h6 className="text-xs text-white"> @{contact?.username}</h6>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center p-4 bg-gray-800 gap-2">
          <div className="h-16 w-16 rounded-full bg-gray-300">
            <img
              src={baseURL + currentUser?.profilePicture}
              alt="avatar"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-white">
            {currentUser?.firstName + " " + currentUser?.lastName}
          </h2>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <NewChatModal
            closeModal={closeModal}
            filteredContacts={filteredContacts}
            handleNewChatSearch={handleNewChatSearch}
            handleOpenSecondModal={handleOpenSecondModal}
            isSecondModalOpen={isSecondModalOpen}
            newChatSearch={newChatSearch}
            handleStartNewChat={handleStartNewChat}
            closeSecondModal={closeSecondModal}
          />
        </div>
      )}
    </>
  );
};

const ModalHeader = ({ closeModal }: { closeModal: () => void }) => (
  <div className="flex justify-between items-center pb-3">
    <p className="text-2xl font-bold text-[1.125rem]">Search by Name</p>
    <button onClick={closeModal} className="modal-close cursor-pointer z-50">
      <span className="text-3xl">×</span>
    </button>
  </div>
);

const ChatPerson = ({
  person,
  handleOpenSecondModal,
}: {
  person: UserTypes;
  handleOpenSecondModal: (person: UserTypes) => void;
}) => (
  <div className="border-2 flex justify-between items-center p-2 rounded-lg">
    <div className="flex items-center gap-2">
      <div className="rounded-full">
        <img
          src={baseURL + person.profilePicture}
          alt="personPhoto"
          className="w-[60px] h-[60px] object-cover rounded-full"
        />
      </div>
      <div>
        <h1 className="text-black text-sm font-semibold">
          {person.firstName + " " + person.lastName}
        </h1>
        <p className="text-xs text-black">@{person?.username}</p>
      </div>
    </div>
    <button
      className="rounded-full"
      onClick={() => {
        handleOpenSecondModal(person);
      }}
    >
      <PiDotsThreeCircle style={{ fontSize: "25px", color: "black" }} />
    </button>
  </div>
);

const NewChatModal = ({
  closeModal,
  newChatSearch,
  handleNewChatSearch,
  filteredContacts,
  handleOpenSecondModal,
  isSecondModalOpen,
  handleStartNewChat,
  closeSecondModal,
}: {
  closeModal: () => void;
  newChatSearch: string;
  handleNewChatSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredContacts: UserTypes[] | undefined;
  handleOpenSecondModal: (person: UserTypes) => void;
  isSecondModalOpen: boolean;
  handleStartNewChat: (e: React.MouseEvent<HTMLButtonElement>) => void;
  closeSecondModal: () => void;
}) => {
  return (
    <div className="modal-container bg-white backdrop-blur-lg w-80 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-1">
      <div className="modal-content py-4 text-left px-4">
        <ModalHeader closeModal={closeModal} />
        <input
          type="text"
          value={newChatSearch}
          placeholder="Search by name"
          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none bg-[#e2e8f0]"
          onChange={handleNewChatSearch}
        />
      </div>
      <div className="w-full h-full p-4 flex flex-col gap-2 relative">
        {filteredContacts?.map((person: UserTypes) => (
          <ChatPerson
            key={person._id}
            person={person}
            handleOpenSecondModal={handleOpenSecondModal}
          />
        ))}
      </div>
      {isSecondModalOpen && (
        <div className="modal absolute top-[11.5rem] right-10 w-40 h-fit flex items-center justify-center">
          <div className="modal-container bg-white backdrop-blur-lg w-80 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-1">
            <div className="flex justify-start flex-col items-start modal-content py-2 text-left px-4">
              <button
                className="flex justify-center gap-2 items-center"
                onClick={(e) => {
                  handleStartNewChat(e);
                  closeSecondModal();
                }}
              >
                <MdOutlineMessage />
                <p className="text-2xl text-[0.75rem]">Send Message</p>
              </button>
              <button
                className="flex justify-center gap-2 items-center"
                onClick={() => {
                  closeSecondModal();
                }}
              >
                <CiPhone />
                <p className="text-2xl text-[0.75rem]">Audio Call</p>
              </button>
              <button
                className="flex justify-center gap-2 items-center"
                onClick={() => {
                  closeSecondModal();
                }}
              >
                <IoVideocamOutline />
                <p className="text-2xl text-[0.75rem]">Video Call</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
