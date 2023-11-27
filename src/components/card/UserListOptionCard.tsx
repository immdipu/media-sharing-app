"use client";
import React from "react";
import { MdBlock } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";

import { MdAddModerator } from "react-icons/md";
import { useAppSelector } from "@/hooks/reduxHooks";
import { TransferRoomAlert } from "../Dialog/TransferRoomAlert";
import { useSocket } from "@/context/SocketProvider";
import { RoomUpdateTypes } from "@/types/socketTypes";

const UserListOptionCard = ({ id }: { id: string }) => {
  const currentUser = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { EmitCustomEvent } = useSocket();

  const isCurrentUserAdmin = JoinedRoom?.admin?._id === currentUser?.id;

  if (currentUser?.id === id) return null;

  return (
    <>
      {isCurrentUserAdmin && <TransferRoomAlert id={id} />}
      {isCurrentUserAdmin && (
        <li className=" flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
          <MdAddModerator className="text-lg text-blue-700" />{" "}
          <span className="text-sm text-Paragraph-primary">
            Add as moderator
          </span>
        </li>
      )}
      <li className=" flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <MdBlock className="text-lg text-red-600" />{" "}
        <span className="text-sm text-Paragraph-primary">Block User</span>
      </li>
      {isCurrentUserAdmin && (
        <li
          onClick={() => {
            const data: RoomUpdateTypes = {
              type: "KickUser",
              AdminId: currentUser?.id!,
              roomId: JoinedRoom?._id!,
              ToKickId: id,
            };
            EmitCustomEvent("room-update", data);
          }}
          className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-Main-background"
        >
          <IoExitOutline className="text-lg text-red-600" />{" "}
          <span className="text-sm text-Paragraph-primary">Kick out</span>
        </li>
      )}
      <li className="flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <SlUserFollow className="text-base text-Paragraph-primary" />{" "}
        <span className="text-sm text-Paragraph-primary">Follow</span>
      </li>
    </>
  );
};

export default UserListOptionCard;
