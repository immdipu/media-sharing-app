import React, { useContext, useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useAppSelector } from "@/hooks";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaCog,
  FaSearch,
} from "react-icons/fa";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { MdSubtitles, MdPictureInPicture } from "react-icons/md";

interface RoomContextType {
  media: any;
  VideoStreamer: React.RefObject<ReactPlayer>;
}

const VideoStreamer: React.FC = () => {
  const { VideoStreamer } = useContext(RoomContext) as RoomContextType;
  const { StreamingLink } = useAppSelector((state) => state.room);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.5);
  const [muted, setMuted] = useState<boolean>(false);
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showSubtitleSearch, setShowSubtitleSearch] = useState<boolean>(false);
  const [subtitleQuery, setSubtitleQuery] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        togglePlay();
      } else if (e.key === "f") {
        toggleFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const togglePlay = () => setPlaying(!playing);
  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setCurrentTime(state.playedSeconds);
    }
  };
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlayed(parseFloat(e.target.value));
  const handleSeekMouseDown = () => setSeeking(true);
  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    VideoStreamer.current?.seekTo(
      parseFloat((e.target as HTMLInputElement).value),
    );
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(parseFloat(e.target.value));
  const toggleMute = () => setMuted(!muted);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };
  const handlePlaybackRateChange = (rate: number) => setPlaybackRate(rate);
  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (VideoStreamer.current) {
        const videoElement =
          VideoStreamer.current.getInternalPlayer() as HTMLVideoElement;
        await videoElement.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP error:", error);
    }
  };
  const handleSubtitleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setSubtitle(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const searchSubtitles = async () => {
    // This is a placeholder function. You'll need to implement the actual API call to OpenSubtitles or another service
    console.log("Searching for subtitles:", subtitleQuery);
    // Implement the API call and subtitle download logic here
  };

  const handleDuration = (duration: number) => {
    console.log("Duration:", duration);
    setDuration(duration);
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  return (
    <div className="relative h-full w-full" ref={playerContainerRef}>
      <div style={{ paddingTop: "56.25%" }} className="relative">
        <ReactPlayer
          ref={VideoStreamer}
          url={StreamingLink || ""}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          style={{ position: "absolute", top: 0, left: 0 }}
          muted={muted}
          playbackRate={playbackRate}
          onStart={() => {
            setPlaying(true);
          }}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPlay={() => {
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
          }}

          // config={{
          //   file: {
          //     attributes: {
          //       crossOrigin: "anonymous",
          //     },
          //     tracks: subtitle
          //       ? [
          //           {
          //             kind: "subtitles",
          //             src: URL.createObjectURL(
          //               new Blob([subtitle], { type: "text/vtt" }),
          //             ),
          //             srcLang: "en",
          //             default: true,
          //           },
          //         ]
          //       : [],
          //   },
          // }}
        />
        {!isLoading && (
          <div className="absolute bottom-0 left-0 right-0  bg-black bg-opacity-50 p-2 text-white">
            <div className="flex items-center justify-between">
              <button onClick={togglePlay}>
                {playing ? <FaPause /> : <FaPlay />}
              </button>
              <div className="mx-4 flex flex-grow items-center">
                <div>
                  <span>{formatTime(currentTime)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  className="mx-2 w-[calc(100%-100px)]"
                />
                <div>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={toggleMute}>
                  {muted ? <BiVolumeMute /> : <BiVolumeFull />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="mx-2 w-16"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={togglePictureInPicture}>
                  <MdPictureInPicture />
                </button>
                <div className="group relative">
                  <button>
                    <FaCog />
                  </button>
                  <div className="absolute bottom-full right-0 hidden rounded bg-black bg-opacity-75 p-2 group-hover:block">
                    <div>Playback Speed</div>
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`block w-full text-left ${
                          playbackRate === rate ? "font-bold" : ""
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
                <label className="cursor-pointer">
                  <MdSubtitles />
                  <input
                    type="file"
                    accept=".vtt,.srt"
                    onChange={handleSubtitleUpload}
                    className="hidden"
                  />
                </label>
                <button onClick={toggleFullscreen}>
                  {fullscreen ? <FaCompress /> : <FaExpand />}
                </button>
              </div>
            </div>
            {showSettings && (
              <div className="mt-2 rounded-md bg-gray-800 p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span>Playback Speed</span>
                  <div className="space-x-2">
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`rounded px-2 py-1 ${
                          playbackRate === rate ? "bg-blue-500" : "bg-gray-600"
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Subtitles</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => setShowSubtitleSearch(!showSubtitleSearch)}
                      className="rounded bg-gray-600 px-2 py-1"
                    >
                      <FaSearch /> Search
                    </button>
                    <label className="cursor-pointer rounded bg-gray-600 px-2 py-1">
                      <MdSubtitles /> Upload
                      <input
                        type="file"
                        accept=".vtt,.srt"
                        onChange={handleSubtitleUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
            {showSubtitleSearch && (
              <div className="mt-2 rounded-md bg-gray-800 p-2">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={subtitleQuery}
                    onChange={(e) => setSubtitleQuery(e.target.value)}
                    placeholder="Search subtitles..."
                    className="flex-grow rounded bg-gray-700 px-2 py-1"
                  />
                  <button
                    onClick={searchSubtitles}
                    className="rounded bg-blue-500 px-3 py-1"
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoStreamer;
