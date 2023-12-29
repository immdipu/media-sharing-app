/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useSocket } from "@/context/SocketProvider";
import clsx from "clsx";
import useUserRoomActivity from "@/hooks/useUserRoomActivity";
import { ActivityType, IGetActivityTypes } from "@/types/roomActivity";

const YoutubePlayer = () => {
  const { OthersSelected, media, YoutubePlayer, isMyActivityShowing } =
    useContext(RoomContext);
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

  useEffect(() => {
    if (!YoutubePlayer.current?.getVideoData()?.video_id) return;
    if (AmIWatchingOtherActivity && YoutubePlayer.current?.getVideoData()) {
      YoutubePlayer.current?.mute();
    } else if (AmIWatchingMyActivity && YoutubePlayer.current) {
      YoutubePlayer.current?.unMute();
    } else if (
      YoutubePlayer.current &&
      !!isMySharedActivity &&
      !AmIWatchingMyActivity
    ) {
      YoutubePlayer.current?.mute();
    } else {
      return;
    }
  }, [
    AmIWatchingOtherActivity,
    AmIWatchingMyActivity,
    YoutubePlayer,
    isMySharedActivity,
  ]);

  useEffect(() => {
    if (!socket) return;
    if (!!!isMySharedActivity) return;
    if (!YoutubePlayer.current) return;
    if (media === "Drawing") return;

    const listner = () => {
      const time = YoutubePlayer.current?.getCurrentTime();
      const VideoId = YoutubePlayer.current?.getVideoData().video_id;
      const state = YoutubePlayer.current?.getPlayerState();

      const ActivityDetails: IGetActivityTypes = {
        activityId: isMySharedActivity?.id,
        ActivityType: ActivityType.YouTube,
        data: {
          time: time,
          VideoId,
          state: state,
        },
      };

      EmitCustomEvent("Get_Activity_Details", ActivityDetails);
    };

    socket.on("GET_MEDIA_DETAILS", listner);
    return () => {
      socket?.off("GET_MEDIA_DETAILS", listner);
    };
  }, [YoutubePlayer, !!isMySharedActivity]);

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
    <section className="overflow-hidded relative h-full">
      <YouTube
        onStateChange={hanldeOnStateChange}
        className="h-full w-full"
        iframeClassName={clsx("h-full w-full")}
        opts={opts}
        onReady={onReady}
      />
    </section>
  );
};

export default YoutubePlayer;
