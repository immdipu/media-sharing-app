import React from "react";
import MessageSend from "@/components/Icons/MessageSend";

const MessageSendButon = ({ onclick }: { onclick: () => void }) => {
  return (
    <button
      onClick={onclick}
      className="rounded-md bg-neutral-800 active:scale-95"
    >
      <MessageSend height={"50px"} width={"50px"} color="#d7d7d7" />
    </button>
  );
};

export default MessageSendButon;
