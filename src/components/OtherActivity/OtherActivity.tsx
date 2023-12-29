import React from "react";
import OtherUserPlayer from "@/components/YoutubePlayer/OtherUserPlayer";
import OtherUserExcalidraw from "@/components/Excalidraw/OtherUserExcalidraw";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import clsx from "clsx";

const OtherActivity = () => {
  const { othermedia } = useContext(RoomContext);
  const { AmIWatchingOtherActivity } = useUserRoomActivity();
  return (
    <div className={clsx(AmIWatchingOtherActivity ? "h-[80vh]" : "h-0 ")}>
      {othermedia === ActivityType.YouTube && <OtherUserPlayer />}
      {othermedia === ActivityType.Drawing && <OtherUserExcalidraw />}
    </div>
  );
};

export default OtherActivity;
