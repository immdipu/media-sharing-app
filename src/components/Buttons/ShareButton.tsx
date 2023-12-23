import React from "react";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import clsx from "clsx";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiArrowBack } from "react-icons/bi";

const ShareButton = ({ backButton = false }: { backButton?: boolean }) => {
  const { socket, EmitCustomEvent, AddActivity, RemoveActivity } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { YouTubeVideoId, isSharing, setIsSharing, setMedia } =
    React.useContext(RoomContext);

  const handleSharing = () => {
    if (isSharing) {
      setIsSharing(false);
      let activity = JoinedRoom?.roomActivity.find(
        (item) => item.admin._id === user?.id,
      );

      let Remove;

      EmitCustomEvent("room-update", {
        type: "REMOVE_ACTIVITY",
        roomId: JoinedRoom?.id,
        userId: user?.id,
        activityId: activity?.id,
        adminId: activity?.admin._id,
      });
    } else {
      if (backButton) return;
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

  if (backButton) {
    return (
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          {" "}
          <Button
            onClick={() => {
              setMedia(null);
              handleSharing();
            }}
            className=" group mr-1 -translate-x-1 bg-transparent p-0"
          >
            <BiArrowBack className="text-xl opacity-70 group-hover:opacity-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Go Back</p>
        </TooltipContent>
      </Tooltip>
    );
  }

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
