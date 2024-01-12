import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import MediaClose from "./MediaClose";
import YouTubeSearch from "@/components/YoutubePlayer/YouTubeSearch";
import { RoomContext } from "../../SingleRoom/JoinedSingleRoom";
import { ActivityType } from "@/types/roomActivity";

const Media = () => {
  const { media, setMedia } = useContext(RoomContext);

  if (media === "YouTube") {
    return <YouTubeSearch />;
  }

  return (
    <div className="relative h-full pt-3">
      <MediaClose />

      <p className="py-2 pl-3 text-lg font-medium text-Header-primary">
        Select a media
      </p>
      <section className="mx-1   flex gap-4   px-2 py-3">
        <button
          onClick={() => {
            setMedia(ActivityType.YouTube);
          }}
          className="flex h-full w-full flex-col items-center  rounded-md border border-third-color bg-third-background py-3 transition-all duration-200 ease-linear hover:border-secondary-color hover:bg-Secondary-background"
        >
          <FaYoutube className="overflow-hidden   text-4xl text-red-600" />
          <p className="text-sm  font-medium text-Header-secondary">YouTube</p>
        </button>
        <button
          onClick={() => {
            setMedia(ActivityType.Drawing);
          }}
          className="flex h-full w-full flex-col items-center rounded-md border border-third-color bg-third-background py-3 transition-all duration-200 ease-linear hover:border-secondary-color hover:bg-Secondary-background"
        >
          <BsPencilSquare className="overflow-hidden  text-3xl text-neutral-200" />
          <p className="textsm font-medium  text-Header-secondary">Drawing</p>
        </button>
      </section>
    </div>
  );
};

export default Media;
