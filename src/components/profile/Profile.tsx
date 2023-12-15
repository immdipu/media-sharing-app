"use client";
import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useSearchParams, useParams } from "next/navigation";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";

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

  if (!data) return <div>Not Found</div>;

  console.log(data);

  return <div>{<ProfileCard {...data} />}</div>;
};

export default Profile;
