"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import data, { Emoji } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import MessageSendButon from "../Buttons/MessageSendButon";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RoomMessageTypes, membersTypes } from "@/types/room";
import { Role } from "@/types/role";
import { useSocket } from "@/context/SocketProvider";
const MessageInput = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const user = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { socket, EmitCustomEvent } = useSocket();

  const handleSend = () => {
    if (!message || message.trim() === "") return;

    setMessage("");
    let messageData = {
      roomId: JoinedRoom?.id,
      data: {
        Type: "message",
        content: message,
        sender: {
          _id: user.id!,
          fullName: user.fullName!,
          profilePic: user.profilePic!,
          username: user.username!,
          role: Role.User,
          verified: user.vefified!,
          followers: 0,
          following: 0,
        },
        createdAt: new Date(),
      },
    };
    EmitCustomEvent("send-message-in-room", messageData);
  };

  return (
    <div className="flex gap-px px-2">
      <div className="relative flex w-full items-center rounded-md border border-secondary-color bg-neutral-800 pr-3 transition-colors duration-150 ease-linear focus-within:border-neutral-300">
        <Textarea
          className=" messageInput  resize-none   bg-transparent text-neutral-200 outline-none  placeholder:text-neutral-400  focus:outline-none "
          placeholder="Write your message"
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return handleSend();
            }
          }}
        />
        <HiOutlineEmojiHappy
          className="cursor-pointer text-3xl text-neutral-400"
          onClick={() => setShowEmoji(!showEmoji)}
        />
        {showEmoji && (
          <div className="absolute  bottom-14 right-0 z-10">
            <Picker
              data={data}
              onClickOutside={() => setShowEmoji(false)}
              onEmojiSelect={(e: any) => {
                setMessage(message + e.native);
              }}
            />
          </div>
        )}
      </div>
      <MessageSendButon onclick={handleSend} />
    </div>
  );
};

export default MessageInput;
