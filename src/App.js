import "./App.css";
import Home from "./pages/Home";
import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const syncIt = createContext();
function App() {
  const [inputInfo, setInputInfo] = useState({
    roomId: "",
    username: "",
  });
  return (
    <>
      <syncIt.Provider value={{ inputInfo, setInputInfo }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </syncIt.Provider>
    </>
  );
}

export default App;
