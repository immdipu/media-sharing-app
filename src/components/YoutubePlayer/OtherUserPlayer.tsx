import React, { useContext, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";

const OtherUserPlayer = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { OthersSelected, ExternalShared, setExternalShared, othermedia } =
    useContext(RoomContext);

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    if (setExternalShared === undefined) return;
    setExternalShared(event.target);
  };

  useEffect(() => {
    if (ExternalShared === null) return;
    if (othermedia !== ActivityType.YouTube) {
      if (ExternalShared?.playerInfo?.videoData?.video_id) {
        ExternalShared?.pauseVideo();
        ExternalShared?.mute();
      }
    }
  }, [othermedia, ExternalShared]);

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
