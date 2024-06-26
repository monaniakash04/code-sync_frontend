import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../media/logo194.png";
import "../index.css";
import { CiMenuFries } from "react-icons/ci";
import { syncIt } from "../App";
import { FaPlay } from "react-icons/fa6";
import { BsChatLeftDotsFill } from "react-icons/bs";
import { MdCloseFullscreen } from "react-icons/md";
import Avatar from "react-avatar";
import toast, { Toaster } from "react-hot-toast";
import CodeRunArea from "../components/CodeRunArea";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { aura } from "@uiw/codemirror-theme-aura";
import Chats from "../components/Chats";

const Editor = () => {
  const { username, roomId } = useParams();
  const nav = useNavigate();
  const [codeRunBar, setCodeRunBar] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("");
  const [chatNavigationBar, setChatNavigationBar] = useState(false);
  const { listOfLanguage, so } = useContext(syncIt);

  so.on("listOfUsers", (data) => {
    setListOfUsers(data);
  });

  const onChange = (val) => {
    setCode(val);
    so.emit("code", code, roomId);
  };
  so.on("sync", (data) => {
    setCode(data);
  });
  useEffect(() => {
    so.emit("joinroom", roomId, username);
  }, []);

  const showToast = (msg) => {
    toast.success(msg);
  };
  so.on("leaveroomsignal", (data) => {
    showToast(`${data} has left the room`);
  });

  so.on("outputCode", (data) => {
    setOutput(data);
  });
  return (
    <>
      <div className="w-full h-[100vh] flex   bg-[#171717]">
        <Toaster />
        <div
          style={{
            left: navigate ? "0%" : "-100%",
          }}
          className="min-w-[300px] duration-300 z-30 left-[0%] absolute justify-self-center h-full max-w-[500px] flex items-center flex-col bg-[#000000]"
        >
          {/* logo */}
          <div className="w-full gap-2 h-[60px] flex justify-center items-center">
            <div className="max-w-[120px] h-[27px]">
              <img src={logo} className="w-full h-full rounded-md" alt="" />
            </div>
            <div>
              <h1 className="font text-2xl text-white">SYNC IT</h1>
            </div>
          </div>
          {/* divider */}
          <div className="w-full h-[2px] bg-gray-400"></div>
          {/* navigate with voice */}
          <div className="flex justify-center mt-2 w-full h-[30px]">
            <div className="min-w-[60px] flex gap-4 text-white h-[15px] text-2xl">
              <FaPlay
                className="cursor-pointer"
                onClick={() => {
                  setCodeRunBar(!codeRunBar);
                  so.emit("inputCode", code);
                }}
              />
              <BsChatLeftDotsFill
                onClick={() => {
                  setChatNavigationBar(!chatNavigationBar);
                }}
                className="cursor-pointer"
              />
              <MdCloseFullscreen
                onClick={() => setNavigate(false)}
                className="cursor-pointer"
              />
            </div>
            <select
              className="ml-3 p-1 bg-white font text-black  rounded-md "
              name=""
              id=""
            >
              {listOfLanguage.map((item) => {
                const { lang } = item;

                return (
                  <option className="font" value={lang}>
                    {lang}
                  </option>
                );
              })}
            </select>
          </div>
          {/* divider */}
          <div className="w-full mt-1 h-[2px] bg-gray-400"></div>
          {/* user list */}
          <div className="justify-center mt-1  w-full p-[2px] h-[500px]  overflow-y-scroll scroll  grid grid-cols-3 gap-2">
            {listOfUsers.map((item) => {
              return (
                <div className="flex flex-col items-center">
                  <Avatar name={item} size="40" round="20px" color="#171717" />
                  <h1 className="font text-sm text-wrap text-white">{item}</h1>
                </div>
              );
            })}
          </div>
          <div className="w-full h-[2px] bg-gray-400"></div>
          <div className="mt-10 w-full p-1">
            <button
              onClick={async (e) => {
                e.preventDefault();
                await navigator.clipboard.writeText(roomId);
                showToast("Room Id is Copied");
              }}
              className="w-full h-[30px] rounded-lg px-[3px] py-1 font text-xl text-black bg-white"
            >
              COPY ROOMID{" "}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                so.emit("leaveroom", roomId, username);
                nav("/");
              }}
              className="w-full mt-2 h-[30px] rounded-lg px-[3px] py-1 font text-xl text-black bg-white"
            >
              LEAVE ROOM
            </button>
          </div>
        </div>

        {/*  naviagte with sidebar*/}
        <div className="w-[50px] h-[100vh] bg-[#000000] flex justify-center p-1 ">
          <CiMenuFries
            color="white"
            onClick={() => setNavigate(true)}
            className="cursor-pointer font-bold text-white text-2xl"
          />
        </div>

        {/* CODING AREA */}
        <div className="w-full ">
          <CodeMirror
            value={code}
            height="100vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            className="text-xl  overflow-scroll scroll "
            theme={aura}
            lang={javascript}
          />
          {/* <CodeArea roomId={roomId} /> */}
        </div>
        <div
          style={{
            transform: codeRunBar ? "translateY(0%)" : "translateY(-100%)",
          }}
          className="absolute duration-100 z-10 left-[50px] h-[100vh] "
        >
          <CodeRunArea
            setCodeRunBar={setCodeRunBar}
            output={output}
            codeRunBar={codeRunBar}
          />
        </div>
        <div
          style={{
            transform: chatNavigationBar
              ? "translateY(0%)"
              : "translateY(-100%)",
          }}
          className="absolute duration-100 z-0 left-[50px] h-[100vh] "
        >
          <Chats
            username={username}
            setChatNavigationBar={setChatNavigationBar}
            roomId={roomId}
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
