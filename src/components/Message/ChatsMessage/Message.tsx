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

    socket.on("update-message-in-chat", (data) => {
      console.log("update-message-in-chat", data);
    });
  }, [socket]);

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
        <MessageInput setMessages={setMessages} />
      </div>
    </>
  );
};

export default Message;
