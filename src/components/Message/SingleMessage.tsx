"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { RoomMessageTypes } from "@/types/room";
import momemnt from "moment";

const SingleMessage: React.FC<RoomMessageTypes> = ({
  Type,
  content,
  createdAt,
  sender,
}) => {
  return (
    <div className="  flex px-3 py-2 hover:bg-secondary-hover">
      <Avatar className="h-10 w-10">
        <AvatarImage src={sender?.profilePic} />
        <AvatarFallback className="uppercase">
          {sender?.fullName?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="ml-2 w-full">
        <div className="flex items-center gap-3">
          <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium capitalize text-Header-secondary ">
            {sender?.fullName}
          </h4>
        </div>

        <div className=" relative ">
          <p className="mr-3 line-clamp-3 block  w-full break-words  pb-2 text-xs  font-light capitalize text-Paragraph-primary   ">
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
              {momemnt(createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
