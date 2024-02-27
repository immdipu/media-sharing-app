"use client";
import React, { useState } from "react";
import { ReactionTypes, RoomMessageTypes } from "@/types/room";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import dynamic from "next/dynamic";
import clsx from "clsx";
import MessageHeader from "./organism/MessageHeader";

const MessageReaction = dynamic(
  () => import("./MessageReaction/MessageReaction"),
  {
    loading: () => (
      <div className="h-2 w-2 animate-pulse rounded-md bg-Main-background" />
    ),
  },
);

const MessageOptions = dynamic(() => import("./MessageOptions"), {
  loading: () => <p>Loading...</p>,
});

interface SinlgeMessageContextTypes {
  showEmojis: boolean;
  setShowEmojis: React.Dispatch<React.SetStateAction<boolean>>;
  messageId?: string;
  reactions: ReactionTypes[];
}

const initialState: SinlgeMessageContextTypes = {
  showEmojis: false,
  setShowEmojis: () => {},
  messageId: "",
  reactions: [],
};

export const SinlgeMessageContext =
  React.createContext<SinlgeMessageContextTypes>(initialState);

const SingleMessage: React.FC<RoomMessageTypes> = ({
  Type,
  content,
  createdAt,
  sender,
  _id,
  reactions,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div
      className={clsx(
        "group relative flex flex-col px-3 py-1 hover:bg-Main-background",
        showEmojis && "bg-Main-background",
      )}
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
          <div className="relative mt-[2px] ">
            <p className="mr-3 block w-full break-words pb-2  font-roboto text-sm font-normal leading-5  text-paragraph-secondary ">
              {content}
            </p>
          </div>
        </div>
      </section>

      <SinlgeMessageContext.Provider
        value={{ showEmojis, setShowEmojis, messageId: _id, reactions }}
      >
        {reactions && reactions.length > 0 && (
          <MessageReaction reactions={reactions} />
        )}
        <MessageOptions />
      </SinlgeMessageContext.Provider>
    </div>
  );
};

export default SingleMessage;
