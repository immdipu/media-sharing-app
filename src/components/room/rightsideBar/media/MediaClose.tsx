import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ActivityType } from "@/types/roomActivity";
import { RoomContext } from "../../SingleRoom/JoinedSingleRoom";
import { useSocket } from "@/context/SocketProvider";
import clsx from "clsx";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import { useAppSelector } from "@/hooks/reduxHooks";

const MediaClose = () => {
  const { media, setMedia } = useContext(RoomContext);
  const { RoomUpdate } = useSocket();
  const { isMySharedActivity } = useUserRoomActivity();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);

  return (
    <div
      className={clsx(
        "absolute inset-0 z-20 grid h-full w-full place-content-center bg-transparent backdrop-blur-sm",
        media !== ActivityType.Drawing && "hidden",
      )}
    >
      <Button
        onClick={() => {
          setMedia(null);
          if (!!isMySharedActivity) {
            RoomUpdate({
              type: "REMOVE_ACTIVITY",
              roomId: JoinedRoom?.id || "",
              userId: isMySharedActivity.admin._id,
              activityId: isMySharedActivity.id,
              adminId: isMySharedActivity.admin._id,
            });
          }
        }}
        className="bg-btn-primary text-btn-primary"
      >
        <h1>Close Drawing</h1>
      </Button>
    </div>
  );
};

export default MediaClose;
