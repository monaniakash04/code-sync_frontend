import "./App.css";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import React, { useRef, createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
export const syncIt = createContext();

function App() {
  const socket = useRef();

  const [listOfUsers, setListOfUsers] = useState([]);
  const so = io(process.env.REACT_APP_BACKEND_URL);
  socket.current = so;

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState({
    lang: "javascript",
    file: "script.js",
    defaultValue: `console.log("Hello World!")`,
  });
  const [listOfLanguage, setListOfLanguage] = useState([
    {
      lang: "javascript",
      file: "script.js",
      defaultValue: `console.log("Hello World!")`,
    },
  ]);

  return (
    <>
      <syncIt.Provider
        value={{
          username,
          setUsername,
          roomId,
          setRoomId,
          listOfLanguage,
          setListOfLanguage,
          language,
          setLanguage,
          so,
          listOfUsers,
          setListOfUsers,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor/:username/:roomId" element={<Editor />} />
          </Routes>
        </BrowserRouter>
      </syncIt.Provider>
    </>
  );
}

export default App;
