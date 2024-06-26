import React, { useState } from "react";
import { TabContainer, Tab } from "../Tab/Tab";
import dynamic from "next/dynamic";
import clsx from "clsx";
const FollowersList = dynamic(() => import("./FollowersList"));
const FollowingList = dynamic(() => import("./FollowingList"));

interface ListTabProsp {
  _id: string;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const ListTab: React.FC<ListTabProsp> = ({ _id, activeTab, setActiveTab }) => {
  return (
    <div>
      <section className="mt-5 w-full">
        <TabContainer
          activeTab={activeTab}
          className="z-0 flex w-full rounded-md bg-secondary-hover"
          sliderClassName="bg-btn-primary"
        >
          <Tab
            onClick={() => {
              setActiveTab(0);
            }}
            className={clsx(
              "text-base text-Paragraph-primary transition-colors duration-300",
              activeTab === 0 && "text-btn-primary",
            )}
          >
            Followers
          </Tab>
          <Tab
            onClick={() => {
              setActiveTab(1);
            }}
            className={clsx(
              "text-base text-Paragraph-primary transition-colors duration-300",
              activeTab === 1 && "text-btn-primary",
            )}
          >
            Following
          </Tab>
        </TabContainer>
      </section>
      <section className="min-h-[10rem] w-full py-3">
        {activeTab === 0 && <FollowersList _id={_id} />}
        {activeTab === 1 && <FollowingList _id={_id} />}
      </section>
    </div>
  );
};

export default ListTab;
