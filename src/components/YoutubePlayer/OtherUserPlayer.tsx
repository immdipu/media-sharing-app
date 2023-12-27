import React, { useContext, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";

const OtherUserPlayer = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { OthersSelected, ExternalShared, setExternalShared } =
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
    if (!ExternalShared) return;
    const JoinedActivity = !!JoinedRoom?.roomActivity.find(
      (activity) => activity?.users?.find((u) => u._id == user?.id),
    );

    if (!JoinedActivity && ExternalShared?.getPlayerState() === 1) {
      ExternalShared?.pauseVideo();
      return;
    }
  }, [JoinedRoom?.roomActivity]);

  useEffect(() => {
    if (
      !OthersSelected &&
      ExternalShared &&
      ExternalShared?.getPlayerState() === 1
    ) {
      ExternalShared?.pauseVideo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OthersSelected]);

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
