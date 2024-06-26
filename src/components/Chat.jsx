import React from "react";
import "../index.css";

const Chat = ({ bgcolor }) => {
  return (
    <>
      <div
        className="max-w-[400px] p-1 rounded-md flex flex-col  font min-h-[30px] text-white "
        style={{ backgroundColor: bgcolor, justifyContent: "start" }}
      >
        <h1 className="text-white font text-[12px] border-b-2 border-gray-400">
          AKASH MONANI
        </h1>
        <div className="text-white font text-md">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
          consectetur obcaecati maiores, ipsa similique officia illum
          perferendis autem perspiciatis consequatur, dolore id aperiam est
          animi laudantium numquam debitis rem a?
        </div>
      </div>
    </>
  );
};

export default Chat;
