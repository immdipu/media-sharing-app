import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbLogout2 } from "react-icons/tb";
import { RoomJoinLeaveTypes } from "@/types/room";

const RoomJoinNotificationCard: React.FC<RoomJoinLeaveTypes> = ({
  Type,
  createdAt,
  status,
  user,
}) => {
  return (
    <div className="  bg-third-background flex items-center px-3 py-2 hover:bg-secondary-hover">
      <Avatar className="h-10 w-10 rounded-md">
        <AvatarImage src={user?.profilePic} />
        <AvatarFallback className="uppercase">
          {user?.fullName?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="ml-2 w-full">
        <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-Header-secondary ">
          {user?.fullName}
        </h4>
        <h3 className="text-sm text-green-600 ">Joined the room</h3>
      </div>
      <div>
        <TbLogout2 className="mr-1 text-2xl text-green-600" />
      </div>
    </div>
  );
};

export default RoomJoinNotificationCard;