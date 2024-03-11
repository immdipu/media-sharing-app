"use client";
import React from "react";
import UserAvatarWithPopOver from "@/components/Resuable/UserAvatarWithPopOver";
import CardInfo from "../atom/CardInfo";
import FollowButton from "../atom/FollowButton";

const RecommendationCard = ({ profilPic, fullName, username, _id }: any) => {
  return (
    <div className="flex w-[140px] flex-col items-center justify-center rounded-md bg-Third-background px-2 py-2">
      <UserAvatarWithPopOver
        ImageLink={profilPic}
        username={username}
        fallback={fullName}
        className=" h-32 w-32 rounded-none  p-2"
      />
      <CardInfo fullName={fullName} username={username} />
      <div className="mt-2 w-full  text-center">
        <FollowButton userId={_id} />
      </div>
    </div>
  );
};

export default RecommendationCard;
