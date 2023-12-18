"use client";
import React from "react";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineUserAdd, AiOutlineTeam } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import moment from "moment";
const UserProfilePopoverCard = ({ username }: { username: string }) => {
  const { GetUserProfile } = userApis;
  const { data, isLoading } = useQuery(["userdetails", username], () =>
    GetUserProfile(username),
  );

  if (!data) return null;

  if (isLoading) return <div>Loading...</div>;

  if (data) {
    console.log(data);
  }

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
              <Tooltip delayDuration={100}>
                <TooltipTrigger className="z-20 border">
                  {data.isFollowing ? (
                    <AiOutlineTeam className="text-2xl text-green-500" />
                  ) : (
                    <AiOutlineUserAdd className="text-2xl text-Header-primary" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {data.isFollowing ? "Following" : "Follow"}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <p className="text-sm font-light tracking-wide text-paragraph-secondary">
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
