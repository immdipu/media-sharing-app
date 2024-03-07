"use client";
import React from "react";
import RoomMembers from "./organism/RoomMembers";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomCardHeader from "./atoms/RoomCardHeader";
import JoinButton from "./atoms/JoinButton";

const RoomCard: React.FC<RoomTypes> = ({
  admin,
  bannedUsers,
  createdAt,
  id,
  members,
  membersLimit,
  moderators,
  name,
  roomType,
}) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <div className="  flex w-full flex-col  rounded-xl    border border-primary-color bg-Secondary-background   px-5 py-2">
      <RoomCardHeader createdAt={createdAt} name={name} roomType={roomType} />
      <RoomMembers membersLimit={membersLimit} members={members} />
      <JoinButton
        adminId={admin._id}
        id={id}
        isAuthenticated={user.isUserAuthenticated}
        members={members}
        membersLimit={membersLimit}
        userId={user.id}
      />
    </div>
  );
};

export default RoomCard;
