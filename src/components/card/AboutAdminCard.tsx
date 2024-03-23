import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { UserAvatarWithPopOverSkeleton } from "../Skeleton";

const AboutAdminCard = ({ username, id }: { username: string; id: string }) => {
  const {
    data: JoinedRoom,
    isLoading,
    isError,
  } = useQuery(["user", id], () => userApis.GetUserProfile(username), {
    enabled: !!id,
  });

  if (isLoading) return <UserAvatarWithPopOverSkeleton />;

  if (isError)
    return (
      <div>
        <h1>Something went wrong</h1>
      </div>
    );

  return (
    <section className=" mx-2 mt-3 flex  flex-col rounded-md border border-primary-color px-3 py-2 hover:bg-Main-background">
      <h3 className="mt-2 font-roboto  text-Header-secondary"> About Admin </h3>
      <div className="mt-4 flex">
        <Avatar className="h-16 w-16">
          <AvatarImage src={JoinedRoom?.profilePic} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3 mt-1 pb-4">
          <h3 className=" font-medium capitalize text-Header-secondary">
            {JoinedRoom?.fullName}
          </h3>
          <p className="text-xs font-normal leading-none text-paragraph-secondary">
            {JoinedRoom?.username}
          </p>
          <div className=" mt-3 flex gap-5">
            <h3 className="text-xs font-normal text-Header-secondary">
              Followers:{" "}
              <span className="text-Header-primary">
                {JoinedRoom?.followers}
              </span>{" "}
            </h3>
            <h3 className="text-xs font-normal text-Header-secondary">
              Following:{" "}
              <span className="text-Header-primary">
                {JoinedRoom?.following}
              </span>{" "}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdminCard;
