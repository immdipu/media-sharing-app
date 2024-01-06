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
import { useToast } from "../ui/use-toast";
import { BiArrowBack } from "react-icons/bi";
import { IAddActivity, IRemoveActivity } from "@/types/socketTypes";
import { ActivityType } from "@/types/roomActivity";

const ShareButton = ({ backButton = false }: { backButton?: boolean }) => {
  const { AddActivity, RoomUpdate } = useSocket();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const { isSharing, setIsSharing, setMedia, YoutubePlayer } =
    React.useContext(RoomContext);

  const handleSharing = () => {
    const YouTubeVideoId = YoutubePlayer.current?.getVideoData().video_id;
    if (!YouTubeVideoId && !backButton)
      return toast({
        title: "Please select a video first",
        variant: "destructive",
      });

    if (isSharing) {
      setIsSharing(false);
      let activity = JoinedRoom?.roomActivity.find(
        (item) => item.admin._id === user?.id,
      );

      if (!activity || !JoinedRoom || !user) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      let Remove: IRemoveActivity = {
        type: "REMOVE_ACTIVITY",
        activityId: activity.id,
        roomId: JoinedRoom.id,
        userId: user.id!,
        adminId: activity.admin._id,
      };
      RoomUpdate(Remove);
    } else {
      if (backButton) return;
      setIsSharing(true);
      if (!JoinedRoom || !user || !YouTubeVideoId) {
        toast({
          title: "Something went wrong",
          variant: "destructive",
        });
        return;
      }

      let NewActivity: IAddActivity = {
        type: ActivityType.YouTube,
        room: JoinedRoom?.id,
        admin: user?.id!,
        data: {
          videoId: YouTubeVideoId,
          thumbnail: localStorage.getItem("YouTubeThumbnail"),
          status: "playing",
        },
      };
      AddActivity(NewActivity);
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
      disabled={!YoutubePlayer.current}
      className={clsx(
        "ml-2  h-10 rounded-md p-2 text-sm text-neutral-100 transition-all  duration-300   ease-linear hover:opacity-80 active:scale-95 disabled:bg-neutral-500 disabled:opacity-30",
        isSharing ? "bg-red-500 text-neutral-50" : "bg-green-600",
      )}
    >
      {isSharing ? "Sharing" : "Share"}
    </button>
  );
};

export default ShareButton;
