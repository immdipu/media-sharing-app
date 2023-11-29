import React, { useEffect, useState } from "react";

import RidesideBar from "@/components/room/rightsideBar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import YoutubePlayer from "@/components/YoutubePlayer";
import {
  AddMessage,
  AddNewMemeberToTheRoom,
  RemoveMemberFromRoom,
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
};

export const RoomContext = React.createContext<RoomContextTypes>(intialState);

const JoinedSingleRoom = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [searchResult, setSearchResult] = React.useState<YouTubeVideo[]>([]);
  const [media, setMedia] = useState<"YouTube" | null>(null);
  const [isSharing, setIsSharing] = React.useState(false);
  const [YouTubeVideoId, setYouTubeVideoId] = React.useState<string | null>(
    null,
  );

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
        if (data.type === "EditRoom") {
          dispatch(UpdateRoom(data.room));
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
