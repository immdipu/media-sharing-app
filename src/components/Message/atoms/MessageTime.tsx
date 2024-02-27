import React from "react";
import momemnt from "moment";

interface MessageTimeProps {
  date: Date | string;
}

const MessageTime: React.FC<MessageTimeProps> = ({ date }) => {
  return (
    <>
      <div className="h-1 w-1 rounded-full bg-pill-circle" />
      <span className="font-roboto text-[0.70rem] text-paragraph-secondary opacity-60 ">
        {" "}
        {momemnt(date).format("hh:mm A")}
      </span>
    </>
  );
};

export default MessageTime;
