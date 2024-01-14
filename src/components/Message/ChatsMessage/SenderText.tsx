"use client";
import React from "react";
import clsx from "clsx";
import moment from "moment";

const SenderText = ({
  lastMessageFromSameSender,
  message,
  date,
}: {
  lastMessageFromSameSender: boolean;
  message: string;
  date: string;
}) => {
  return (
    <div
      className={clsx(
        "relative flex justify-end",
        lastMessageFromSameSender ? "mt-1" : "mt-5",
      )}
    >
      {!lastMessageFromSameSender && (
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          className="absolute -right-2 top-0"
          version="1.1"
          x="0px"
          y="0px"
          enable-background="new 0 0 8 13"
          xmlSpace="preserve"
        >
          <path
            opacity="0.13"
            d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
          ></path>
          <path
            fill="#2563eb"
            d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
          ></path>
        </svg>
      )}
      <div
        className={clsx(
          "max-w-xs rounded-lg bg-blue-600 py-2",
          lastMessageFromSameSender ? "rounded-md" : "rounded-tr-none",
        )}
      >
        <p className="break-words pl-2  text-sm font-light text-white">
          {message}{" "}
          <span className="">
            <span className="px-3">
              {" "}
              <span className="text-xs opacity-0">
                {" "}
                {moment(date).format("hh:mm a")}
              </span>{" "}
            </span>
          </span>
        </p>
        <div className=" absolute bottom-1 right-1 flex  w-full justify-end ">
          <span className="text-[0.65rem] font-extralight text-neutral-200 ">
            {moment(date).format("hh:mm a")}{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SenderText;
