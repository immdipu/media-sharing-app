import React, { useState } from "react";
import { TabContainer, Tab } from "../Tab/Tab";
import dynamic from "next/dynamic";
const FollowersList = dynamic(() => import("./FollowersList"));
const FollowingList = dynamic(() => import("./FollowingList"));

const ListTab = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <section className="w-full">
        <TabContainer activeTab={activeTab} className="flex w-full">
          <Tab
            onClick={() => {
              setActiveTab(0);
            }}
          >
            Followers
          </Tab>
          <Tab
            onClick={() => {
              setActiveTab(1);
            }}
          >
            Following
          </Tab>
        </TabContainer>
      </section>
      <section className="w-full">
        {activeTab === 0 && <FollowersList />}
        {activeTab === 1 && <FollowingList />}
      </section>
    </div>
  );
};

export default ListTab;
