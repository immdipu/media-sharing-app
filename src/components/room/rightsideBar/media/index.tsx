import React from "react";
import { FaYoutube } from "react-icons/fa";
import YouTubeSearch from "@/components/YoutubePlayer/YouTubeSearch";

const Media = () => {
  const [media, setMedia] = React.useState("");

  if (media === "youtube") {
    return <YouTubeSearch />;
  }

  return (
    <div>
      <section className="border-third-color bg-fourth-background mx-2 mt-5 rounded-md border px-5 py-3">
        <button
          onClick={() => {
            setMedia("youtube");
          }}
          className="flex flex-col items-center"
        >
          <FaYoutube className="overflow-hidden  text-4xl text-red-600" />
          <p className="text-xs  text-Header-primary">YouTube</p>
        </button>
      </section>
    </div>
  );
};

export default Media;
