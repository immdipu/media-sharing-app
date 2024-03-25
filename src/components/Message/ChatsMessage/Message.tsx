"use client";
import { useEffect } from "react";
import MessageInput from "../organism/MessageInput";
import AllMessages from "./AllMessages";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import ChatTopbar from "@/components/chat/ChatTopbar";
import { LoadAllMessages } from "@/redux/slice/chatSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import dynamic from "next/dynamic";
const RightSidebar = dynamic(
  () => import("@/components/Message/ChatsMessage/RightSidebar"),
);

const Message = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { Messages } = useAppSelector((state) => state.chat);

  const { data, isLoading, error } = useQuery(["getSingleChat", id], () =>
    userApis.getSingleChatByChatId(id as unknown as string),
  );

  useEffect(() => {
    if (!data) return;
    dispatch(LoadAllMessages(data.data.chat.messages));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <div>loading</div>;

  if (error || !data) return <div>error</div>;

  return (
    <>
      <div className="flex w-full">
        <section className=" w-full">
          <ChatTopbar
            fullName={data?.data.chat.user.fullName}
            profilePic={data?.data?.chat?.user?.profilePic}
            username={data?.data.chat.user.username}
          />
          <div className="flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden  bg-Main-background pb-2 ">
            {Messages && Messages?.length > 0 && (
              <AllMessages Messages={Messages} />
            )}
            {Messages && Messages?.length === 0 && (
              <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center">
                  <h1 className="text-paragraph-primary mt-4 font-roboto text-xl text-paragraph-secondary">
                    No messages yet
                  </h1>
                </div>
              </div>
            )}
            <MessageInput
              receiver={data?.data?.chat?.user}
              MessageType="CHAT"
            />
          </div>
        </section>
        <RightSidebar {...data} />
      </div>
    </>
  );
};

export default Message;
