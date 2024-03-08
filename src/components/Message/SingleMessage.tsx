"use client";
import React from "react";
import SingleMessageWrapper from "./organism/SingleMessageWrapper";
import clsx from "clsx";

interface SingleMessageProps extends RoomMessageTypes {
  highlightedMessageId: string | null;
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  Type,
  content,
  createdAt,
  sender,
  _id,
  reactions,
  highlightedMessageId,
  deleted,
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
      highlightedMessageId={highlightedMessageId}
    >
      <div className="relative mt-[2px] ">
        <p
          className={clsx(
            "mr-3 block w-full break-words pb-2  font-roboto text-sm font-normal leading-5  text-paragraph-secondary",
            deleted &&
              "cursor-not-allowed select-none text-red-200 opacity-60 ",
          )}
        >
          {content}
        </p>
      </div>
    </SingleMessageWrapper>
  );
};

export default SingleMessage;
