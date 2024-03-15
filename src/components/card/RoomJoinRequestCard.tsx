import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import MessageHeader from "../Message/organism/MessageHeader";
import { useSocket, useAppSelector } from "@/hooks";

const RoomJoinRequestCard: React.FC<RoomJoinRequest> = ({
  Type,
  _id,
  content,
  createdAt,
  reactions,
  sender,
  deleted,
}) => {
  const { EmitCustomEvent } = useSocket();
  const room = useAppSelector((state) => state.room.JoinedRoom);

  const AcceptRequest = () => {
    EmitCustomEvent("room-update", {
      type: "RoomJoinRequestResponse",
      roomId: room?.id,
      userId: sender._id,
      response: "accept",
    });
  };

  const RejectRequest = () => {
    EmitCustomEvent("room-update", {
      type: "RoomJoinRequestResponse",
      roomId: room?.id,
      userId: sender._id,
      response: "reject",
    });
  };

  return (
    <div className="group relative my-2 flex flex-col px-3  py-3 hover:bg-Main-background">
      <section className=" flex items-start">
        <UserAvatarWithPopOver
          ImageLink={sender.profilePic}
          username={sender.username}
          fallback={sender.fullName}
          className="mt-1"
        />

        <div className="ml-2 mt-1 w-full">
          <MessageHeader date={createdAt} name={sender?.fullName} />
          <p className="mt-2  text-sm text-Paragraph-primary">
            {" "}
            <span className="font-medium capitalize text-green-600">
              {sender.fullName}
            </span>{" "}
            wants to join the room ?
          </p>
          <div>
            <button
              className="mt-2 rounded-md bg-btn-success px-2 py-1 text-white"
              onClick={AcceptRequest}
            >
              Accept
            </button>
            <button
              className="ml-2 mt-2 rounded-md bg-btn-danger px-2 py-1 text-white"
              onClick={RejectRequest}
            >
              Reject
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomJoinRequestCard;
