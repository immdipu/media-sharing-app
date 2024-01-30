/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import React from "react";
import moment from "moment";
import UserAvatarWithPopOver from "@/components/Resuable/UserAvatarWithPopOver";

const ReceiverText = ({
  lastMessageFromSameSender,
  message,
  date,
  senderPicture,
  senderId,
  username,
}: {
  lastMessageFromSameSender: boolean;
  senderId: string;
  message: string;
  date: string;
  senderPicture: string;
  username: string;
}) => {
  const isOnline = false;
  return (
    <div
      className={clsx(
        "relative flex justify-start",
        lastMessageFromSameSender ? "mt-1" : "mt-5 ",
      )}
    >
      {!lastMessageFromSameSender && (
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className="absolute -left-2 top-0"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 8 13"
          xmlSpace="preserve"
        >
          <path
            opacity="0.13"
            fill="#434343"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="#434343"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      )}

      {!lastMessageFromSameSender && (
        <div className="absolute -left-8 top-1 h-6 w-6 rounded-full">
          <UserAvatarWithPopOver
            ImageLink={senderPicture}
            className="h-6 w-6"
            username={username}
            fallback={username}
          />
          <div
            className={clsx(
              " absolute -right-0 bottom-0 h-2 w-2 rounded-full border border-neutral-400",
              isOnline ? "bg-green-500" : "bg-neutral-600",
            )}
          />
        </div>
      )}
      <div
        className={clsx(
          "relative max-w-xs rounded-lg bg-[#434343] py-2",
          lastMessageFromSameSender ? "rounded-md" : "rounded-tl-none",
        )}
      >
        <p className="break-words pl-2  text-sm font-light text-white">
          {message}{" "}
          <span className="">
            <span className="px-3">
              {" "}
              <span className="text-xs opacity-0">
                {" "}
                {moment(date).format("hh:mm a")}{" "}
              </span>{" "}
            </span>
          </span>
        </p>
        <div className=" absolute bottom-1 right-1 flex  w-full justify-end ">
          <span className="text-[0.65rem] font-extralight text-neutral-400 ">
            {moment(date).format("hh:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReceiverText;
