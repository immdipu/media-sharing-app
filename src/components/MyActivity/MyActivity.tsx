import React, { useContext } from "react";
import YouTubePlayer from "@/components/YoutubePlayer";
import Excalidraws from "@/components/Excalidraw";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import clsx from "clsx";

const MyActivity = () => {
  const { media } = useContext(RoomContext);
  const {
    AmIWatchingOtherActivity,
    AmIWatchingMyActivity,
    isMySharedActivity,
  } = useUserRoomActivity();
  return (
    <div
      className={clsx(
        "transition-all duration-200 ease-in-out",
        AmIWatchingOtherActivity ||
          (isMySharedActivity && !AmIWatchingMyActivity)
          ? "h-0"
          : "h-[80vh]",
      )}
    >
      {media === ActivityType.YouTube && <YouTubePlayer />}
      {media === ActivityType.Drawing && <Excalidraws />}
    </div>
  );
};

export default MyActivity;