/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, use } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomShareButtonCard from "../card/RoomShareButtonCard";
import clsx from "clsx";
import OtherUserPlayer from "./OtherUserPlayer";
import { ActivityType, IGetActivityTypes } from "@/types/roomActivity";
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
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [lastEmittedTime, setLastEmittedTime] = useState<number>(0);
  const player = useRef<any | null>(null);
  const {
    AmIWatchingMyActivity,
    isMySharedActivity,
    AmIWatchingOtherActivity,
    userJoinedActivity,
  } = useUserRoomActivity();

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
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
    if (!!isMySharedActivity && socket && player) {
      const Interval = setInterval(() => {
        const time = player.current?.getCurrentTime();
        const VideoId = player.current?.getVideoData().video_id;
        const state = player.current?.getPlayerState();
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
  }, [!!isMySharedActivity, socket, player, lastEmittedTime]);

  // const hanldeOnStateChange: YouTubeProps["onStateChange"] = (e) => {
  //   if (!!isMySharedVideo && socket) {
  //     const time = player?.getCurrentTime();
  //     const VideoId = player?.getVideoData().video_id;

  //     if (e.data === 1 || e.data === 2) {
  //       EmitCustomEvent("Activity-state-server", {
  //         activityId: isMySharedVideo.id,
  //         data: {
  //           time: time,
  //           VideoId,
  //           state: e.data,
  //         },
  //       });
  //     }
  //   }
  // };

  return (
    <section className="relative h-full overflow-hidden px-2 pt-4 ">
      <button
        onClick={() => {
          if (!player.current) return;
          player.current?.playVideo();
        }}
      >
        next music
      </button>
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
          // onStateChange={hanldeOnStateChange}
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
