import React, { useState } from "react";
import {
  FaReply,
  FaRegSmile,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import MessageOptionChip from "./MessageOptionChip";
import EmojisPopOver from "../Emojis/EmojisPopOver";
import clsx from "clsx";

const MessageOptions = () => {
  const [active, setActive] = useState<
    "reply" | "emojis" | "delete" | "report" | null
  >(null);
  const [showEmojis, setShowEmojis] = useState(false);
  return (
    <section
      className={clsx(
        "z-10 ml-12 h-5 translate-y-2 leading-3 opacity-0 transition-all duration-500  ease-in-out group-hover:translate-y-0 group-hover:overflow-visible group-hover:opacity-100",
        showEmojis && "translate-y-0 overflow-visible opacity-100",
      )}
    >
      <div className="flex gap-9">
        <MessageOptionChip
          Icon={FaReply}
          TooltipText="Reply to message"
          className="hover:text-green-500 "
          onClick={() => {
            if (active === "reply") {
              setActive(null);
            } else {
              setActive("reply");
            }
          }}
        />
        <EmojisPopOver showEmojis={showEmojis} setEmojis={setShowEmojis}>
          <MessageOptionChip
            Icon={FaRegSmile}
            TooltipText="React to message"
            className={clsx(
              "hover:text-yellow-400",
              showEmojis && "text-yellow-400",
            )}
            onClick={() => {
              if (active === "emojis") {
                setActive(null);
              } else {
                setActive("emojis");
              }
            }}
          />
        </EmojisPopOver>

        <MessageOptionChip
          Icon={FaTrash}
          TooltipText="Delete message"
          className="hover:text-red-500"
        />
        <MessageOptionChip
          Icon={FaExclamationCircle}
          TooltipText="Report this message "
          className="hover:text-red-500"
        />
      </div>
    </section>
  );
};

export default MessageOptions;
