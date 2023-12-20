import React, { useContext } from "react";
import { FaYoutube } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

import YouTubeSearch from "@/components/YoutubePlayer/YouTubeSearch";
import { RoomContext } from "../../SingleRoom/JoinedSingleRoom";

const Media = () => {
  const { media, setMedia } = useContext(RoomContext);

  if (media === "YouTube") {
    return <YouTubeSearch />;
  }

  return (
    <div>
      <section className="mx-2 mt-5 flex items-center gap-5 rounded-md border border-third-color bg-fourth-background px-5 py-3">
        <button
          onClick={() => {
            setMedia("YouTube");
          }}
          className="flex flex-col items-center"
        >
          <FaYoutube className="overflow-hidden  text-4xl text-red-600" />
          <p className="text-xs  text-Header-primary">YouTube</p>
        </button>
        <button
          onClick={() => {
            setMedia("Drawing");
          }}
          className="mt-1 flex flex-col items-center"
        >
          <BsPencilSquare className="overflow-hidden  text-3xl text-neutral-200" />
          <p className="text-xs  text-Header-primary">Drawing</p>
        </button>
      </section>
    </div>
  );
};

export default Media;
