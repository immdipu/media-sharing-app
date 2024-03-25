"use client";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { useSocket, useAppSelector } from "@/hooks";
import { JoinRoom } from "@/redux/slice/roomSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import JoinedSingleRoom from "./JoinedSingleRoom";
import KickedOut from "@/components/ui/KickedOut";
import RoomJoinButton from "@/components/Buttons/RoomJoinButton";

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

  useEffect(() => {
    if (!socket) {
      return;
    }

    dispatch(StopRoomJoiningLoader());

    const handleJoinRoomResponse = (data: IjoinedRoomResponse) => {
      if (data.type === "accepted" && data.success) {
        dispatch(JoinRoom(data.room));
        setVerifying(false);
        dispatch(StopRoomJoiningLoader());
        socket.off("joined-room-response");
        return;
      }
      if (data.type === "statusChecking") {
        if (
          data.success &&
          pathname.replace("/room/", "") === (data.room as unknown as string)
        ) {
          EmitCustomEvent("join-room", {
            roomId: pathname.replace("/room/", ""),
            userId: user?.id,
          });
        } else {
          dispatch(StopRoomJoiningLoader());
          setVerifying(false);
          toast({
            title: "Request rejected",
            description:
              "Your request to join the room was rejected by the admin",
            variant: "destructive",
          });
        }
      }
    };

    ListenCustomEvent("joined-room-response", handleJoinRoomResponse);

    return () => {
      socket.off("joined-room-response");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, EmitCustomEvent, pathname]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  if (JoinedRoom && user?.id && JoinedRoom?.bannedUsers?.includes(user.id)) {
    return <KickedOut />;
  }

  if (
    verifying ||
    !JoinedRoom?.members?.find((member) => member?._id === user?.id)
  )
    return (
      <div className="fixed z-20 grid h-full  w-full place-content-center items-center justify-center bg-Secondary-background">
        <section className=" flex flex-col justify-center gap-4">
          <RoomJoinButton
            onclick={handleJoinRoom}
            disabled={isLoading || !socket || !user.isUserAuthenticated}
            isLoading={isLoading}
          />
          <p className="font-poppins  text-paragraph-secondary">
            {isLoading ? "Joining room..." : "Click to join the room "}
          </p>
        </section>
      </div>
    );

  return <JoinedSingleRoom />;
};

export default SingleRoom;
