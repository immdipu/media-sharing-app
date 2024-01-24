"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import data, { Emoji } from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import MessageSendButon from "../Buttons/MessageSendButon";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSocket } from "@/context/SocketProvider";
import { useParams } from "next/navigation";
import { ChatMessageTypes } from "@/types/chatTypes";
import { randomUUID } from "crypto";

const MessageInput = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth);
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const { socket, EmitCustomEvent } = useSocket();

  const handleSend = () => {
    if (!message || message.trim() === "" || !user || !socket) return;
    setMessage("");
    const randomId = Math.floor(Math.random() * 100000000000000);
    let messageData: ChatMessageTypes = {
      chatId: id as unknown as string,
      type: "text",
      content: message,
      sender: {
        _id: user.id!,
        username: user.username!,
        profilePic: user.profilePic!,
        fullName: user.fullName!,
      },
      createdAt: new Date().toISOString(),
      tempId: randomId.toString(),
    };
    EmitCustomEvent("send-message-in-chat", messageData);
  };

  return (
    <div className="px flex gap-2 px-2">
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
