import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import SingleChatList from "@/components/chat/SingleChatList";

interface ChatTabProps {
  searchTerm: string;
}

const ChatTab: React.FC<ChatTabProps> = ({ searchTerm }) => {
  const [searchResult, setSearchResult] = useState<SingleGetAllChatTypes[]>([]);
  const { data, isLoading, error } = useQuery(["getAllChats"], () =>
    userApis.getUserChatList(),
  );

  useEffect(() => {
    if (searchTerm.length > 0 && data?.data) {
      const match = data?.data.filter(
        (chat) =>
          chat.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResult(match);
    }
    if (searchTerm.length === 0) {
      setSearchResult([]);
    }
  }, [searchTerm, data]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Something went wrong</div>;

  const ChatList = searchResult.length > 0 ? searchResult : data?.data || [];

  return (
    <div className="mt-4">
      <h1 className="ml-5  text-base font-medium text-Header-primary">
        All Chats
      </h1>
      <section className="chatScroll MessageContainer mt-2 flex h-[83vh] flex-col gap-2  overflow-y-auto">
        {ChatList.length > 0 &&
          ChatList.map((item) => <SingleChatList key={item._id} {...item} />)}

        {ChatList.length === 0 && (
          <div className="flex h-[70vh] flex-col items-center justify-center">
            <h1 className="mt-4 text-base  text-Header-primary">
              No Chats Found
            </h1>

            <p className="mt-1 text-xs  text-paragraph-secondary">
              Start a new chat or search for existing chats
            </p>
          </div>
        )}
      </section>
      T
    </div>
  );
};

export default ChatTab;
