"use client";
import React, { useEffect, useState } from "react";
import SingleMessage from "@/components/Message/SingleMessage";
import MessageInput from "../../../Message/MessageInput";
import RoomLeaveNotificationCard from "@/components/card/RoomLeaveNotificationCard";
import RoomJoinNotificationCard from "@/components/card/RoomJoinNotificationCard";
import RoomUpdateCard from "@/components/card/RoomUpdateCard";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ReplyMessage from "@/components/Message/atoms/ReplyMessage";

const Chat = () => {
  const Messages = useAppSelector((state) => state.room.RoomChat);
  const [parent, enableAnimations] = useAutoAnimate();
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const messageContainer = document.querySelector(".MessageContainer");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [Messages?.length]);

  const scrollToMessage = (messageId: string) => {
    const messageContainer = document.querySelector(".MessageContainer");
    if (messageContainer) {
      const originalMessage = document.getElementById(messageId);
      if (originalMessage) {
        originalMessage.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedMessageId(messageId);
      }
    }
  };

  return (
    <div className="flex h-full flex-col justify-end  ">
      <section
        ref={parent}
        className="MessageContainer my-4 h-full overflow-y-auto scroll-smooth"
      >
        {Messages &&
          Messages.length > 0 &&
          Messages?.map((message, index) => {
            if (message.Type === "JoinLeaveNotification") {
              if (message.status === "joined")
                return <RoomJoinNotificationCard key={index} {...message} />;
              if (message.status === "left")
                return <RoomLeaveNotificationCard key={index} {...message} />;
            }
            if (message.Type === "message") {
              return (
                <SingleMessage
                  key={index}
                  {...message}
                  highlightedMessageId={highlightedMessageId}
                />
              );
            }

            if (message.Type === "reply") {
              return (
                <ReplyMessage
                  key={index}
                  {...message}
                  scrollToMessage={scrollToMessage}
                  highlightedMessageId={highlightedMessageId}
                />
              );
            }

            if (message.Type === "RoomUpdate") {
              return (
                <RoomUpdateCard
                  key={index}
                  message={message.message}
                  updatedBy={message.updatedBy}
                />
              );
            }
          })}
      </section>
      <section className="h-fit   ">
        <MessageInput MessageType="ROOM" row={3} />
      </section>
    </div>
  );
};

export default Chat;
