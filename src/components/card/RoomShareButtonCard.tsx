/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { roomActivityTypes } from "@/types/roomActivity";
import clsx from "clsx";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import { ActivityTypes } from "@/types/room";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";

const RoomShareButtonCard: React.FC<roomActivityTypes> = ({
  ActivityType,
  _id,
  admin,
  createdAt,
  data,
  status,
  users,
}) => {
  const user = useAppSelector((state) => state.auth);

  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room);
  const { setOthersSelectedUserVideo } = useContext(RoomContext);

  const isWatching = users?.find((u) => u._id == user?.id);

  const isMySharedVideo = JoinedRoom?.JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
  );

  const handleJoinAndLeave = () => {
    if (isWatching) {
      if (isMySharedVideo === undefined) {
        setOthersSelectedUserVideo(false);
      }

      let data: ActivityTypes = {
        type: "REMOVE_MEMBER_FROM_ACTIVITY",
        roomID: JoinedRoom.JoinedRoom?._id!,
        userID: user?.id!,
        activityID: _id!,
      };
      EmitCustomEvent("room-update", data);
    } else {
      if (isMySharedVideo === undefined) {
        setOthersSelectedUserVideo(true);
      }
      let data: ActivityTypes = {
        type: "ADD_MEMBER_FROM_ACTIVITY",
        roomID: JoinedRoom.JoinedRoom?._id!,
        userID: user?.id!,
        activityID: _id!,
      };
      EmitCustomEvent("room-update", data);
    }
  };

  return (
    <div className="w-16">
      <section className="flex">
        {users?.map((user, key) => (
          <Avatar className="h-4 w-4 rounded-full " key={key}>
            <AvatarImage src={user?.profilePic} alt="@shadcn" />
            <AvatarFallback>{user?.fullName}</AvatarFallback>
          </Avatar>
        ))}
      </section>
      <Avatar
        onClick={handleJoinAndLeave}
        className={clsx(
          "group mt-1 h-14 w-14 cursor-pointer rounded-md  ",
          isWatching ? " shadow-lg shadow-blue-500 ring-2 ring-blue-500" : "",
        )}
      >
        <AvatarImage src={admin?.profilePic} alt="@shadcn" className="" />
        <AvatarFallback>{admin?.fullName}</AvatarFallback>
        {data?.thumbnail && (
          <img
            className={clsx(
              "absolute h-full w-full object-cover opacity-0 transition-opacity duration-200 ease-linear group-hover:opacity-70",
            )}
            src={data?.thumbnail}
            alt=""
          />
        )}
      </Avatar>
    </div>
  );
};

export default RoomShareButtonCard;
