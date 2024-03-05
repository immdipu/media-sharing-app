import React from "react";
import {
  FaReply,
  FaRegSmile,
  FaTrash,
  FaExclamationCircle,
} from "react-icons/fa";
import MessageOptionChip from "./MessageOptionChip";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks";
import { AddReplyTo } from "@/redux/slice/roomSlice";

const EmojisPopOver = dynamic(() => import("../Emojis/EmojisPopOver"), {
  loading: () => <p>Loading...</p>,
});

const MessageOptions: React.FC<MessageOptionsProps> = ({
  _id,
  setShowEmojis,
  showEmojis,
  reactions,
}) => {
  const dispatch = useAppDispatch();

  const hadleMessageDelete = () => {};

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
          onClick={() => dispatch(AddReplyTo(_id))}
        />
        <EmojisPopOver
          messageId={_id}
          reactions={reactions}
          setShowEmojis={setShowEmojis}
          showEmojis={showEmojis}
        >
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
          onClick={hadleMessageDelete}
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
