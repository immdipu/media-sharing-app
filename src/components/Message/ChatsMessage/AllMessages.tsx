"use client";
import React, { useEffect } from "react";
import SenderText from "./SenderText";
import ReceiverText from "./ReceiverText";
import { useAppSelector } from "@/hooks/reduxHooks";

const AllMessages = ({ Messages }: { Messages: MessageTypes[] }) => {
  const user = useAppSelector((state) => state.auth);

  useEffect(() => {
    const messageContainer = document.querySelector(".Messages");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [Messages.length]);

  return (
    <div className="MessageContainer Messages my-5 h-full w-full overflow-y-scroll  px-2 pl-12 pr-16 ">
      {Messages.map((message, index) => {
        const lastMessageFromSameSender =
          index > 0 && Messages[index - 1].sender._id === message?.sender._id;
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
              username={message.sender.username}
            />
          );
        }
      })}
    </div>
  );
};

export default AllMessages;
