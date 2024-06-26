import React, { useContext, useEffect } from "react";
import logo from "../media/logo194.png";
import "../index.css";
// import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { syncIt } from "../App";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { roomId, setRoomId, username, setUsername, so } = useContext(syncIt);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const updateUserList = () => {};

  return (
    <div className="w-full flex  justify-center items-center h-[100vh] bg-[#171717]">
      <div className="w-[500px] rounded-lg flex flex-col justify-center  p-5 h-[400px] bg-[#000000] text-white">
        <div className="w-full h-[100px] justify-center items-center flex  gap-2">
          <div className="max-w-[200px] h-[30px] ">
            <img src={logo} className="w-full h-full rounded-md" alt="" />
          </div>
          <div className="max-w-[400px] h-[40px] mt-2">
            <h1 className="text-2xl font">SYNC IT</h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-center  justify-center gap-3 h-200">
          <form action="">
            <div className="w-full flex flex-col justify-center items-center gap-5">
              <input
                type="text"
                className="font text-black p-1 rounded-md w-[300px] h-[30px] outline-none"
                name="roomId"
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="ROOM ID"
                value={roomId}
                id=""
              />
              <input
                type="text"
                className="font text-black p-2 rounded-md w-[300px] h-[30px] outline-none"
                name="username"
                value={username}
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                id=""
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (roomId !== "" && username !== "") {
                    navigate(`/editor/${username}/${roomId}`);
                  } else {
                    alert("Please Fill All The Filed");
                  }
                  updateUserList();
                }}
                className="w-[200px] rounded-md h-[30px] text-2xl bg-white font text-[#171717]"
              >
                JOIN ROOM
              </button>
            </div>
          </form>
          <div className="font text-xl">
            DON'T HAVE ROOM ID?
            <span
              onClick={() => {
                setRoomId(uuid());
              }}
              className="text-gray-400 hover:border-b-2 border-b-gray-400 cursor-pointer"
            >
              &nbsp;GENERATE ROOM ID
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
