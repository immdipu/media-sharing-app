"use client";
import React from "react";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import RidesideBar from "@/components/room/rightsideBar";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { JoinRoom } from "@/redux/slice/roomSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { IjoinedRoomResponse } from "@/types/socketTypes";

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

  return (
    <div className="flex min-h-screen justify-start">
      <div className=" w-full ">
        <section className="h-4/5 ">
          <section className="h-5/6 overflow-hidden  px-2 pt-4">
            <iframe
              width="100%"
              height="100%"
              className="rounded-xl drop-shadow-lg"
              src="https://www.youtube.com/embed/UUga4-z7b6s?si=2IfNsPUIbPxMfyyT"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </section>
        </section>
        <section className="h-1/5 ">
          <div className="flex h-full items-center justify-center gap-3 ">
            <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
              <MdCallEnd className="text-3xl text-red-600" />
            </button>
            <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
              <MdOutlineScreenShare className="text-3xl text-neutral-300" />
            </button>
          </div>
        </section>
      </div>
      <RidesideBar />
    </div>
  );
};

export default SingleRoom;
