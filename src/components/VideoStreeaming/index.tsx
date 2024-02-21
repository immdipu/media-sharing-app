import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { RoomContext } from "../room/SingleRoom/JoinedSingleRoom";
import { useAppSelector } from "@/hooks";

const VideoStreamer = () => {
  const { media, VideoStreamer } = useContext(RoomContext);
  const { StreamingLink } = useAppSelector((state) => state.room);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  return (
    <div className="h-full w-full ">
      <ReactPlayer
        ref={VideoStreamer}
        controls
        url={StreamingLink || ""}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default VideoStreamer;
