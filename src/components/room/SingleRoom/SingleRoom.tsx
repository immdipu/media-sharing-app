"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { JoinRoom } from "@/redux/slice/roomSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { IjoinedRoomResponse } from "@/types/socketTypes";
import JoinedSingleRoom from "./JoinedSingleRoom";

const SingleRoom = () => {
  const [verifying, setVerifying] = React.useState(true);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [isLoading, setIsLoading] = React.useState(false);
  const user = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleJoinRoom = () => {
    if (!socket) {
      toast({
        title: "Socket Error",
        description: "Socket is not connected",
        status: "error",
      });
      return;
    }

    if (!user.isUserAuthenticated) {
      toast({
        title: "User Error",
        description: "User is not logged in",
        status: "error",
      });
      return;
    }
    setIsLoading(true);
    EmitCustomEvent("join-room", {
      roomId: pathname.replace("/room/", ""),
      userId: user?.id,
    });

    ListenCustomEvent("joined-room-response", (data: IjoinedRoomResponse) => {
      if (data.success) {
        dispatch(JoinRoom(data.room));
        setVerifying(false);
        socket.off("joined-room-response");
      }
    });
    setIsLoading(false);
  };

  if (verifying)
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

  return <JoinedSingleRoom />;
};

export default SingleRoom;
