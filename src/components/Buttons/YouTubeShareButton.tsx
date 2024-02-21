import React from "react";
import { useSocket, useAppSelector } from "@/hooks";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useToast } from "../ui/use-toast";
import { IAddActivity, ActivityType, ActivityTypes } from "@/types";
import BackButton from "./BackButton";
import ShareButton from "./ShareButton";

const YouTubeShareButton = ({
  backButton = false,
}: {
  backButton?: boolean;
}) => {
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

      let Remove: ActivityTypes = {
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
      <BackButton
        onClick={() => {
          setMedia(null);
          handleSharing();
        }}
      />
    );
  }

  return (
    <ShareButton
      isSharing={isSharing}
      disabled={!YoutubePlayer.current}
      onClick={handleSharing}
    />
  );
};

export default YouTubeShareButton;
