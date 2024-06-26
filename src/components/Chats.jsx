import React, { useState, useContext } from "react";
import "../index.css";
import { syncIt } from "../App";
import { RiArrowRightDoubleLine } from "react-icons/ri";

const Chats = ({ roomId, username, setChatNavigationBar }) => {
  const { so } = useContext(syncIt);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);

  const sendMessage = () => {};

  so.on("receiveMsg", (data) => {
    setChats(data);
  });

  return (
    <>
      <div className="min-w-[900px] h-full flex flex-col p-4 max-w-[900px] bg-black">
        <div className="w-full flex justify-end">
          <h1 className="justify-self-center pr-5 text-white text-center text-2xl font">
            GROUP CHAT
          </h1>
          <button
            onClick={() => {
              setChatNavigationBar(false);
            }}
            className="bg-gray-400 text-white p-1 px-4 font rounded-sm"
          >
            BACK
          </button>
        </div>
        <div className="w-full mt-1 h-[2px] bg-gray-400"></div>
        {/* display all chats here */}
        <div className="w-full p-2 mt-2 h-[600px] flex flex-col  overflow-scroll scroll  border-2 border-white">
          {chats.map((item) => {
            const { chat } = item;
            return (
              <>
                {item.userName === username ? null : (
                  <div
                    className="max-w-[400px] m-2 p-1 rounded-md flex flex-col  font max-h-[100px]  text-white "
                    style={{
                      backgroundColor: "grey",
                      justifyContent: "start",
                      color: "white",
                    }}
                  >
                    <h1 className="text-white font text-[12px] border-b-2 border-gray-400">
                      {item.userName}
                    </h1>
                    <div className="text-white font text-md">{chat}</div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {/* To send chats */}
        <div className="w-full p-2 h-[70px] flex justify-center items-center   mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="ENTER MESSAGE...."
            className="font m-2 max-w-[500px] min-w-[500px] rounded-md p-2 h-[40px] outline-none "
          />
          <button
            onClick={(e) => {
              so.emit("sendMsg", roomId, username, input);
              e.preventDefault();
              sendMessage();
              setInput("");
            }}
            className="font text-xl flex justify-center items-center text-white max-w-[500px] min-w-[200px] rounded-md p-2 h-[40px] bg-gray-400"
          >
            <h1>SEND</h1>
            <RiArrowRightDoubleLine className="text-2xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chats;
