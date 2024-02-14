import React, { useLayoutEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SingleFollowerTypes } from "@/types/ApiResponseTypes";
import { useFollow, useFollowStatus, useAppSelector } from "@/hooks";

const SingleUserList: React.FC<SingleFollowerTypes> = ({
  _id,
  fullName,
  isAFollower,
  isFollowing: following,
  profilePic,
  username,
}) => {
  const { handleFollow, isFollowing, setIsFollowing } = useFollow();
  const { status } = useFollowStatus({ isFollowing, isAFollower });
  const user = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    if (following) {
      setIsFollowing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [following]);

  return (
    <div className=" flex items-center  justify-between rounded-md px-4 py-2 transition-colors duration-200 ease-linear hover:bg-Secondary-background">
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
      </Link>
      {_id !== user.id && (
        <div className="shrink-0">
          <button
            onClick={() => {
              setIsFollowing(!following);
              handleFollow(_id, "user");
            }}
            className=" rounded-full border px-2 py-1 text-xs font-normal text-paragraph-secondary transition-all duration-300 ease-in-out hover:text-Paragraph-primary"
          >
            {status}
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleUserList;
