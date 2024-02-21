import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import MediaClose from "./MediaClose";
import YouTubeSearch from "@/components/YoutubePlayer/YouTubeSearch";
import JoinedSingleRoom, {
  RoomContext,
} from "../../SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";
import MediaButton from "./Media.Button";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import { ActivityTypes } from "@/types/room";

const Media = () => {
  const { media, setMedia, setOthersSelected } = useContext(RoomContext);
  const { AmIWatchingActivity } = useUserRoomActivity();
  const { RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);

  if (media === "YouTube") {
    return <YouTubeSearch />;
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
            setMedia(ActivityType.YouTube);
          }}
          title="YouTube"
        />

        <MediaButton
          icon={BsPencilSquare}
          title="Drawing"
          onClick={() => {
            setMedia(ActivityType.Drawing);
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
      </section>
    </div>
  );
};

export default Media;
