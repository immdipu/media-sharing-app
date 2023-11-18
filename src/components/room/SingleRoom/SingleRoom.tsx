import React from "react";
import { MdCallEnd } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";

const SingleRoom = () => {
  return (
    <div className="h-full w-full">
      <section className="h-4/5 ">
        <section className="h-5/6 overflow-hidden  px-2 pt-4">
          <iframe
            width="100%"
            height="100%"
            className="rounded-xl drop-shadow-lg"
            src="https://www.youtube.com/embed/UUga4-z7b6s?si=2IfNsPUIbPxMfyyT"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </section>
      </section>
      <section className="h-1/5 ">
        <div className="flex h-full items-center justify-center gap-3 ">
          <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
            <MdCallEnd className="text-3xl text-red-600" />
          </button>
          <button className="rounded-full bg-Secondary-background p-2 transition-transform duration-100 ease-linear hover:bg-secondary-hover active:scale-95">
            <MdOutlineScreenShare className="text-3xl text-neutral-300" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleRoom;
