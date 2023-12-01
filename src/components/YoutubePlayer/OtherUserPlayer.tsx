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
      // autoplay: 1,
      start: thirdPartyVideoTime,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    if (setThirdPartyPlayer === undefined) return;
    setThirdPartyPlayer(event.target);
    if (thirdPartyVideoState === "playing") {
      event.target.playVideo();
    }
  };

  useEffect(() => {
    if (!thirdPartyPlayer || thirdPartyVideoId || thirdPartyPlayer === null)
      return;
    if (thirdPartyVideoState === "playing") {
      thirdPartyPlayer?.playVideo();
    }
    if (thirdPartyVideoState === "paused") {
      thirdPartyPlayer?.pauseVideo();
    }
  }, [thirdPartyVideoState, thirdPartyPlayer, thirdPartyVideoId]);

  if (!thirdPartyVideoId)
    return (
      <div>
        <h1 className="text-2xl text-white">
          Waiting for the host to share a video
        </h1>
      </div>
    );

  return (
    <section className="h-full overflow-hidden  px-2 pt-4 ">
      <div className={clsx(" h-[90%] w-full")}>
        <YouTube
          videoId={thirdPartyVideoId}
          className="h-full w-full"
          iframeClassName={clsx("h-full w-full")}
          opts={opts}
          onReady={onReady}
        />
      </div>
      <div className="h-36  w-full">
        <button
          onClick={() => {
            thirdPartyPlayer?.playVideo();
            console.log(thirdPartyPlayer);
          }}
          className="rounded-lg bg-white px-4 py-2 text-black"
        >
          Play/Pause
        </button>
      </div>
    </section>
  );
};

export default OtherUserPlayer;
