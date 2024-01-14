import React from "react";
import MessageInput from "../MessageInput";
import AllMessages from "./AllMessages";

const Message = () => {
  return (
    <div className="h-[calc(100vh-64px) flex w-full flex-col overflow-hidden bg-Main-background pb-2">
      <AllMessages />
      <MessageInput />
    </div>
  );
};

export default Message;
