import React, { useEffect } from "react";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import RidesideBar from "@/components/room/rightsideBar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import { AddMessage } from "@/redux/slice/roomSlice";

const JoinedSingleRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!socket) return;

    if (socket) {
      ListenCustomEvent("message", (data) => {
        console.log(data);
        dispatch(AddMessage(data));
      });
    }
    return () => {
      socket.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
    </>
  );
};

export default JoinedSingleRoom;
