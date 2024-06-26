import React, { useContext } from "react";
import YouTubePlayer from "@/components/YoutubePlayer";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import clsx from "clsx";
import dynamic from "next/dynamic";
import VideoStreamer from "../VideoStreeaming";
const Excalidraws = dynamic(() => import("@/components/Excalidraw"), {
  ssr: false,
});

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
        "overflow-hidden transition-all duration-200 ease-in-out",
        AmIWatchingOtherActivity ||
          (isMySharedActivity && !AmIWatchingMyActivity)
          ? "h-0 "
          : "h-[80vh]",
      )}
    >
      {media === "YOUTUBE" && <YouTubePlayer />}
      {media === "DRAWING" && <Excalidraws />}
      {media === "STREAMING" && <VideoStreamer />}
    </div>
  );
};

export default MyActivity;
