import React from "react";
import { MdReply } from "react-icons/md";
import { ImReply } from "react-icons/im";

interface MessageOptionChipProps {
  title: string;
}

const MessageOptionChip: React.FC<MessageOptionChipProps> = ({ title }) => {
  return (
    <div
      data-tooltip="Reply"
      data-tooltip-position="bottom"
      className="tooltip group block h-fit w-fit cursor-pointer rounded-lg   text-xs  text-paragraph-secondary"
    >
      <ImReply className=" inline-block text-sm duration-300 group-hover:text-blue-600" />
    </div>
  );
};

export default MessageOptionChip;
