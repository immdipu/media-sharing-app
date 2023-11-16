import React from "react";
import SingleMessage from "@/components/chat/Message/SingleMessage";
import MessageInput from "./Message/MessageInput";

const index = () => {
  return (
    <div className="flex flex-col justify-end h-full">
      <section className="overflow-y-auto h-full ">
        <SingleMessage />
        <SingleMessage />
        -
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
      </section>
      <section className="h-24 ">
        <MessageInput />
      </section>
    </div>
  );
};

export default index;
