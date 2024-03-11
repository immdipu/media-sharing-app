import React from "react";
import { useFollow } from "@/hooks";
import clsx from "clsx";

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
        setIsFollow(!follow);
      }}
      className={clsx(
        "w-full rounded-md border border-secondary-color py-1 font-poppins text-sm capitalize text-btn-primary duration-200 hover:opacity-70 active:scale-75",
        follow && "border-transparent bg-btn-primary text-white",
      )}
    >
      {follow ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
