"use client";
import React from "react";
import Messages from "@/components/FakeData/Messages.json";
import SenderText from "./SenderText";
import ReceiverText from "./ReceiverText";

const AllMessages = () => {
  return (
    <div className=" h-[82vh] w-full max-w-6xl overflow-y-scroll  border px-2 pl-12 ">
      {Messages.map((message, index) => {
        const lastMessageFromSameSender =
          index > 0 &&
          Messages[index - 1].sender._id === message.sender._id &&
          Messages[index - 1]._id === message._id;
        if (message.sender._id === "01") {
          return (
            <SenderText
              key={index}
              lastMessageFromSameSender={lastMessageFromSameSender}
              message={message.text}
              date={message.createdAt}
            />
          );
        } else {
          return (
            <ReceiverText
              key={index}
              lastMessageFromSameSender={lastMessageFromSameSender}
              message={message.text}
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
