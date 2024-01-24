import React from "react";
import ChatSearch from "@/components/chat/ChatSearch";
import SingleChatList from "@/components/chat/SingleChatList";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";

const MessageSidebar = () => {
  const { data, isLoading, error } = useQuery(["getAllChats"], () =>
    userApis.getUserChatList(),
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Something went wrong</div>;

  return (
    <div className="">
      <div className="mx-4 mt-4">
        <ChatSearch />
      </div>
      <div className="mt-4">
        <h1 className="ml-5  text-lg font-medium text-Header-primary">
          All Chats
        </h1>
        <section className="chatScroll MessageContainer mt-2 flex h-[83vh] flex-col gap-2  overflow-y-auto">
          {data.data.map((item) => (
            <SingleChatList key={item._id} {...item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MessageSidebar;
