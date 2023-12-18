"use client";
import React, { useLayoutEffect } from "react";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineUserAdd, AiOutlineTeam } from "react-icons/ai";
import useFollow from "@/hooks/useFollow";
import UserProfilePopoverCardSkeleton from "../Skeleton/UserProfilePopoverCardSkeleton";
import moment from "moment";
const UserProfilePopoverCard = ({ username }: { username: string }) => {
  const { GetUserProfile } = userApis;
  const { data, isLoading } = useQuery(["user", username], () =>
    GetUserProfile(username),
  );
  const { isFollowing, setIsFollowing, handleFollow } = useFollow();

  useLayoutEffect(() => {
    if (data?.isFollowing) {
      setIsFollowing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <UserProfilePopoverCardSkeleton />;
  }

  if (!data) return <UserProfilePopoverCardSkeleton />;

  return (
    <section className="flex flex-col ">
      <div className="flex">
        <Avatar className="h-16 w-16">
          <AvatarImage src={data.profilePic} />
          <AvatarFallback>{data.fullName}</AvatarFallback>
        </Avatar>
        <div className="ml-2 w-full">
          <div className="flex justify-between">
            <h1 className="line-clamp-1 capitalize text-Header-primary">
              {data.fullName}
            </h1>
            {!data.ownProfile && (
              <button
                title={isFollowing ? "Unfollow" : "Follow"}
                onClick={() => {
                  if (!data?._id) return;
                  handleFollow(data._id, "userdetails");
                }}
              >
                {isFollowing ? (
                  <AiOutlineTeam className="text-2xl text-green-500" />
                ) : (
                  <AiOutlineUserAdd className="text-2xl text-Header-primary" />
                )}
              </button>
            )}
          </div>

          <p className="text-xs font-light tracking-wide text-paragraph-secondary">
            @{data.username}
          </p>
        </div>
      </div>
      <section>
        <p className="ml-2 mt-2 line-clamp-2 text-xs font-light text-Paragraph-primary">
          {data.bio}
        </p>
        <div>
          <div className="mt-2 flex">
            <span className="text-xs font-light text-Paragraph-primary">
              Joined at {moment(data.createdAt).format("MMM Do YY")}
            </span>
          </div>
          <div className="mt-2 flex">
            <span className="text-xs font-light text-Paragraph-primary">
              {data.followers} followers
            </span>
            <span className="ml-2 text-xs font-light text-Paragraph-primary">
              {data.following} following
            </span>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UserProfilePopoverCard;
