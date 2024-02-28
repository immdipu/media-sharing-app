import { MessageReplyTypes } from "@/types/room";
import React from "react";
import SingleMessageWrapper from "../organism/SingleMessageWrapper";

interface ReplyMessageProps extends MessageReplyTypes {
  scrollToMessage: (messageId: string) => void;
  highlightedMessageId: string | null;
}

const ReplyMessage: React.FC<ReplyMessageProps> = ({
  Type,
  _id,
  content,
  createdAt,
  reactions,
  replyTo,
  sender,
  scrollToMessage,
  highlightedMessageId,
}) => {
  if (replyTo === null || typeof replyTo === "string") return null;

  return (
    <SingleMessageWrapper
      content={content}
      createdAt={createdAt}
      reactions={reactions}
      sender={sender}
      Type={Type}
      _id={_id}
      replyTo={replyTo}
      highlightedMessageId={highlightedMessageId}
    >
      <div
        className="relative mt-[2px] cursor-pointer"
        onClick={() => scrollToMessage(replyTo._id)}
      >
        <div className=" my-1 flex h-full min-h-[2rem] items-center overflow-hidden rounded-md  border border-transparent bg-Main-background bg-opacity-50 py-1     backdrop-blur-md transition-colors duration-150 ease-linear group-hover:border-primary-color group-hover:bg-Secondary-background">
          <div className="pill relative mx-1 flex h-auto w-full  items-center pl-2  ">
            <p className="ml-px w-full self-start overflow-hidden   pr-1  font-poppins text-xs text-paragraph-secondary ">
              {replyTo.content}
            </p>
          </div>
        </div>
        <p className=" mr-3 block w-full break-words pb-2  font-roboto text-sm font-normal leading-5  text-paragraph-secondary ">
          {content}
        </p>
      </div>
    </SingleMessageWrapper>
  );
};

export default ReplyMessage;
