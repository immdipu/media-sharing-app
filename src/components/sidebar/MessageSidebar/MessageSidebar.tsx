import React from "react";
import ChatSearch from "@/components/chat/ChatSearch";
import SingleChatList from "@/components/chat/SingleChatList";

const MessageSidebar = () => {
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
          <SingleChatList />
          <SingleChatList />
          <SingleChatList />
          <SingleChatList />
        </section>
      </div>
    </div>
  );
};

export default MessageSidebar;
