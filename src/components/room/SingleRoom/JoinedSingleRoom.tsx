import React, { useEffect, useRef, useState } from "react";
import RoomShareButtonCard from "@/components/card/RoomShareButtonCard";
import RidesideBar from "@/components/room/rightsideBar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import OtherActivity from "@/components/OtherActivity/OtherActivity";
import MyActivity from "@/components/MyActivity/MyActivity";
import {
  AddMessage,
  AddNewMemeberToTheRoom,
  DeleteAnActivity,
  RemoveMemberFromRoom,
  UpdateAnActivity,
  UpdateRoom,
} from "@/redux/slice/roomSlice";
import { RoomChatTypes } from "@/types/room";
import { RoomUpdateResponseTypes } from "@/types/socketTypes";
import { useSearchParams } from "next/navigation";
import { ActivityType } from "@/types/roomActivity";

interface RoomContextTypes {
  setMedia: React.Dispatch<React.SetStateAction<ActivityType | null>>;
  setOtherMedia: React.Dispatch<React.SetStateAction<ActivityType | null>>;
  media: ActivityType | null;
  othermedia: ActivityType | null;
  isSharing: boolean;
  setIsSharing: React.Dispatch<React.SetStateAction<boolean>>;
  isMyActivityShowing: ActivityType | null;
  setIsMyActivityShowing: React.Dispatch<
    React.SetStateAction<ActivityType | null>
  >;
  OthersSelected: boolean;
  setOthersSelected: React.Dispatch<React.SetStateAction<boolean>>;

  showRightSideBar?: boolean;
  setShowRightSideBar?: React.Dispatch<React.SetStateAction<boolean>>;
  MessageCount?: number;
  setMessageCount?: React.Dispatch<React.SetStateAction<number>>;
  OtherSelectedChanged: boolean;
  setOtherSelectedChanged: React.Dispatch<React.SetStateAction<boolean>>;
  YoutubePlayer?: any;
  OtherYouTubePlayer: any;
  OtherExcalidraw: any;
}

let intialState: RoomContextTypes = {
  media: null,
  setMedia: () => {},
  othermedia: null,
  setOtherMedia: () => {},
  isSharing: false,
  setIsSharing: () => {},
  isMyActivityShowing: null,
  setIsMyActivityShowing: () => {},
  OthersSelected: false,
  setOthersSelected: () => {},
  showRightSideBar: true,
  setShowRightSideBar: () => {},
  MessageCount: 0,
  setMessageCount: () => {},
  OtherSelectedChanged: false,
  setOtherSelectedChanged: () => {},
  YoutubePlayer: null,
  OtherYouTubePlayer: null,
  OtherExcalidraw: null,
};

export const RoomContext = React.createContext<RoomContextTypes>(intialState);

const JoinedSingleRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const [MessageCount, setMessageCount] = React.useState<number>(0);

  const params = useSearchParams();
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [media, setMedia] = useState<ActivityType | null>(null);
  const [othermedia, setOtherMedia] = useState<ActivityType | null>(null);

  const [isMyActivityShowing, setIsMyActivityShowing] =
    React.useState<ActivityType | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [showRightSideBar, setShowRightSideBar] = React.useState<boolean>(true);
  const [OthersSelected, setOthersSelected] = useState<boolean>(false);
  const [OtherSelectedChanged, setOtherSelectedChanged] =
    React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const YoutubePlayer = useRef<any | null>(null);
  const OtherYouTubePlayer = useRef<any | null>(null);
  const OtherExcalidraw = useRef<any | null>(null);

  useEffect(() => {
    if (!socket) return;

    if (socket) {
      ListenCustomEvent("message", (data: RoomChatTypes) => {
        if (data.Type === "JoinLeaveNotification") {
          if (data.status === "joined") {
            dispatch(AddNewMemeberToTheRoom(data.user));
          }
          if (data.status === "left") {
            dispatch(RemoveMemberFromRoom(data.user));
          }
        }

        if (data.Type === "message") {
          if (params.get("tab") !== "chat") {
            setMessageCount((prev) => prev + 1);
          }
        }

        dispatch(AddMessage(data));
      });
      ListenCustomEvent("room-update", (data: RoomUpdateResponseTypes) => {
        console.log("room-update", data);

        if (data.type === "EditRoom") {
          dispatch(UpdateRoom(data.room));
        }
        if (data.type === "AnActivityUpdate") {
          dispatch(UpdateAnActivity(data.activity));
        }
        if (data.type === "ActivityDeleted") {
          dispatch(DeleteAnActivity(data));
        }
        if (data.type === "REMOVE_USER_FROM_ALL_ACTIVITY") {
          dispatch(UpdateAnActivity(data.activities));
        }
      });
    }
    return () => {
      socket.off("message");
      socket.off("room-update");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const activeTab = params.get("tab");
    if (activeTab === "chat") {
      setMessageCount(0);
    }
  }, [params]);

  return (
    <RoomContext.Provider
      value={{
        media,
        setMedia,
        isSharing,
        setIsSharing,
        isMyActivityShowing,
        setIsMyActivityShowing,
        OthersSelected,
        setOthersSelected,
        showRightSideBar,
        setShowRightSideBar,
        MessageCount,
        setMessageCount,
        OtherSelectedChanged,
        setOtherSelectedChanged,
        YoutubePlayer,
        othermedia,
        setOtherMedia,
        OtherYouTubePlayer,
        OtherExcalidraw,
      }}
    >
      <div className="flex min-h-screen justify-start   max-md:relative max-md:overflow-hidden">
        <div className="h-full w-full">
          <section className="h-[80vh]">
            <MyActivity />
            <OtherActivity />
          </section>
          <section className="flex h-[18vh] items-end justify-center gap-2 ">
            {JoinedRoom?.roomActivity.map((activity, index) => (
              <RoomShareButtonCard {...activity} key={index} />
            ))}
          </section>
        </div>
        <RidesideBar />
      </div>
    </RoomContext.Provider>
  );
};

export default JoinedSingleRoom;
