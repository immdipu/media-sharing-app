import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import Link from "next/link";
import MessageButton from "../profile/MessageButton";

interface FriendListProps extends membersTypes {}

const FriendList: React.FC<FriendListProps> = ({
  _id,
  fullName,
  profilePic,
  username,
  verified,
}) => {
  return (
    <div className=" flex items-center  justify-between rounded-md px-4 py-2 transition-colors duration-200 ease-linear hover:bg-Secondary-background">
      <div className="flex  w-full items-center  space-x-2">
        <div className="relative">
          <UserAvatarWithPopOver
            ImageLink={profilePic}
            fallback={fullName}
            username={username}
          />
          {/* <div className="bg-green-500 w-3 h-3 top-1 border right-0 rounded-full absolute" /> */}
        </div>

        <div className="h-fit  pb-1">
          <h1 className=" items-center text-sm font-normal capitalize text-Header-primary">
            {fullName}{" "}
            {/* {role === Role.admin && (
          <span className="border-_light_white ml-5 inline-block rounded-full border border-opacity-40 bg-neutral-800 px-2 py-[1px] text-xs text-neutral-400">
            {role}
          </span>
        )} */}
          </h1>
          <h4 className="text-xs font-light tracking-wide text-paragraph-secondary">
            @{username}
          </h4>
        </div>
      </div>

      <div className="shrink-0">
        <MessageButton _id={_id} />
      </div>
    </div>
  );
};

export default FriendList;
