import React from "react";
import MessageInput from "../MessageInput";
import AllMessages from "./AllMessages";

const Message = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full flex-col bg-Main-background pb-2">
      <AllMessages />
      <MessageInput />
    </div>
  );
};

export default Message;
