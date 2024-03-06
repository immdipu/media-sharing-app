import React from "react";
import { EmojisCollection } from "@/lib/constants";

interface MessageReactionProps {
  reactions: ReactionTypes[];
}

const MessageReaction: React.FC<MessageReactionProps> = ({ reactions }) => {
  const Reactions: any = {};

  reactions.forEach((reaction) => {
    if (Reactions[reaction.emoji]) {
      Reactions[reaction.emoji] += 1;
    } else {
      Reactions[reaction.emoji] = 1;
    }
  });

  return (
    <div className="ml-10 flex justify-start space-x-3 py-px">
      {Object.keys(Reactions).map((emoji, index) => (
        <div
          className="my-1 flex items-center rounded-lg border border-primary-color bg-Main-background px-2 py-1 text-sm text-red-500"
          key={index}
        >
          <span>
            {" "}
            {EmojisCollection.find((item) => item.code === emoji)?.alt}
          </span>
          <span className="text-sm font-medium text-paragraph-secondary">
            {Reactions[emoji]}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageReaction;
