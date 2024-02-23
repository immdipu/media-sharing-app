import React from "react";
import {
  FaReply,
  FaRegSmile,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import MessageOptionChip from "./MessageOptionChip";
import EmojisPopOver from "../Emojis/EmojisPopOver";

const MessageOptions = () => {
  return (
    <div className="flex gap-9">
      <MessageOptionChip
        Icon={FaReply}
        TooltipText="Reply to message"
        className="hover:text-green-500"
      />
      <EmojisPopOver>
        <MessageOptionChip
          Icon={FaRegSmile}
          TooltipText="React to message"
          className="hover:text-yellow-400"
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
  );
};

export default MessageOptions;
