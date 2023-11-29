import React, { useContext } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";

const OtherUserPlayer = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { OthersSelectedUserVideo, YouTubeVideoId } = useContext(RoomContext);
  const [player, setPlayer] = React.useState<any>(null);
  const [VideoId, setVideoId] = React.useState<string | null>(null);

  const checkElapsedTime = (e: any) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    console.log("currentTime", currentTime);
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: 0,
    },
  };

  const onReady = (event: any) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
  };

  const userJoinedActivity = JoinedRoom?.roomActivity.find(
    (activity) => activity.users?.find((u) => u._id == user?.id),
  );

  console.log("userJoinedActivity", userJoinedActivity);

  React.useEffect(() => {
    console.log("userJoinedActivity", userJoinedActivity);
    if (userJoinedActivity?.data?.videoId) {
      setVideoId(userJoinedActivity?.data?.videoId);
    }
  }, [userJoinedActivity?.data?.videoId]);

  if (!VideoId) return null;

  return (
    <section className="h-full overflow-hidden  px-2 pt-4 ">
      <div className={clsx(" h-full w-full")}>
        <YouTube
          videoId={VideoId}
          onStateChange={(e) => checkElapsedTime(e)}
          className="h-full w-full"
          iframeClassName={clsx("h-full w-full")}
          opts={opts}
          loading="eager"
          onReady={onReady}
        />
      </div>
    </section>
  );
};

export default OtherUserPlayer;
