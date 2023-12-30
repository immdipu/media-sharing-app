import React, { useContext, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";

const OtherUserPlayer = () => {
  const { AmIWatchingOtherActivity } = useUserRoomActivity();
  const { OtherYouTubePlayer, othermedia } = useContext(RoomContext);

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    OtherYouTubePlayer.current = event.target;
  };

  useEffect(() => {
    if (!OtherYouTubePlayer.current) return;
    if (othermedia !== ActivityType.YouTube || !AmIWatchingOtherActivity) {
      if (OtherYouTubePlayer.current?.playerInfo?.videoData?.video_id) {
        OtherYouTubePlayer.current?.pauseVideo();
        OtherYouTubePlayer.current?.mute();
      }
    }
  }, [othermedia, OtherYouTubePlayer, AmIWatchingOtherActivity]);

  return (
    <section
      className={clsx(
        "h-full overflow-hidden  px-2 pt-4 ",
        othermedia === ActivityType.YouTube ? "block" : "hidden",
      )}
    >
      <div className={clsx(" h-full w-full")}>
        <YouTube
          className="h-full w-full"
          iframeClassName={clsx("h-full w-full")}
          opts={opts}
          onReady={onReady}
        />
      </div>
    </section>
  );
};

export default OtherUserPlayer;
