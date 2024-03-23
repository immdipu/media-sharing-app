import React from "react";
import OtherUserPlayer from "@/components/YoutubePlayer/OtherUserPlayer";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import clsx from "clsx";
import dynamic from "next/dynamic";
const OtherUserExcalidraw = dynamic(
  () => import("@/components/Excalidraw/OtherUserExcalidraw"),
  {
    ssr: false,
  },
);

const OtherActivity = () => {
  const { AmIWatchingOtherActivity } = useUserRoomActivity();

  return (
    <div className={clsx(AmIWatchingOtherActivity ? "h-[80vh]" : "h-0 ")}>
      <OtherUserPlayer />
      <OtherUserExcalidraw />
    </div>
  );
};

export default OtherActivity;
