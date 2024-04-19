import { FormEvent, useState } from "react";
import { IoMdSend } from "react-icons/io";

// type ChatInputPropType = {
//   handleMessage: Promise<JSX.Element>;
// };
const ChatInput = ({ handleMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (message.length > 0) {
      handleMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 h-[5rem] px-4 md: py-4 bg-[#080420] ">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          name="input-text"
          placeholder="Message"
          className="w-full h-12 rounded-lg bg-[#ffffff34] text-white px-4 focus:outline-none "
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          type="submit"
          className="ml-2 bg-purple-600 text-white rounded-lg px-4 py-2 flex items-center justify-center focus:outline-none h-full"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
