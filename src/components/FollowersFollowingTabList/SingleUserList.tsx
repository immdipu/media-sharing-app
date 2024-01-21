import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SingleUserListProps {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  role: string;
  status: string;
  updateFollow: any;
  user: any;
  localIsFollowing: boolean;
  setLocalIsFollowing: any;
}

const SingleUserList: React.FC<SingleUserListProps> = ({
  _id,
  fullName,
  localIsFollowing,
  profilePic,
  role,
  setLocalIsFollowing,
  status,
  updateFollow,
  user,
  username,
}) => {
  return (
    <div className=" flex items-center  justify-between px-4 py-2 transition-colors duration-200 ease-linear hover:bg-neutral-900">
      <Link
        className="flex  w-full items-center  space-x-2"
        key={_id}
        href={`/profile/${username}`}
      >
        <div className="relative">
          <Avatar>
            <AvatarImage src={profilePic} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>

          {/* <div className="bg-green-500 w-3 h-3 top-1 border right-0 rounded-full absolute" /> */}
        </div>

        <div>
          <h1 className="font-Helvetica  items-center text-base font-normal capitalize text-neutral-200">
            {fullName}{" "}
            {/* {role === Role.admin && (
              <span className="border-_light_white ml-5 inline-block rounded-full border border-opacity-40 bg-neutral-800 px-2 py-[1px] text-xs text-neutral-400">
                {role}
              </span>
            )} */}
          </h1>
          <h4 className="text-xs font-normal tracking-wide text-neutral-400">
            @{username}
          </h4>
        </div>
      </Link>
      {_id !== user.id && (
        <div className="shrink-0">
          <button
            onClick={() => {
              updateFollow.mutate(_id);
              setLocalIsFollowing(!localIsFollowing);
            }}
            className="border-_welcometext_lightblue w-fit rounded-full border px-2 py-1 text-xs font-normal text-neutral-400 hover:text-neutral-200"
          >
            {status}
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleUserList;
