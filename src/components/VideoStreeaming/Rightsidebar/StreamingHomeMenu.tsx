import React from "react";
import BackButton from "@/components/Buttons/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/Buttons/ShareButton";

const StreamingHomeMenu = () => {
  return (
    <div>
      <section className="mx-1 flex items-center gap-4  p-2">
        <BackButton
          onClick={() => {
            console.log("back button clicked");
          }}
        />
        <h3 className="text-lg font-medium text-Header-secondary">Streaming</h3>
      </section>
      <section className="mx-auto mt-11 w-4/5 ">
        <section>
          <h3 className="text-lg font-normal text-Header-secondary">
            Add Video Link
          </h3>
          <Input
            placeholder="Paste the link here..."
            className="mt-2 w-full bg-secondary-hover placeholder:text-paragraph-secondary"
            type="text"
          />
        </section>
        <section className="mt-6 flex flex-col gap-3 ">
          <Button className="bg-button-background  text-button-primary">
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
      </section>
    </div>
  );
};

export default StreamingHomeMenu;
