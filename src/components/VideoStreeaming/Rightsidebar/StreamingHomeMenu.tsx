import React, { useEffect } from "react";
import BackButton from "@/components/Buttons/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/Buttons/ShareButton";
import { RoomContext } from "@/components/room/SingleRoom/JoinedSingleRoom";
import { useAppDispatch } from "@/hooks";
import { AddStreamingLink } from "@/redux/slice/roomSlice";

const StreamingHomeMenu = () => {
  const { VideoStreamer, setMedia } = React.useContext(RoomContext);
  const [StreamingLink, setStreamingLink] = React.useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const link = localStorage.getItem("streamingLink");
    if (link) {
      setStreamingLink(link);
      dispatch(AddStreamingLink(link));
    }
  }, []);

  return (
    <div>
      <section className="mx-1 flex flex-col p-2">
        <div className="flex items-center gap-4">
          <BackButton
            onClick={() => {
              setMedia(null);
            }}
          />
          <h3 className="text-lg font-medium text-Header-secondary">
            Streaming
          </h3>
        </div>
      </section>
      <section className="mx-auto mt-11 w-4/5 ">
        <section>
          <h3 className="text-lg font-normal text-Header-secondary">
            Add Video Link
          </h3>
          <Input
            value={StreamingLink}
            onChange={(e) => setStreamingLink(e.target.value)}
            placeholder="Paste the link here..."
            className="mt-2 w-full bg-secondary-hover placeholder:text-paragraph-secondary"
            type="text"
          />
        </section>
        <section className="mt-6 flex flex-col gap-3 ">
          <Button
            disabled={StreamingLink.trim() === ""}
            className="bg-btn-primary  text-btn-primary"
            onClick={() => {
              if (VideoStreamer.current) {
                localStorage.setItem("streamingLink", StreamingLink);
                dispatch(AddStreamingLink(StreamingLink));
              }
            }}
          >
            Play Video
          </Button>
          <ShareButton
            isSharing={false}
            className="ml-0 w-full"
            disabled={true}
            onClick={() => {
              console.log("share button clicked");
            }}
          />
        </section>
        <section className="mt-5 ">
          <p className="font-poppin3 mt-1 text-center text-xs text-neutral-400">
            Paste the link of the video you want to stream in the room (YouTube,
            facebook, Vimeo, etc.)
          </p>

          <p className="mt-6 text-xs font-light  leading-relaxed text-red-400/90 ">
            <span className="font-poppin3 text-center text-xs text-neutral-100">
              Note:
            </span>{" "}
            Sharing feature is disabled for now and will be available soon.
          </p>
        </section>
      </section>
    </div>
  );
};

export default StreamingHomeMenu;
