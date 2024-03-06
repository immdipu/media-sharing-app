"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import uniqid from "uniqid";
import MessageSendButon from "../Buttons/MessageSendButon";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useParams } from "next/navigation";
import { useAppDispatch, useSocket, useAppSelector } from "@/hooks";
import { AddNewMessage } from "@/redux/slice/chatSlice";
import { RemoveReplyTo } from "@/redux/slice/roomSlice";
import ReplyInputBoxHeader from "./MessageReply/ReplyInputBoxHeader";

interface MessageInputProps {
  MessageType: "ROOM" | "CHAT";
  receiver?: userType;
  row?: number;
}

const MessageInput: React.FC<MessageInputProps> = ({
  MessageType,
  receiver,
  row = 2,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const ReplyTo = useAppSelector((state) => state.room.ReplyTo);
  const { socket, EmitCustomEvent } = useSocket();

  const handleSend = () => {
    if (!message || message.trim() === "" || !user || !socket) return;

    if (MessageType === "ROOM") {
      let messageData = {
        roomId: JoinedRoom?.id,
        data: {
          _id: uniqid(),
          Type: ReplyTo ? "reply" : "message",
          content: message,
          sender: {
            _id: user.id!,
            fullName: user.fullName!,
            profilePic: user.profilePic!,
            username: user.username!,
            role: "USER",
            verified: user.vefified!,
            followers: 0,
            following: 0,
          },
          reactions: [],
          createdAt: new Date(),
          replyTo: ReplyTo ? ReplyTo._id : null,
        },
      };
      if (ReplyTo) dispatch(RemoveReplyTo());
      EmitCustomEvent("send-message-in-room", messageData);
    }

    if (MessageType === "CHAT" && receiver) {
      const randomId = Math.floor(Math.random() * 100000000000000);
      let messageData: ChatMessageTypes = {
        chatId: id as unknown as string,
        type: chatContentTypes.text,
        content: message,
        senderId: user.id!,
        to: receiver?._id,
        createdAt: new Date().toISOString(),
        tempId: randomId.toString(),
      };
      dispatch(
        AddNewMessage({
          _id: randomId.toString(),
          chatId: id as unknown as string,
          content: message,
          createdAt: new Date().toISOString(),
          isEmoji: false,
          sender: {
            _id: user.id!,
            fullName: user.fullName!,
            profilePic: user.profilePic!,
            username: user.username!,
          },
          reaction: [],
          status: "sending",
          type: chatContentTypes.text,
          tempId: randomId.toString(),
        }),
      );
      EmitCustomEvent("send-message-in-chat", messageData);
    }
    return setMessage("");
  };

  return (
    <div className="px flex flex-col gap-2  px-2">
      <div className="flex gap-2  ">
        <div className="relative flex w-full flex-col  rounded-md border border-secondary-color bg-neutral-800  transition-colors duration-150 ease-linear focus-within:border-neutral-300">
          <ReplyInputBoxHeader />
          <div className="relative flex w-full items-center rounded-md  bg-neutral-800 pr-3  ">
            <Textarea
              className=" messageInput  resize-none   bg-transparent text-neutral-200 outline-none  placeholder:text-neutral-400  focus:outline-none "
              placeholder="Write your message"
              rows={row}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
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
        </div>
        <MessageSendButon onclick={handleSend} />
      </div>
    </div>
  );
};

export default MessageInput;
