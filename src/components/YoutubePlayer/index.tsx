import React from "react";
import YouTube from "react-youtube";

const YoutubePlayer = () => {
  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    console.log("currentTime", currentTime);
  };

  return (
    <div>
      <YouTube
        videoId={"A1covnoxblM"}
        onStateChange={(e) => checkElapsedTime(e)}
      />
    </div>
  );
};

export default YoutubePlayer;
