"use client";
import React, { useState } from "react";
import { RoomMessageTypes } from "@/types/room";
import momemnt from "moment";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import MessageOptions from "./MessageOptions";
import clsx from "clsx";
import MessageReaction from "./MessageReaction/MessageReaction";

interface SinlgeMessageContextTypes {
  showEmojis: boolean;
  setShowEmojis: React.Dispatch<React.SetStateAction<boolean>>;
  messageId?: string;
}

const initialState: SinlgeMessageContextTypes = {
  showEmojis: false,
  setShowEmojis: () => {},
  messageId: "",
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
          <div className="flex h-fit items-center gap-2  py-px ">
            <h4 className="light:text-green-500 l h-fit max-w-[180px] overflow-hidden  overflow-ellipsis whitespace-nowrap  text-sm font-medium capitalize leading-none  text-Header-secondary ">
              {sender?.fullName}
            </h4>
            <div className="h-1 w-1 rounded-full bg-pill-circle" />
            <span className="text-[0.70rem] font-normal text-paragraph-secondary opacity-60 ">
              {" "}
              {momemnt(createdAt).format("hh:mm A")}
            </span>
          </div>

          <div className="relative mt-[2px] ">
            <p className="mr-3 block w-full break-words   pb-2 text-sm font-normal leading-5  text-paragraph-secondary ">
              {content}
            </p>
          </div>
        </div>
      </section>

      <SinlgeMessageContext.Provider
        value={{ showEmojis, setShowEmojis, messageId: _id }}
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
