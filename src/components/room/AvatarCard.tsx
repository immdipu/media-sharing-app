"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AvatarCard: React.FC<membersTypes> = ({
  _id,
  fullName,
  profilePic,
  username,
  verified,
}) => {
  return (
    <div className="   flex w-32 flex-col items-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src={profilePic} />
        <AvatarFallback>{fullName?.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <Tooltip delayDuration={400}>
        <TooltipTrigger className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap px-3 text-sm font-light capitalize text-neutral-200">
          {" "}
          {fullName}
        </TooltipTrigger>
        <TooltipContent>
          <p>{fullName}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AvatarCard;
