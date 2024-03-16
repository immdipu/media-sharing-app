import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import MessageHeader from "../Message/organism/MessageHeader";
import { useSocket, useAppSelector, useAppDispatch } from "@/hooks";
import { UpdateJoinRequest } from "@/redux/slice/roomSlice";
const RoomJoinRequestCard: React.FC<RoomJoinRequest> = ({
  Type,
  _id,
  content,
  createdAt,
  reactions,
  sender,
  deleted,
  status,
}) => {
  const { EmitCustomEvent } = useSocket();
  const room = useAppSelector((state) => state.room.JoinedRoom);
  const dispatch = useAppDispatch();

  const AcceptRequest = () => {
    EmitCustomEvent("room-update", {
      type: "RoomJoinRequestResponse",
      roomId: room?.id,
      userId: sender._id,
      response: "accept",
    });
    dispatch(UpdateJoinRequest({ _id: _id, status: "accepted" }));
  };

  const RejectRequest = () => {
    EmitCustomEvent("room-update", {
      type: "RoomJoinRequestResponse",
      roomId: room?.id,
      userId: sender._id,
      response: "reject",
    });
    dispatch(UpdateJoinRequest({ _id: _id, status: "rejected" }));
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
            {status === "accepted" && (
              <p className="mt-2 text-sm text-Paragraph-primary text-green-600">
                Join Request Accepted
              </p>
            )}
            {status === "rejected" && (
              <p className="mt-2 text-sm text-Paragraph-primary text-red-600">
                Join Request Rejected
              </p>
            )}
            {status === "pending" && (
              <>
                <span className="font-medium capitalize text-green-600">
                  {sender.fullName}
                </span>{" "}
                wants to join the room ?
              </>
            )}
          </p>
          {status === "pending" && (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default RoomJoinRequestCard;
