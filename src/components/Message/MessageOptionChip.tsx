import React, { ReactNode } from "react";
import { MdReply } from "react-icons/md";
import { ImReply } from "react-icons/im";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface MessageOptionChipProps {
  Icon: IconType;
  TooltipText: string;
  className?: string;
  onClick?: () => void;
}

const MessageOptionChip: React.FC<MessageOptionChipProps> = ({
  Icon,
  TooltipText,
  className,
  onClick,
}) => {
  return (
    <div
      data-tooltip={TooltipText}
      onClick={onClick}
      data-tooltip-position="bottom"
      className="tooltip  block h-fit w-fit cursor-pointer rounded-lg text-xs     text-paragraph-secondary"
    >
      <Icon className={cn(" inline-block text-sm  duration-300 ", className)} />
    </div>
  );
};

export default MessageOptionChip;
