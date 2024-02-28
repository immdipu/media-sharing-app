"use client";
import React, { useState } from "react";
import { ReactionTypes, RoomMessageTypes } from "@/types/room";
import SingleMessageWrapper from "./organism/SingleMessageWrapper";

const SingleMessage: React.FC<RoomMessageTypes> = ({
  Type,
  content,
  createdAt,
  sender,
  _id,
  reactions,
}) => {
  return (
    <SingleMessageWrapper
      content={content}
      createdAt={createdAt}
      reactions={reactions}
      sender={sender}
      Type={Type}
      _id={_id}
      replyTo={null}
    >
      <div className="relative mt-[2px] ">
        <p className="mr-3 block w-full break-words pb-2  font-roboto text-sm font-normal leading-5  text-paragraph-secondary ">
          {content}
        </p>
      </div>
    </SingleMessageWrapper>
  );
};

export default SingleMessage;
