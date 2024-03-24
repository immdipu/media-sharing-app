import React, { useState } from "react";
import ChatSearch from "@/components/chat/ChatSearch";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tab, TabContainer } from "@/components/Tab/Tab";
import ChatTab from "./ChatTab";
import FriendsTab from "./FriendsTab";
import clsx from "clsx";

const MessageSidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = React.useState(0);
  const router = useRouter();
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
      <TabContainer
        sliderClassName=" -z-[1] bg-btn-primary rounded-full"
        activeTab={activeTab}
        className="z-0 mx-2 mt-4 flex h-7 overflow-hidden rounded-full bg-Third-background"
      >
        <Tab
          onClick={() => {
            setActiveTab(0);
          }}
          className={clsx(
            "grid w-full place-content-center  text-sm font-medium text-Paragraph-primary duration-300",
            activeTab === 0 && " text-btn-primary",
          )}
        >
          Chat
        </Tab>
        <Tab
          onClick={() => {
            setActiveTab(1);
          }}
          className={clsx(
            "grid w-full place-content-center text-sm font-medium text-Paragraph-primary duration-300",
            activeTab === 1 && " text-btn-primary",
          )}
        >
          Friends
        </Tab>
      </TabContainer>
      <div>
        {activeTab === 0 && <ChatTab searchTerm={searchTerm} />}
        {activeTab === 1 && <FriendsTab searchTerm={searchTerm} />}
      </div>
    </div>
  );
};

export default MessageSidebar;
