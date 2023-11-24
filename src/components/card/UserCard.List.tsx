import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { membersTypes } from "@/types/room";

const UserCardList: React.FC<membersTypes> = ({
  _id,
  followers,
  following,
  fullName,
  profilePic,
  role,
  username,
  verified,
}) => {
  return (
    <div className="flex px-4 py-3 hover:bg-secondary-hover">
      <Avatar className="h-10 w-10">
        <AvatarImage src={profilePic} />
        <AvatarFallback>{fullName.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="ml-2 flex-1 ">
        <h1 className="font-Helvetica flex  items-center  text-sm font-normal  text-Paragraph-primary">
          <p className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap  ">
            {fullName}
          </p>
          {/* <span className="text-paragraph-secondary ml-2 inline-block rounded-full border  border-secondary-color bg-Secondary-background px-2 py-[1px] text-xs">
            Admin
          </span> */}
          {/* <span className="ml-1 inline-block rounded-full border border-primary-color   bg-Input-background  px-2 py-[2px] text-xs leading-none text-Header-secondary ">
            owner
          </span> */}
        </h1>
        <h4 className="text-xs font-normal tracking-wide text-neutral-400">
          @{username}
        </h4>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <div className=" my-auto  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border  border-neutral-700 transition-colors duration-300 ease-linear hover:bg-neutral-700">
            <BsThreeDotsVertical className="text-neutral-300" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="mr-1 h-32 w-60">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserCardList;
