import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { ActivityType } from "@/types/roomActivity";
import { RoomContext } from "../../SingleRoom/JoinedSingleRoom";
import clsx from "clsx";

const MediaClose = () => {
  const { media, setMedia } = useContext(RoomContext);

  return (
    <div
      className={clsx(
        "absolute inset-0 z-20 grid h-full w-full place-content-center bg-transparent backdrop-blur-sm",
        media !== ActivityType.Drawing && "hidden",
      )}
    >
      <Button
        onClick={() => {
          setMedia(null);
        }}
        className="bg-button-background text-button-primary"
      >
        <h1>Close Drawing</h1>
      </Button>
    </div>
  );
};

export default MediaClose;
