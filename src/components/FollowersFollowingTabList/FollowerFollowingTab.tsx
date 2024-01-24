import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
  const Followers = (
    <div>
      <span className="text-sm font-semibold tracking-wide  text-neutral-300">
        {followers}
      </span>
      <span className="ml-2 text-sm font-normal text-paragraph-secondary">
        Followers
      </span>
    </div>
  );

  const Following = (
    <div>
      <span className="text-sm font-semibold tracking-wide text-neutral-300">
        {following}
      </span>
      <span className="ml-2 text-sm font-normal text-paragraph-secondary">
        {" "}
        Following
      </span>
    </div>
  );

  return (
    <Dialog open={true}>
      <DialogTrigger>
        <div className="flex items-center gap-8">
          <div>{Following}</div>
          <div>{Followers}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="border-secondary-color bg-Main-background">
        <DialogHeader>
          <DialogDescription>
            <ListTab _id={_id} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FollowerFollowingTab;
