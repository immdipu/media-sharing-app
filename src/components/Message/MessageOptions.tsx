import React, { useState, useContext } from "react";
import {
  FaReply,
  FaRegSmile,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import MessageOptionChip from "./MessageOptionChip";
import clsx from "clsx";
import { SinlgeMessageContext } from "./SingleMessage";
import dynamic from "next/dynamic";

const EmojisPopOver = dynamic(() => import("../Emojis/EmojisPopOver"), {
  loading: () => <p>Loading...</p>,
});

const MessageOptions = () => {
  const [active, setActive] = useState<
    "reply" | "emojis" | "delete" | "report" | null
  >(null);
  const { showEmojis, setShowEmojis } = useContext(SinlgeMessageContext);

  return (
    <section
      className={clsx(
        "z-10 ml-12 h-5  leading-3 opacity-0 transition-all duration-500  ease-in-out  group-hover:overflow-visible group-hover:opacity-100",
        showEmojis
          ? "translate-y-0 overflow-visible opacity-100"
          : "translate-y-2 overflow-hidden opacity-0 group-hover:translate-y-0",
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
        <EmojisPopOver>
          <MessageOptionChip
            Icon={FaRegSmile}
            TooltipText="React to message"
            className={clsx(
              "hover:text-yellow-400",
              showEmojis && "text-yellow-400",
            )}
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
