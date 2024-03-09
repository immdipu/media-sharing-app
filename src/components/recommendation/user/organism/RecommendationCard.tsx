import React from "react";
import UserAvatarWithPopOver from "@/components/Resuable/UserAvatarWithPopOver";
import CardInfo from "../atom/CardInfo";
import FollowButton from "../atom/FollowButton";

const RecommendationCard = ({ profilPic, fullName, username, _id }: any) => {
  return (
    <div className="rounded-md  bg-Secondary-background px-4 py-2">
      <div>
        <h3 className="mb-3 font-bold text-Header-secondary">Who to follow</h3>
      </div>

      <div className="flex w-[140px] flex-col items-center justify-center rounded-md bg-Third-background px-2 py-2">
        <UserAvatarWithPopOver
          ImageLink={profilPic}
          username={username}
          fallback={fullName}
          className="h-full w-full rounded-none  p-2"
        />
        <CardInfo fullName={fullName} username={username} />
        <div className="mt-2 w-full  text-center">
          <FollowButton userId={_id} />
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
