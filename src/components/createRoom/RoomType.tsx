import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { FcGlobe, FcLock, FcConferenceCall } from "react-icons/fc";
import { TfiInfoAlt } from "react-icons/tfi";
import { Tab, TabContainer } from "../Tab/Tab";

const RoomType = ({
  setRoomDetails,
  roomDetails,
}: {
  setRoomDetails: Dispatch<SetStateAction<any>>;
  roomDetails: any;
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <div className="my-4 flex flex-col ">
      <Label className="px-1 font-normal text-neutral-200 caret-white">
        Room type
      </Label>
      <TabContainer activeTab={activeTab} className="mt-3  flex ">
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "public",
            }));
            setActiveTab(0);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcGlobe className="text-4xl" />
          <p className="text-xs text-Header-primary">Public</p>
        </Tab>
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "friends",
            }));
            setActiveTab(1);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcConferenceCall className="text-4xl" />
          <p className="text-xs text-Header-primary">Friends Only</p>
        </Tab>
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "private",
            }));
            setActiveTab(2);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcLock className="text-4xl" />
          <p className="text-xs text-Header-primary">Private</p>
        </Tab>
      </TabContainer>
      <div className="ml-2 mt-5  flex items-center gap-2">
        <TfiInfoAlt className="text-sm text-Header-primary" />
        {activeTab === 0 && (
          <p className=" text-sm text-paragraph-secondary">
            Anyone can join the room
          </p>
        )}
        {activeTab === 1 && (
          <p className=" text-sm text-paragraph-secondary">
            Only people you follow can join the room.
          </p>
        )}
        {activeTab === 2 && (
          <p className=" text-sm text-paragraph-secondary">
            Only people with the link can join the room
          </p>
        )}
      </div>
    </div>
  );
};

export default RoomType;
