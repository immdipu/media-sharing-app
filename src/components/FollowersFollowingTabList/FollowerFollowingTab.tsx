import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ListTab from "./ListTab";

interface FollowerFollowingTabProps {
  followers: number;
  following: number;
  _id: string;
}

const FollowerFollowingTab: React.FC<FollowerFollowingTabProps> = ({
  followers = 0,
  following = 0,
  _id,
}) => {
  const [activeTab, setActiveTab] = useState(3);

  const Followers = (
    <div className=" group" onClick={() => setActiveTab(0)}>
      <span className="text-sm font-semibold tracking-wide  text-neutral-300">
        {followers}
      </span>
      <span className="ml-2 text-sm font-normal text-paragraph-secondary underline-offset-4 group-hover:underline">
        Followers
      </span>
    </div>
  );

  const Following = (
    <div className="group" onClick={() => setActiveTab(1)}>
      <span className="text-sm font-semibold tracking-wide text-neutral-300">
        {following}
      </span>
      <span className="ml-2 text-sm font-normal text-paragraph-secondary underline-offset-4 group-hover:underline">
        {" "}
        Following
      </span>
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-8">
          <div>{Following}</div>
          <div>{Followers}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="border-secondary-color bg-Main-background">
        <DialogHeader>
          <DialogDescription>
            <ListTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              _id={_id}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowerFollowingTab;
