import React from "react";
import { TbLogout2 } from "react-icons/tb";
import MessageTime from "../Message/atoms/MessageTime";
import { RoomJoinLeaveTypes } from "@/types/room";
import moment from "moment";
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
    <div className="  bg-third-background flex items-center px-3 py-2 hover:bg-secondary-hover">
      <UserAvatarWithPopOver
        ImageLink={user?.profilePic}
        fallback={user?.fullName[0]}
        username={user?.fullName}
        className="h-8 w-8"
      />
      <div className="relative ml-2 w-full">
        <div className="flex items-center">
          <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-Header-secondary ">
            {user?.fullName}{" "}
          </h4>
          <MessageTime date={createdAt} />
        </div>

        <h3 className="text-xs text-green-600">Joined the room</h3>
      </div>
      <div>
        <TbLogout2 className="mr-1 text-2xl text-green-600" />
      </div>
    </div>
  );
};

export default RoomJoinNotificationCard;
