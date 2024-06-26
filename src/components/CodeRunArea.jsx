import React from "react";
import "../index.css";

const CodeRunArea = ({ codeRunBar, setCodeRunBar, output }) => {
  return (
    <div className="font-mono duration-200 z-10 text-lg min-w-[900px] max-w-[900px]  flex flex-col  text-white p-4  h-full bg-black">
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setCodeRunBar(false);
          }}
          className="bg-gray-400 p-1 px-4 font rounded-sm"
        >
          BACK
        </button>
      </div>
      <div className="w-full mt-1 h-[2px] bg-gray-400"></div>
      <div className="w-full mt-2 h-full  overflow-scroll scroll">
        OUTPUT:{output}
      </div>
    </div>
  );
};

export default CodeRunArea;
