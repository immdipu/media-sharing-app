import React from "react";
import { TbLogout2 } from "react-icons/tb";
import { RoomJoinLeaveTypes } from "@/types/room";
import MessageHeader from "../Message/organism/MessageHeader";
import dynamic from "next/dynamic";
import UserProfilePopoverCardSkeleton from "../Skeleton/UserProfilePopoverCardSkeleton";
const UserAvatarWithPopOver = dynamic(
  () => import("@/components/Resuable/UserAvatarWithPopOver"),
  {
    loading: () => <UserProfilePopoverCardSkeleton />,
  },
);

const RoomJoinNotificationCard: React.FC<RoomJoinLeaveTypes> = ({
  Type,
  createdAt,
  status,
  user,
}) => {
  return (
    <div className="flex items-center  px-3 py-2 hover:bg-Main-background">
      <UserAvatarWithPopOver
        ImageLink={user?.profilePic}
        fallback={user?.fullName[0]}
        username={user?.fullName}
      />
      <div className="relative ml-2 w-full">
        <MessageHeader name={user?.fullName} date={createdAt} />
        <h3 className="font-poppins text-xs font-medium text-green-600">
          Joined the room
        </h3>
      </div>
      <div>
        <TbLogout2 className="mr-1 text-2xl text-green-600" />
      </div>
    </div>
  );
};

export default RoomJoinNotificationCard;
