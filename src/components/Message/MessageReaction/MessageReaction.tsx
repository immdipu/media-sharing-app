import React from "react";
import { EmojisCollection } from "@/lib/constants";

const MessageReaction = () => {
  return (
    <div className="flex justify-around py-px">
      {EmojisCollection.map((emoji, index) => (
        <div
          className="my-1 flex items-center rounded-lg border border-primary-color bg-Main-background px-2 py-1 text-sm"
          key={index}
        >
          <span> {emoji.alt}</span>
          <span className="text-sm font-medium text-paragraph-secondary">
            5
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageReaction;
