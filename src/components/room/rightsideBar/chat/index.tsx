"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";
import { RoomJoinRequestCard } from "@/components/card";

const SingleMessage = dynamic(
  () => import("@/components/Message/SingleMessage"),
);
const RoomJoinNotificationCard = dynamic(
  () => import("@/components/card/RoomJoinNotificationCard"),
);

const RoomLeaveNotificationCard = dynamic(
  () => import("@/components/card/RoomLeaveNotificationCard"),
);

const RoomUpdateCard = dynamic(
  () => import("@/components/card/RoomUpdateCard"),
);

const ReplyMessage = dynamic(
  () => import("@/components/Message/atoms/ReplyMessage"),
);

const MessageInput = dynamic(
  () => import("@/components/Message/organism/MessageInput"),
);

const Chat = () => {
  const Messages = useAppSelector((state) => state.room.RoomChat);
  const user = useAppSelector((state) => state.auth);
  const joinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const [parent, enableAnimations] = useAutoAnimate();
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);

  // useEffect(() => {
  //   const messageContainer = document.querySelector(".MessageContainer");
  //   if (messageContainer) {
  //     messageContainer.scrollTop = messageContainer.scrollHeight;
  //   }
  // }, [Messages?.length]);

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
    <motion.div
      initial={tabAnimation.initial}
      animate={tabAnimation.animate}
      exit={tabAnimation.exit}
      transition={tabAnimation.transition}
      className="flex h-full flex-col justify-end  "
    >
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
            if (
              message.Type === "RoomJoinRequest" &&
              joinedRoom?.admin?._id === user.id
            ) {
              return <RoomJoinRequestCard key={index} {...message} />;
            }
          })}
      </section>
      <section className="h-fit   ">
        <MessageInput MessageType="ROOM" row={3} />
      </section>
    </motion.div>
  );
};

export default Chat;
