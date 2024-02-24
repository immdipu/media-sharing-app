import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Emoji from "./Emoji";
import { EmojisCollection } from "@/lib/constants";
import { SinlgeMessageContext } from "../Message/SingleMessage";
import { useAppDispatch, useAppSelector, useSocket } from "@/hooks";
import { Role } from "@/types";
import uniqid from "uniqid";

interface EmojisPopOverProps {
  children: React.ReactNode;
}

const EmojisPopOver: React.FC<EmojisPopOverProps> = ({ children }) => {
  const { showEmojis, setShowEmojis, messageId } =
    React.useContext(SinlgeMessageContext);
  const user = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { EmitCustomEvent } = useSocket();

  const handleClick = (code: string) => {
    let messageData = {
      roomId: JoinedRoom?.id,
      data: {
        Type: "MsgReaction",
        sender: {
          _id: user.id!,
        },
        msgId: messageId,
        emoji: code,
        createdAt: new Date(),
      },
    };
    EmitCustomEvent("send-message-in-room", messageData);
    setShowEmojis(!showEmojis);
  };

  return (
    <Popover
      onOpenChange={(e) => {
        setShowEmojis(e);
      }}
      open={showEmojis}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex items-center justify-evenly gap-1 border-secondary-color bg-Secondary-background py-2  ">
        {EmojisCollection.map((emoji, index) => (
          <Emoji
            key={index}
            link={emoji.link}
            alt={emoji.alt}
            code={emoji.code}
            onclick={handleClick}
            className="h-10 w-10 cursor-pointer rounded-full p-2  transition-all duration-300 ease-in-out hover:scale-125 hover:shadow-lg"
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default EmojisPopOver;
