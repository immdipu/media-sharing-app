import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { CgData } from "react-icons/cg";
import dynamic from "next/dynamic";
import { RoomContext } from "../../SingleRoom/JoinedSingleRoom";
import MediaButton from "./Media.Button";
import { useSocket, useUserRoomActivity, useAppSelector } from "@/hooks";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";

const YouTubeSearch = dynamic(
  () => import("@/components/YoutubePlayer/YouTubeSearch"),
);
const MediaClose = dynamic(() => import("./MediaClose"));
const StreamingHomeMenu = dynamic(
  () => import("@/components/VideoStreeaming/Rightsidebar/StreamingHomeMenu"),
);

const Media = () => {
  const { media, setMedia } = useContext(RoomContext);
  const { AmIWatchingActivity } = useUserRoomActivity();
  const { RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);

  if (media === "YOUTUBE") {
    return <YouTubeSearch />;
  }
  if (media === "STREAMING") {
    return <StreamingHomeMenu />;
  }

  return (
    <div className="relative h-full pt-3">
      <MediaClose />
      <p className="py-2 pl-3 text-lg font-medium text-Header-primary">
        Select a media
      </p>
      <section className="mx-1   flex gap-4   px-2 py-3">
        <MediaButton
          icon={FaYoutube}
          onClick={() => {
            setMedia("YOUTUBE");
          }}
          title="YouTube"
          className="text-red-500"
        />

        <MediaButton
          icon={BsPencilSquare}
          title="Drawing"
          className="text-neutral-300"
          onClick={() => {
            setMedia("DRAWING");
            if (!!AmIWatchingActivity) {
              let data: ActivityTypes = {
                type: "REMOVE_MEMBER_FROM_ACTIVITY",
                roomId: JoinedRoom?.id!,
                userId: user.id!,
                activityId: AmIWatchingActivity.id,
                adminId: AmIWatchingActivity.admin._id,
              };
              RoomUpdate(data);
            }
          }}
        />

        <MediaButton
          icon={CgData}
          title=" Streaming"
          className="text-neutral-300"
          onClick={() => {
            setMedia("DRAWING");
          }}
        />
      </section>
    </div>
  );
};

export default Media;
