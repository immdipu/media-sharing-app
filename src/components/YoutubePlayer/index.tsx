import React, { useState, useRef, useEffect } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useContext } from "react";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { useSocket } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomShareButtonCard from "../card/RoomShareButtonCard";

const YoutubePlayer = () => {
  const { YouTubeVideoId, setYouTubeVideoId } = useContext(RoomContext);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const user = useAppSelector((state) => state.auth);
  const [player, setPlayer] = useState<any>(null);
  const [playerState, setPlayerState] = useState<any>(null);

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

  useEffect(() => {
    if (player) {
      const time = player.getCurrentTime();
      console.log("time", time);
    }
  }, [YouTubeVideoId, player]);

  return (
    <div className=" w-full ">
      <section className="h-4/5 ">
        <section className="h-5/6 overflow-hidden  px-2 pt-4">
          <div className="h-full w-full">
            <YouTube
              videoId={YouTubeVideoId ?? "48H3BqFRPEs"}
              onStateChange={(e) => checkElapsedTime(e)}
              className="h-full w-full"
              iframeClassName="h-full w-full "
              opts={opts}
              loading="eager"
              onReady={onReady}
            />
          </div>
        </section>
      </section>
      <section className="h-1/5 ">
        <div className="flex h-full items-center justify-center gap-3 ">
          {/* <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
            <MdCallEnd className="text-3xl text-red-600" />
          </button>
         */}
          <section>
            <RoomShareButtonCard />
          </section>
        </div>
      </section>
    </div>
  );
};

export default YoutubePlayer;
