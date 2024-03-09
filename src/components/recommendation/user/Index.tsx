"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import RecommendationCard from "./organism/RecommendationCard";

const RecommedationUser = () => {
  const { data, isLoading } = useQuery(["user"], () =>
    userApis.UserRecommendation(),
  );

  if (isLoading) {
    return;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      {data.data &&
        data.data.length > 0 &&
        data.data.map((user: any) => (
          <RecommendationCard
            key={user._id}
            profilPic={user.profilePic}
            fullName={user.fullName}
            username={user.username}
            _id={user._id}
          />
        ))}
    </div>
  );
};

export default RecommedationUser;
