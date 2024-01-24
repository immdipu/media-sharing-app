"use client";
import React from "react";
import MessageInput from "../MessageInput";
import AllMessages from "./AllMessages";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ChatTopbar from "@/components/chat/ChatTopbar";

const Message = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery(["getSingleChat", id], () =>
    userApis.getSingleChatByChatId(id as unknown as string),
  );

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
        <AllMessages />
        <MessageInput />
      </div>
    </>
  );
};

export default Message;
