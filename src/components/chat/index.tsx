import React from "react";
import SingleMessage from "@/components/chat/Message/SingleMessage";
import MessageInput from "./Message/MessageInput";

const index = () => {
  return (
    <div className="flex h-full flex-col justify-end pb-1">
      <section className="MessageContainer h-full overflow-y-auto ">
        <SingleMessage />
        <SingleMessage />

        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
        <SingleMessage />
      </section>
      <section className="h-14   ">
        <MessageInput />
      </section>
    </div>
  );
};

export default index;
