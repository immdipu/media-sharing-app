import React, { useContext, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";

const OtherUserPlayer = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const {
    OthersSelectedUserVideo,
    YouTubeVideoId,
    thirdPartyVideoId,
    thirdPartyVideoTime,
    thirdPartyVideoState,
    thirdPartyPlayer,
    setThirdPartyPlayer,
  } = useContext(RoomContext);

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    if (setThirdPartyPlayer === undefined) return;
    setThirdPartyPlayer(event.target);
  };

  useEffect(() => {
    if (!OthersSelectedUserVideo) {
      thirdPartyPlayer?.pauseVideo();
    }
  }, [OthersSelectedUserVideo, thirdPartyPlayer]);

  return (
    <section className="h-full overflow-hidden  px-2 pt-4 ">
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
