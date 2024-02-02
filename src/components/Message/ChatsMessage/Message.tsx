"use client";
import { useEffect, useState } from "react";
import MessageInput from "../MessageInput";
import AllMessages from "./AllMessages";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ChatTopbar from "@/components/chat/ChatTopbar";
import { useSocket } from "@/context/SocketProvider";
import { MessageTypes } from "@/types/ApiResponseTypes";
import {
  updateMessageDataTypes,
  updateMessageTypes,
} from "@/types/socketTypes";

const Message = () => {
  const { id } = useParams();
  const { socket, EmitCustomEvent } = useSocket();
  const [Messages, setMessages] = useState<MessageTypes[]>([]);

  const { data, isLoading, error } = useQuery(["getSingleChat", id], () =>
    userApis.getSingleChatByChatId(id as unknown as string),
  );

  useEffect(() => {
    if (!socket) return;
    socket.on("new-message-in-chat", (data) => {
      console.log(data);
    });

    EmitCustomEvent("join-single-chat", {
      chatId: id,
    });

    socket.on("update-message-in-chat", (data: updateMessageDataTypes) => {
      if (data.type === updateMessageTypes.UPDATE_SENT_MESSAGE) {
        if (data.message.chatId === id) {
          setMessages((prev) => {
            let newMessages = prev.filter(
              (message) => message.tempId !== data.message.tempId,
            );
            return [...newMessages, data.message];
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      if (socket) {
        socket.off("new-message-in-chat");
        socket.off("update-message-in-chat");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id]);

  useEffect(() => {
    if (!data) return;
    setMessages(data.data.chat.messages);
  }, [data]);

  if (isLoading) return <div>loading</div>;

  if (error || !data) return <div>error</div>;

  return (
    <>
      <ChatTopbar
        fullName={data?.data.chat.user.fullName}
        profilePic={data?.data?.chat?.user?.profilePic}
        username={data?.data.chat.user.username}
      />
      <div className="flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-Main-background pb-2">
        {Messages && Messages?.length > 0 && (
          <AllMessages Messages={Messages} />
        )}
        <MessageInput
          receiver={data?.data?.chat?.user}
          setMessages={setMessages}
          MessageType="CHAT"
        />
      </div>
    </>
  );
};

export default Message;
