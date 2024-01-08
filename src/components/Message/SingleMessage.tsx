"use client";
import React from "react";
import { RoomMessageTypes } from "@/types/room";
import momemnt from "moment";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import MessageOptions from "./MessageOptions";
const SingleMessage: React.FC<RoomMessageTypes> = ({
  Type,
  content,
  createdAt,
  sender,
}) => {
  return (
    <div className="group flex flex-col px-3 py-1 hover:bg-neutral-900">
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
            <div className="bg-pill-circle h-1 w-1 rounded-full" />
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
      <section className=" z-10 ml-12 h-5 translate-y-2 leading-3 opacity-0 transition-all duration-500  ease-in-out group-hover:translate-y-0 group-hover:overflow-visible group-hover:opacity-100 ">
        <MessageOptions />
      </section>
    </div>
  );
};

export default SingleMessage;
