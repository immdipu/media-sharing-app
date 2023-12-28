import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YouTubeVideo } from "@/types/Youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";

const YouTubeVideoCard: React.FC<YouTubeVideo> = ({
  title,
  thumbnail,
  duration_formatted,
  uploadedAt,
  channel,
  views,
  id,
}) => {
  const ViewsFormat = (views: number) => {
    if (views > 1000000000) {
      return `${(views / 1000000000).toFixed(1)}B views`;
    } else if (views > 1000000) {
      return `${(views / 1000000).toFixed(0)}M views`;
    } else if (views > 1000) {
      return `${(views / 1000).toFixed(0)}K views`;
    } else {
      return `${views} views`;
    }
  };
  const {
    setYouTubeVideoId,
    setIsPlayingMyVideo,
    isSharing,
    OthersSelected,
    setOthersSelected,
    YoutubePlayer,
  } = useContext(RoomContext);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { AmIWatchingActivity, isMySharedActivity } = useUserRoomActivity();

  const handlePlayVideo = () => {
    if (!YoutubePlayer.current) {
      setYouTubeVideoId(id);
    } else {
      YoutubePlayer.current?.loadVideoById(id);
    }
    localStorage.setItem("YouTubeVideoId", id);
    localStorage.setItem("YouTubeThumbnail", thumbnail?.url);
    setOthersSelected(false);
    setIsPlayingMyVideo(true);
    if (!isSharing && !!AmIWatchingActivity) {
      EmitCustomEvent("room-update", {
        type: "REMOVE_USER_FROM_ALL_ACTIVITY",
        roomId: JoinedRoom?.id,
        userId: user.id,
        activityId: AmIWatchingActivity?.id,
        activityKey: AmIWatchingActivity?.admin._id,
      });
    }
    if (isSharing) {
      EmitCustomEvent("Activity-state-server", {
        activityId: isMySharedActivity?.id,
        data: {
          time: 0,
          VideoId: id,
          state: 1,
        },
      });
    }
  };

  return (
    <div
      onClick={() => handlePlayVideo()}
      className="mb-4 flex  h-24 w-full px-2 transition-colors duration-300 ease-linear hover:bg-third-background"
    >
      <Avatar className="h-full w-40 cursor-pointer rounded-md bg-neutral-700 shadow-md ">
        <AvatarImage
          src={thumbnail?.url}
          className="object-contain"
          alt="@shadcn"
        />
        <p className="absolute bottom-0 right-0 rounded-sm bg-neutral-900 px-1 py-px text-xs text-neutral-100">
          {duration_formatted}
        </p>
        <AvatarFallback className="h-full w-full rounded-md ">
          <div className="h-full w-full bg-neutral-500" />
        </AvatarFallback>
      </Avatar>
      <div className="w-[calc(100%-170px)]  pl-2">
        <h3 className=" line-clamp-2 overflow-ellipsis break-words text-[13px] text-Header-primary">
          {title}
        </h3>
        <div className="ml-1 mt-2 flex items-center  text-xs text-Paragraph-primary">
          <Avatar className="h-5 w-5">
            <AvatarImage src={channel?.icon} alt="@shadcn" />
            <AvatarFallback>{channel?.name}</AvatarFallback>
          </Avatar>
          <p className=" ml-2 line-clamp-1 overflow-hidden">{channel?.name}</p>
        </div>
        <div className="ml-1 mt-2 flex items-center">
          <p className="whitespace-nowrap text-[11px] text-paragraph-secondary ">
            {ViewsFormat(views)}
          </p>
          <span className="mx-2  block h-1 w-1 rounded-full bg-neutral-400"></span>
          <p className="overflow-ellipsis whitespace-nowrap text-[11px] text-paragraph-secondary ">
            {uploadedAt}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideoCard;
