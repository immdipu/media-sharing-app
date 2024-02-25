import React from "react";
import MessageTime from "../atoms/MessageTime";
import Sender from "../atoms/Sender";

interface MessageHeaderProps {
  name: string;
  date: Date | string;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ date, name }) => {
  return (
    <div className="flex h-fit items-center gap-2  py-px ">
      <Sender name={name} />
      <MessageTime date={date} />
    </div>
  );
};

export default MessageHeader;
