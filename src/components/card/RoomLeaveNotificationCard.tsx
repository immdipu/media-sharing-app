import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbLogout } from "react-icons/tb";
import { RoomJoinLeaveTypes } from "@/types/room";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dynamic from "next/dynamic";
import UserProfilePopoverCardSkeleton from "../Skeleton/UserProfilePopoverCardSkeleton";
const UserProfilePopoverCard = dynamic(
  () => import("@/components/card/UserProfilePopoverCard"),
  {
    loading: () => <UserProfilePopoverCardSkeleton />,
  },
);

const RoomLeaveNotificationCard: React.FC<RoomJoinLeaveTypes> = ({
  Type,
  createdAt,
  status,
  user,
}) => {
  return (
    <div className="  flex items-center bg-third-background px-3 py-2 hover:bg-secondary-hover">
      <Popover>
        <PopoverTrigger>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.profilePic} />
            <AvatarFallback className="uppercase">
              {user.fullName?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="border-secondary-color bg-Secondary-background px-3">
          <UserProfilePopoverCard username={user.username} />
        </PopoverContent>
      </Popover>
      <div className="relative ml-2 w-full">
        <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-Header-secondary ">
          {user?.fullName}
        </h4>
        <span className="absolute -bottom-2 -right-1 float-right text-[10px] font-light text-paragraph-secondary">
          {" "}
          {moment(createdAt).format("hh:mm A")}
        </span>
        <h3 className="text-xs text-red-600 ">Left the room</h3>
      </div>
      <div>
        <TbLogout className="text-2xl text-red-600" />
      </div>
    </div>
  );
};

export default RoomLeaveNotificationCard;
