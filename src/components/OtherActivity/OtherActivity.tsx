import React, { useContext } from "react";
import OtherUserPlayer from "@/components/YoutubePlayer/OtherUserPlayer";
import OtherUserExcalidraw from "@/components/Excalidraw/OtherUserExcalidraw";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import clsx from "clsx";
const OtherActivity = () => {
  const { AmIWatchingOtherActivity } = useUserRoomActivity();

  return (
    <div className={clsx(AmIWatchingOtherActivity ? "h-[80vh]" : "h-0 ")}>
      <OtherUserPlayer />
      {/* <OtherUserExcalidraw /> */}
    </div>
  );
};

export default OtherActivity;
