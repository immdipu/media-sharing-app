/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import clsx from "clsx";
import { useUserRoomActivity, useSocket } from "@/hooks";

const YoutubePlayer = () => {
  const { media, YoutubePlayer } = useContext(RoomContext);
  const { socket, EmitCustomEvent } = useSocket();
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
    if (media === "DRAWING") return;

    const listner = () => {
      const time = YoutubePlayer.current?.getCurrentTime();
      const VideoId = YoutubePlayer.current?.getVideoData().video_id;
      const state = YoutubePlayer.current?.getPlayerState();

      const ActivityDetails: IGetActivityTypes = {
        activityId: isMySharedActivity?.id,
        ActivityType: "YOUTUBE",
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

  const PlayfromPlaylist = (currentVideoId: string) => {
    if (!YoutubePlayer.current) {
      return;
    }
    const Playlist = localStorage.getItem("YouTubequeue");
    if (!Playlist) return;
    const list = JSON.parse(Playlist);
    const VideoIsInQueue = list.find(
      (video: any) => video?.id === currentVideoId,
    );

    if (VideoIsInQueue) {
      const index = list.findIndex(
        (video: any) => video?.id === currentVideoId,
      );
      const nextVideo = list[index + 1];
      if (!nextVideo) {
        return;
      }
      YoutubePlayer.current.loadVideoById(nextVideo.id);
      localStorage.setItem("YouTubeVideoId", nextVideo.id);
      localStorage.setItem("YouTubeThumbnail", nextVideo.thumbnail.url);
    } else {
      YoutubePlayer.current.loadVideoById(list[0].id);
      localStorage.setItem("YouTubeVideoId", list[0].id);
      localStorage.setItem("YouTubeThumbnail", list[0].thumbnail.url);
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
        onEnd={(e) => {
          PlayfromPlaylist(e.target.getVideoData().video_id);
          if (!!isMySharedActivity && socket) {
            EmitCustomEvent("Activity-state-server", {
              activityId: isMySharedActivity?.id,
              data: {
                time: 0,
                VideoId: e?.target?.getVideoData()?.video_id,
                state: 1,
                thumbnail: localStorage.getItem("YouTubeThumbnail") || "",
              },
            });
          }
        }}
      />
    </section>
  );
};

export default YoutubePlayer;
