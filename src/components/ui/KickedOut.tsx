/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const KickedOut = () => {
  return (
    <div className="z-20 grid min-h-screen w-full  place-content-center items-center justify-center bg-Secondary-background">
      <section className=" flex flex-col items-center justify-center gap-1">
        <img
          src="/KickedOut.png"
          alt="Kickout image"
          className="block max-w-lg "
        />

        <div className="-translate-y-9">
          <p className=" text-xl font-medium text-red-500">
            You have been kicked out of the room!
          </p>
          <p className="text-center text-xs text-paragraph-secondary ">
            You can join another room or create your own room.
          </p>
          <Link
            href={"/"}
            className="bg-btn-primary text-btn-primary mt-4 block rounded-md  px-4 py-2 text-center font-medium hover:opacity-80"
          >
            Go to home page
          </Link>
        </div>
      </section>
    </div>
  );
};

export default KickedOut;
