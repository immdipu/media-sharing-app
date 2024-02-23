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
    <div className="group flex flex-col px-3 py-1 hover:bg-secondary-hover">
      <section className=" flex">
        <UserAvatarWithPopOver
          ImageLink={sender.profilePic}
          username={sender.username}
          fallback={sender.fullName}
        />

        <div className="ml-2 w-full">
          <div className="flex items-center gap-3">
            <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium capitalize text-Header-secondary ">
              {sender?.fullName}
            </h4>
          </div>

          <div className=" relative ">
            <p className="mr-3 line-clamp-3 block  w-full break-words  pb-2 text-xs  font-light  text-Paragraph-primary   ">
              {content}
              <span className="">
                <span className="px-3">
                  {" "}
                  <span className="text-xs opacity-0"></span>{" "}
                </span>
              </span>
            </p>
            <div className=" absolute bottom-1 right-5 flex  w-full justify-end ">
              <span className="text-[0.65rem] font-extralight text-neutral-200 ">
                {" "}
                {momemnt(createdAt).format("hh:mm A")}
              </span>
            </div>
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
