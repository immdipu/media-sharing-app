import React, { useEffect, useState } from "react";
import RoomShareButtonCard from "@/components/card/RoomShareButtonCard";
import RidesideBar from "@/components/room/rightsideBar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import YoutubePlayer from "@/components/YoutubePlayer";
import RightSideBarToggleButton from "@/components/Buttons/RightSideBarToggleButton";
import {
  AddMessage,
  AddNewMemeberToTheRoom,
  DeleteAnActivity,
  RemoveMemberFromRoom,
  UpdateAllActivity,
  UpdateAnActivity,
  UpdateRoom,
} from "@/redux/slice/roomSlice";
import { RoomChatTypes } from "@/types/room";
import { RoomUpdateResponseTypes } from "@/types/socketTypes";
import { YouTubeVideo } from "@/types/Youtube";
import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import Excalidraw from "@/components/Excalidraw";

interface RoomContextTypes {
  YouTubeVideoId: string | null;
  setYouTubeVideoId: React.Dispatch<React.SetStateAction<string | null>>;
  setMedia: React.Dispatch<React.SetStateAction<"YouTube" | "Drawing" | null>>;
  setSearchResult: React.Dispatch<React.SetStateAction<YouTubeVideo[]>>;
  searchResult: YouTubeVideo[];
  media: "YouTube" | "Drawing" | null;
  isSharing: boolean;
  setIsSharing: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayingMyVideo: boolean;
  setIsPlayingMyVideo: React.Dispatch<React.SetStateAction<boolean>>;
  OthersSelectedUserVideo: boolean;
  setOthersSelectedUserVideo: React.Dispatch<React.SetStateAction<boolean>>;
  thirdPartyVideoId: string;
  setThirdPartyVideoId: React.Dispatch<React.SetStateAction<string>>;
  thirdPartyVideoState: string;
  setThirdPartyVideoState: React.Dispatch<React.SetStateAction<string>>;
  thirdPartyVideoTime: number;
  setThirdPartyVideoTime: React.Dispatch<React.SetStateAction<number>>;
  thirdPartyPlayer?: any;
  setThirdPartyPlayer?: React.Dispatch<React.SetStateAction<any>>;
  showRightSideBar?: boolean;
  setShowRightSideBar?: React.Dispatch<React.SetStateAction<boolean>>;
  MessageCount?: number;
  setMessageCount?: React.Dispatch<React.SetStateAction<number>>;
}

let intialState: RoomContextTypes = {
  YouTubeVideoId: null,
  setYouTubeVideoId: () => {},
  media: null,
  setMedia: () => {},
  setSearchResult: () => {},
  searchResult: [],
  isSharing: false,
  setIsSharing: () => {},
  isPlayingMyVideo: true,
  setIsPlayingMyVideo: () => {},
  OthersSelectedUserVideo: false,
  setOthersSelectedUserVideo: () => {},
  thirdPartyVideoId: "",
  setThirdPartyVideoId: () => {},
  thirdPartyVideoState: "playing",
  setThirdPartyVideoState: () => {},
  thirdPartyVideoTime: 0,
  setThirdPartyVideoTime: () => {},
  thirdPartyPlayer: null,
  setThirdPartyPlayer: () => {},
  showRightSideBar: true,
  setShowRightSideBar: () => {},
  MessageCount: 0,
  setMessageCount: () => {},
};

export const RoomContext = React.createContext<RoomContextTypes>(intialState);

const JoinedSingleRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const [MessageCount, setMessageCount] = React.useState<number>(0);
  const [userIsFocused, setUserIsFocused] = React.useState<boolean>(true);
  const params = useSearchParams();
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [searchResult, setSearchResult] = React.useState<YouTubeVideo[]>([]);
  const [media, setMedia] = useState<"YouTube" | "Drawing" | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [showRightSideBar, setShowRightSideBar] = React.useState<boolean>(true);
  const [OthersSelectedUserVideo, setOthersSelectedUserVideo] =
    useState<boolean>(false);
  const [YouTubeVideoId, setYouTubeVideoId] = React.useState<string | null>(
    null,
  );
  const [isPlayingMyVideo, setIsPlayingMyVideo] = React.useState(false);
  const [thirdPartyVideoId, setThirdPartyVideoId] = React.useState<string>("");
  const [thirdPartyVideoState, setThirdPartyVideoState] =
    React.useState<string>("playing");
  const [thirdPartyVideoTime, setThirdPartyVideoTime] =
    React.useState<number>(0);
  const [thirdPartyPlayer, setThirdPartyPlayer] = React.useState<any>(null);

  const dispatch = useAppDispatch();

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
        YouTubeVideoId,
        setYouTubeVideoId,
        media,
        setMedia,
        searchResult,
        setSearchResult,
        isSharing,
        setIsSharing,
        isPlayingMyVideo,
        setIsPlayingMyVideo,
        OthersSelectedUserVideo,
        setOthersSelectedUserVideo,
        thirdPartyVideoId,
        setThirdPartyVideoId,
        thirdPartyVideoState,
        setThirdPartyVideoState,
        thirdPartyVideoTime,
        setThirdPartyVideoTime,
        thirdPartyPlayer,
        setThirdPartyPlayer,
        showRightSideBar,
        setShowRightSideBar,
        MessageCount,
        setMessageCount,
      }}
    >
      <div className="flex min-h-screen justify-start   max-md:relative max-md:overflow-hidden">
        <div className="h-full w-full">
          <section className="h-[80vh]">
            {media === "YouTube" && <YoutubePlayer />}
            {media === "Drawing" && <Excalidraw />}
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
