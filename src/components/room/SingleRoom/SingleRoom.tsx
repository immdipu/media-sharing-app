"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { JoinRoom } from "@/redux/slice/roomSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { IjoinedRoomResponse } from "@/types/socketTypes";
import JoinedSingleRoom from "./JoinedSingleRoom";
import { RotatingLines } from "react-loader-spinner";
import KickedOut from "@/components/ui/KickedOut";
import {
  StartRoomJoiningLoader,
  StopRoomJoiningLoader,
} from "@/redux/slice/roomSlice";

const SingleRoom = () => {
  const [verifying, setVerifying] = React.useState(true);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const user = useAppSelector((state) => state.auth);
  const isLoading = useAppSelector((state) => state.room.RoomJoiningLoader);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const pathname = usePathname();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    dispatch(StartRoomJoiningLoader());
    if (!socket) {
      toast({
        title: "Socket Error",
        description: "Socket is not connected",
        variant: "destructive",
      });
      return;
    }

    if (!user.isUserAuthenticated) {
      toast({
        title: "User Error",
        description: "User is not logged in",
        variant: "destructive",
      });
      return;
    }

    EmitCustomEvent("join-room", {
      roomId: pathname.replace("/room/", ""),
      userId: user?.id,
    });

    ListenCustomEvent("joined-room-response", (data: IjoinedRoomResponse) => {
      if (data.success) {
        dispatch(JoinRoom(data.room));
        console.log("Joined Room", data.room);
        setVerifying(false);
        dispatch(StopRoomJoiningLoader());
        socket.off("joined-room-response");
      }
    });
  };

  if (
    verifying ||
    !JoinedRoom?.members.find((member) => member._id === user.id)
  )
    return (
      <div className="fixed z-20 grid h-full  w-full place-content-center items-center justify-center bg-Secondary-background">
        <section className=" flex flex-col justify-center gap-4">
          <Button
            disabled={isLoading}
            onClick={handleJoinRoom}
            className=" bg-button-background px-4 text-button-primary"
          >
            {isLoading ? "Joining..." : "Join Room"}
          </Button>
          <p className="font-light text-paragraph-secondary">
            Click the button to join the room.
          </p>
        </section>
      </div>
    );

  if (JoinedRoom && user?.id && JoinedRoom.bannedUsers.includes(user.id)) {
    return <KickedOut />;
  }

  return <JoinedSingleRoom />;
};

export default SingleRoom;
