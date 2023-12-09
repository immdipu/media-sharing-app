import React, { useState, useRef, useEffect, use } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomShareButtonCard from "../card/RoomShareButtonCard";
import clsx from "clsx";
import OtherUserPlayer from "./OtherUserPlayer";

const YoutubePlayer = () => {
  const {
    YouTubeVideoId,
    setYouTubeVideoId,
    isPlayingMyVideo,
    OthersSelectedUserVideo,
  } = useContext(RoomContext);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const { socket, EmitCustomEvent, ListenCustomEvent } = useSocket();
  const [player, setPlayer] = useState<any>(null);
  const [lastEmittedTime, setLastEmittedTime] = useState<number>(0);

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
  };

  const userJoinedActivity = JoinedRoom?.roomActivity.find(
    (activity) => activity.users?.find((u) => u._id == user?.id),
  );

  const isMySharedVideo = JoinedRoom?.roomActivity.find(
    (activity) => activity.admin._id === user?.id,
  );

  const AmIwatchingMyVideo = isMySharedVideo?.users?.find(
    (u) => u._id === user?.id,
  );

  const AmWatchingthirdPartyVideo = !!JoinedRoom?.roomActivity.find(
    (activity) => {
      return activity.users?.find(
        (u) => u._id === user?.id && activity.admin._id !== user?.id,
      );
    },
  );

  useEffect(() => {
    if (AmWatchingthirdPartyVideo) {
      player?.mute();
    } else {
      player?.unMute();
    }
  }, [AmWatchingthirdPartyVideo]);

  useEffect(() => {
    if (!socket) return;
    if (!!!isMySharedVideo) return;
    if (!player) return;

    const listner = () => {
      const time = player?.getCurrentTime();
      const VideoId = player?.getVideoData().video_id;
      const state = player?.getPlayerState();
      EmitCustomEvent("Get_Activity_Details", {
        activityId: isMySharedVideo?.id,
        data: {
          time: time,
          VideoId,
          state: state,
        },
      });
    };

    socket.on("GET_MEDIA_DETAILS", listner);
    return () => {
      socket?.off("GET_MEDIA_DETAILS", listner);
    };
  }, [player, !!isMySharedVideo]);

  useEffect(() => {
    if (!!isMySharedVideo && socket && player) {
      const Interval = setInterval(() => {
        const time = player?.getCurrentTime();
        const VideoId = player?.getVideoData().video_id;
        const state = player?.getPlayerState();
        if (time !== lastEmittedTime) {
          EmitCustomEvent("player-state-server", {
            activityId: isMySharedVideo.id,
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
  }, [!!isMySharedVideo, socket, player, lastEmittedTime]);

  const hanldeOnStateChange: YouTubeProps["onStateChange"] = (e) => {
    if (!!isMySharedVideo && socket) {
      const time = player?.getCurrentTime();
      const VideoId = player?.getVideoData().video_id;

      if (e.data === 1 || e.data === 2) {
        EmitCustomEvent("player-state-server", {
          activityId: isMySharedVideo.id,
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
    <div className=" w-full ">
      <section className="h-4/5 ">
        <section className="relative h-5/6 overflow-hidden px-2 pt-4 ">
          <div
            className={clsx(
              " h-full w-full",
              !!!isMySharedVideo && "block",
              !!isMySharedVideo && AmIwatchingMyVideo && "opacity-100",
              !!isMySharedVideo && !AmIwatchingMyVideo && "opacity-0",
              !YouTubeVideoId && "pointer-events-none opacity-0",
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
              OthersSelectedUserVideo && AmWatchingthirdPartyVideo
                ? "z-10"
                : "-z-10 opacity-0",
            )}
          >
            <OtherUserPlayer />
          </div>
        </section>
      </section>

      <section className="h-1/5 ">
        <div className="flex h-full items-center justify-center gap-3 ">
          {/* <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
            <MdCallEnd className="text-3xl text-red-600" />
          </button>
         */}
          <section className="flex items-end gap-2">
            {JoinedRoom?.roomActivity.map((activity, index) => (
              <RoomShareButtonCard {...activity} key={index} />
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default YoutubePlayer;
