import React, { useEffect, useState } from "react";
import ChatSearch from "@/components/chat/ChatSearch";
import SingleChatList from "@/components/chat/SingleChatList";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { LoadAllChats } from "@/redux/slice/chatSlice";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MessageSidebar = () => {
  const dispatch = useAppDispatch();
  const { AllChats } = useAppSelector((state) => state.chat);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<SingleGetAllChatTypes[]>([]);
  const router = useRouter();
  const { data, isLoading, error } = useQuery(["getAllChats"], () =>
    userApis.getUserChatList(),
  );

  useEffect(() => {
    if (data) {
      dispatch(LoadAllChats(data.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const match = AllChats.filter(
        (chat) =>
          chat.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.user.username.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setSearchResult(match);
    }
    if (searchTerm.length === 0) {
      setSearchResult([]);
    }
  }, [searchTerm, AllChats]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div>Something went wrong</div>;

  const ChatList = searchResult.length > 0 ? searchResult : AllChats;

  return (
    <div className="">
      <div className="  mx-2 mt-3 flex items-center ">
        <button
          onClick={() => {
            router.push("/");
          }}
          className=" duration-20 transition-all peer-focus:opacity-0"
        >
          <ArrowLeft
            size={20}
            strokeWidth={2}
            className="text-paragraph-secondary"
          />
        </button>
        <div className=" w-full">
          <ChatSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="ml-5  text-lg font-medium text-Header-primary">
          All Chats
        </h1>
        <section className="chatScroll MessageContainer mt-2 flex h-[83vh] flex-col gap-2  overflow-y-auto">
          {ChatList.length > 0 &&
            ChatList.map((item) => <SingleChatList key={item._id} {...item} />)}
        </section>
      </div>
    </div>
  );
};

export default MessageSidebar;
