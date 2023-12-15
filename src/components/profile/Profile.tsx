"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSearchParams, useParams } from "next/navigation";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import TabButtons from "./TabButtons";

const Profile = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const TabName = searchParams.get("tab");
  const user = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState(TabName ?? "about");

  const { data, isLoading, error } = useQuery(
    ["getUser", params.username],
    () => userApis.GetUserProfile(params.username as string),
  );

  if (isLoading) return <div>Loading...</div>;

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
    </div>
  );
};

export default Profile;
