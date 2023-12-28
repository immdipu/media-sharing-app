/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useSocket } from "@/context/SocketProvider";
import clsx from "clsx";
import OtherUserPlayer from "./OtherUserPlayer";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";

const YoutubePlayer = () => {
  const {
    YouTubeVideoId,
    setYouTubeVideoId,
    isPlayingMyVideo,
    OthersSelected,
    media,
    YoutubePlayer,
  } = useContext(RoomContext);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [lastEmittedTime, setLastEmittedTime] = useState<number>(0);
  const {
    AmIWatchingMyActivity,
    isMySharedActivity,
    AmIWatchingOtherActivity,
  } = useUserRoomActivity();

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    YoutubePlayer.current = event.target;
  };

  // useEffect(() => {
  //   if (!player?.getVideoData()?.video_id) return;
  //   if (AmWatchingthirdPartyVideo && player) {
  //     player?.mute();
  //   } else if (AmIwatchingMyVideo && player) {
  //     player?.unMute();
  //   } else if (player && !!isMySharedVideo && !AmIwatchingMyVideo) {
  //     player?.mute();
  //   } else {
  //     return;
  //   }
  // }, [AmWatchingthirdPartyVideo, AmIwatchingMyVideo, player, isMySharedVideo]);

  // useEffect(() => {
  //   if (!socket) return;
  //   if (!!!isMySharedVideo) return;
  //   if (!player) return;
  //   if (media === "Drawing") return;

  //   const listner = () => {
  //     const time = player?.getCurrentTime();
  //     const VideoId = player?.getVideoData().video_id;
  //     const state = player?.getPlayerState();

  //     const ActivityDetails: IGetActivityTypes = {
  //       activityId: isMySharedVideo?.id,
  //       ActivityType: ActivityType.YouTube,
  //       data: {
  //         time: time,
  //         VideoId,
  //         state: state,
  //       },
  //     };

  //     EmitCustomEvent("Get_Activity_Details", ActivityDetails);
  //   };

  //   socket.on("GET_MEDIA_DETAILS", listner);
  //   return () => {
  //     socket?.off("GET_MEDIA_DETAILS", listner);
  //   };
  // }, [player, !!isMySharedVideo]);

  useEffect(() => {
    if (!!isMySharedActivity && socket && YoutubePlayer.current) {
      const Interval = setInterval(() => {
        const time = YoutubePlayer.current?.getCurrentTime();
        const VideoId = YoutubePlayer.current?.getVideoData().video_id;
        const state = YoutubePlayer.current?.getPlayerState();
        if (time !== lastEmittedTime) {
          EmitCustomEvent("Activity-state-server", {
            activityId: isMySharedActivity.id,
            data: {
              time: time,
              VideoId,
              state: state,
            },
          });
          setLastEmittedTime(time);
        }
      }, 10000);
      return () => {
        clearInterval(Interval);
      };
    }
  }, [!!isMySharedActivity, socket, YoutubePlayer, lastEmittedTime]);

  const hanldeOnStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (!!isMySharedActivity && socket) {
      const time = YoutubePlayer.current?.getCurrentTime();
      const VideoId = YoutubePlayer.current?.getVideoData().video_id;
      if (e.data === 1 || e.data === 2) {
        EmitCustomEvent("Activity-state-server", {
          activityId: isMySharedActivity.id,
          data: {
            time: time,
            VideoId,
            state: e.data,
          },
        });
      }
    }
  };

  return (
    <section className="relative h-full overflow-hidden px-2 pt-4 ">
      <div
        className={clsx(
          " h-full w-full",
          !!!isMySharedActivity && "block",
          !!isMySharedActivity &&
            AmIWatchingMyActivity &&
            "pointer-events-auto opacity-100",
          !!isMySharedActivity &&
            !AmIWatchingMyActivity &&
            "pointer-events-none opacity-0",
          // !YouTubeVideoId && "pointer-events-none opacity-0",
        )}
      >
        <YouTube
          videoId={YouTubeVideoId!}
          onStateChange={hanldeOnStateChange}
          className="h-full w-full"
          iframeClassName={clsx("h-full w-full")}
          opts={opts}
          onReady={onReady}
        />
      </div>

      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 top-0   h-full w-full",
          OthersSelected && AmIWatchingOtherActivity
            ? "z-10"
            : "-z-10 opacity-0",
        )}
      >
        <OtherUserPlayer />
      </div>
    </section>
  );
};

export default YoutubePlayer;
