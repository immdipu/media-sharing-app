import { MessageReplyTypes } from "@/types/room";
import React, { useState } from "react";
import MessageHeader from "../organism/MessageHeader";
import dynamic from "next/dynamic";
import UserAvatarWithPopOver from "@/components/Resuable/UserAvatarWithPopOver";

import clsx from "clsx";

const MessageReaction = dynamic(
  () => import("../MessageReaction/MessageReaction"),
  {
    loading: () => (
      <div className="h-2 w-2 animate-pulse rounded-md bg-Main-background" />
    ),
  },
);

const MessageOptions = dynamic(() => import("../MessageOptions"), {
  loading: () => <p>Loading...</p>,
});

const ReplyMessage: React.FC<MessageReplyTypes> = ({
  Type,
  _id,
  content,
  createdAt,
  reactions,
  replyTo,
  sender,
}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <div
      className={clsx(
        "group relative flex flex-col px-3 py-1 hover:bg-Main-background",
        showEmojis && "bg-Main-background",
      )}
    >
      <section className=" flex items-start">
        <UserAvatarWithPopOver
          ImageLink={sender.profilePic}
          username={sender.username}
          fallback={sender.fullName}
          className="mt-1"
        />

        <div className="ml-2 w-full">
          <MessageHeader date={createdAt} name={sender?.fullName} />
          <div className="relative mt-[2px] ">
            <p className="mr-3 block w-full break-words pb-2  font-roboto text-sm font-normal leading-5  text-paragraph-secondary ">
              {content}
            </p>
          </div>
        </div>
      </section>

      {reactions && reactions.length > 0 && (
        <MessageReaction reactions={reactions} />
      )}
      <MessageOptions
        _id={_id}
        setShowEmojis={setShowEmojis}
        showEmojis={showEmojis}
        reactions={reactions}
      />
    </div>
  );
};

export default ReplyMessage;
