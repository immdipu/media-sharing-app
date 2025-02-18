import React, { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";
import { FcGlobe, FcLock, FcConferenceCall } from "react-icons/fc";
import { TfiInfoAlt } from "react-icons/tfi";
import { Tab, TabContainer } from "../Tab/Tab";
import { motion, AnimatePresence } from "framer-motion";

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
      <Label className="px-1 text-base font-normal text-Header-secondary">
        Room type
      </Label>
      <TabContainer activeTab={activeTab} className="mt-3  flex ">
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "PUBLIC",
            }));
            setActiveTab(0);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcGlobe className="text-4xl" />
          <p className="text-xs font-normal text-paragraph-secondary">Public</p>
        </Tab>
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "FRIEND",
            }));
            setActiveTab(1);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcConferenceCall className="text-4xl" />
          <p className="text-xs text-paragraph-secondary">Friends Only</p>
        </Tab>
        <Tab
          onClick={() => {
            setRoomDetails((prev: any) => ({
              ...prev,
              roomType: "PRIVATE",
            }));
            setActiveTab(2);
          }}
          className="flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2"
        >
          <FcLock className="text-4xl" />
          <p className="text-xs text-paragraph-secondary">Private</p>
        </Tab>
      </TabContainer>
      <div className="pl-2 mt-5 bg-neutral-700 bg-opacity-60 border-neutral-700  border py-2  px-2 flex rounded-md  gap-2">
        <TfiInfoAlt className="text-[14px] mt-[3px]   block float-left text-Header-primary flex-shrink-0" />
        <AnimatePresence
        initial={false}
        mode="wait">
          <motion.div
            key={activeTab}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden "
         
          
          >
            {activeTab === 0 && (
              <p className="  text-sm font-medium text-paragraph-secondary">
                Anyone can join the room.
              </p>
            )}
            {activeTab === 1 && (
              <p className=" text-sm font-medium text-paragraph-secondary">
                Only people you follow and who follow you can join the room.
              </p>
            )}
            {activeTab === 2 && (
              <p className="  text-sm font-medium text-paragraph-secondary">
                People can only join if you accept their join request.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoomType;
