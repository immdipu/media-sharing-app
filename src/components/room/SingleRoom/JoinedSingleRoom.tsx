import React, { useEffect, useState } from "react";

import RidesideBar from "@/components/room/rightsideBar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import YoutubePlayer from "@/components/YoutubePlayer";
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

interface RoomContextTypes {
  YouTubeVideoId: string | null;
  setYouTubeVideoId: React.Dispatch<React.SetStateAction<string | null>>;
  setMedia: React.Dispatch<React.SetStateAction<"YouTube" | null>>;
  setSearchResult: React.Dispatch<React.SetStateAction<YouTubeVideo[]>>;
  searchResult: YouTubeVideo[];
  media: "YouTube" | null;
  isSharing: boolean;
  setIsSharing: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayingMyVideo: boolean;
  setIsPlayingMyVideo: React.Dispatch<React.SetStateAction<boolean>>;
  OthersSelectedUserVideo: boolean;
  setOthersSelectedUserVideo: React.Dispatch<React.SetStateAction<boolean>>;
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
};

export const RoomContext = React.createContext<RoomContextTypes>(intialState);

const JoinedSingleRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [searchResult, setSearchResult] = React.useState<YouTubeVideo[]>([]);
  const [media, setMedia] = useState<"YouTube" | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [OthersSelectedUserVideo, setOthersSelectedUserVideo] =
    useState<boolean>(false);
  const [YouTubeVideoId, setYouTubeVideoId] = React.useState<string | null>(
    null,
  );
  const [isPlayingMyVideo, setIsPlayingMyVideo] = React.useState(false);

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

        dispatch(AddMessage(data));
      });
      ListenCustomEvent("room-update", (data: RoomUpdateResponseTypes) => {
        console.log("room-update", data);
        if (data.type === "EditRoom") {
          dispatch(UpdateRoom(data.room));
        }
        if (data.type === "AnActivityUpdate") {
          console.log("AnActivityUpdate", data.activity);
          dispatch(UpdateAnActivity(data.activity));
        }
        if (data.type === "ActivityDeleted") {
          dispatch(DeleteAnActivity(data));
        }
        if (data.type === "REMOVE_USER_FROM_ALL_ACTIVITY") {
          console.log("REMOVE_USER_FROM_ALL_ACTIVITY", data);
          dispatch(UpdateAllActivity(data.activities));
        }
      });
    }
    return () => {
      socket.off("message");
      socket.off("room-update");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      }}
    >
      <div className="flex min-h-screen justify-start">
        <YoutubePlayer />

        <RidesideBar />
      </div>
    </RoomContext.Provider>
  );
};

export default JoinedSingleRoom;
