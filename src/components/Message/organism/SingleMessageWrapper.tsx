"use client";
import React, { useState } from "react";
import UserAvatarWithPopOver from "@/components/Resuable/UserAvatarWithPopOver";
import dynamic from "next/dynamic";
import clsx from "clsx";
import MessageHeader from "../organism/MessageHeader";

const MessageReaction = dynamic(
  () => import("../MessageReaction/MessageReaction"),
  {
    loading: () => (
      <div className="h-2 w-2 animate-pulse rounded-md bg-Main-background" />
    ),
  },
);

const MessageOptions = dynamic(() => import("../MessageOptions"), {
  loading: () => <p>Loading...</p>,
});

interface SingleMessageWrapperProps
  extends RoomMessageTypes,
    MessageReplyTypes {
  children: React.ReactNode;
  Type: any;
  highlightedMessageId: string | null;
}

const SingleMessageWrapper: React.FC<SingleMessageWrapperProps> = ({
  Type,
  content,
  createdAt,
  sender,
  _id,
  reactions,
  children,
  replyTo,
  highlightedMessageId,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div
      className={clsx(
        "group relative flex flex-col px-3 py-1 hover:bg-Main-background",
        showEmojis && "bg-Main-background",
        highlightedMessageId === _id && "highlightedMessage",
      )}
      id={_id}
    >
      <section className=" flex items-start">
        <UserAvatarWithPopOver
          ImageLink={sender.profilePic}
          username={sender.username}
          fallback={sender.fullName}
          className="mt-1"
        />

        <div className="ml-2 w-full">
          <MessageHeader date={createdAt} name={sender?.fullName} />
          {children}
        </div>
      </section>

      {reactions && reactions.length > 0 && (
        <MessageReaction reactions={reactions} />
      )}
      <MessageOptions
        setShowEmojis={setShowEmojis}
        showEmojis={showEmojis}
        _id={_id}
        reactions={reactions}
      />
    </div>
  );
};

export default SingleMessageWrapper;
