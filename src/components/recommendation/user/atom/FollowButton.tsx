import React from "react";
import { useFollow, useFollowStatus } from "@/hooks";

interface IFollowButton {
  userId: string;
}

const FollowButton: React.FC<IFollowButton> = ({ userId }) => {
  const [follow, setIsFollow] = React.useState(false);
  const { handleFollow } = useFollow();

  return (
    <button
      onClick={() => {
        handleFollow(userId, "follow");
        setIsFollow(true);
      }}
      className="w-full rounded-md bg-btn-primary py-1 font-poppins text-sm capitalize text-btn-primary hover:opacity-70"
    >
      {follow ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
