import React from "react";
import { TbLogout } from "react-icons/tb";
import dynamic from "next/dynamic";
import UserProfilePopoverCardSkeleton from "../Skeleton/UserProfilePopoverCardSkeleton";
import MessageHeader from "../Message/organism/MessageHeader";

const UserAvatarWithPopOver = dynamic(
  () => import("@/components/Resuable/UserAvatarWithPopOver"),
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
    <div className=" flex items-center px-3 py-2 hover:bg-Main-background ">
      <UserAvatarWithPopOver
        ImageLink={user?.profilePic}
        fallback={user?.fullName[0]}
        username={user?.fullName}
      />
      <div className="relative ml-2 w-full">
        <MessageHeader name={user?.fullName} date={createdAt} />
        <h3 className="font-poppins text-xs font-medium text-red-600 ">
          Left the room
        </h3>
      </div>
      <div>
        <TbLogout className="text-2xl text-red-600" />
      </div>
    </div>
  );
};

export default RoomLeaveNotificationCard;
