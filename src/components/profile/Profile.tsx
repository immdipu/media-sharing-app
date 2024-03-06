"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useParams } from "next/navigation";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import ProfileLoadingSkeleton from "../Skeleton/ProfileLoadingSkeleton";
import { ProfileCard, ProfileEdit, TabButtons } from ".";

const Profile = () => {
  const params = useParams();
  const user = useAppSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery(
    ["getUser", params.username, user.isUserAuthenticated],
    () => userApis.GetUserProfile(params.username as string),
    { enabled: user.isUserAuthenticated },
  );

  if (!user.isUserAuthenticated) {
    return (
      <div className="mt-20 grid min-h-screen place-content-center">
        <h5 className="text-2xl text-neutral-400">You are not logged in.</h5>
      </div>
    );
  }

  if (isLoading)
    return (
      <div>
        <ProfileLoadingSkeleton />
      </div>
    );

  if (error || !data) {
    return (
      <div className="mt-20 grid min-h-screen place-content-center">
        <h5 className="text-2xl text-neutral-400">User not found</h5>
      </div>
    );
  }

  return (
    <div>
      <ProfileCard {...data} />
      <TabButtons ownprofile={data.ownProfile} username={data.username} />
      {data.ownProfile && <ProfileEdit {...data} />}
    </div>
  );
};

export default Profile;
