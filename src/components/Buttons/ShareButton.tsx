import React from "react";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import clsx from "clsx";

const ShareButton = () => {
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { YouTubeVideoId, isSharing, setIsSharing } =
    React.useContext(RoomContext);

  const handleSharing = () => {
    if (isSharing) {
      setIsSharing(false);
      let activity = JoinedRoom?.roomActivity.find(
        (item) => item.admin._id === user?.id,
      );

      EmitCustomEvent("room-update", {
        type: "REMOVE_ACTIVITY",
        roomId: JoinedRoom?.id,
        userId: user?.id,
        activityId: activity?.id,
        adminId: activity?.admin._id,
      });
    } else {
      setIsSharing(true);
      EmitCustomEvent("add-activity", {
        type: "YouTube",
        room: JoinedRoom?.id,
        admin: user?.id,
        data: {
          videoId: YouTubeVideoId,
          thumbnail: localStorage.getItem("YouTubeThumbnail"),
          status: "playing",
        },
      });
    }
  };

  return (
    <button
      onClick={handleSharing}
      disabled={!YouTubeVideoId}
      className={clsx(
        "mx-2 rounded-md  bg-button-background p-2 transition-transform  duration-100 ease-linear hover:opacity-80 active:scale-95 disabled:bg-neutral-500 disabled:opacity-30",
        isSharing && "bg-green-500 text-neutral-50",
      )}
    >
      {isSharing ? "Sharing" : "Share"}
    </button>
  );
};

export default ShareButton;
