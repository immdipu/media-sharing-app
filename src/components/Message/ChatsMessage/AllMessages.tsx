"use client";
import React from "react";
import Messages from "@/components/FakeData/Messages.json";
import SenderText from "./SenderText";
import ReceiverText from "./ReceiverText";
import { MessageTypes } from "@/types/ApiResponseTypes";
import { useAppSelector } from "@/hooks/reduxHooks";

const AllMessages = ({ Messages }: { Messages: MessageTypes[] }) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <div className=" MessageContainer my-3 h-full w-full overflow-y-scroll  px-2 pl-12 pr-16 ">
      {Messages.map((message, index) => {
        const lastMessageFromSameSender =
          index > 0 && Messages[index - 1].sender._id === message.sender._id;
        if (message.sender._id === user?.id) {
          return (
            <SenderText
              key={index}
              lastMessageFromSameSender={lastMessageFromSameSender}
              message={message.content}
              date={message.createdAt}
            />
          );
        } else {
          return (
            <ReceiverText
              key={index}
              lastMessageFromSameSender={lastMessageFromSameSender}
              message={message.content}
              date={message.createdAt}
              senderPicture={message.sender.profilePic}
              senderId={message.sender._id}
            />
          );
        }
      })}
    </div>
  );
};

export default AllMessages;
