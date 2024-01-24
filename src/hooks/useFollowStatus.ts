import { useEffect, useState } from "react";

const useFollowStatus = ({
  isFollowing,
  isAFollower,
}: {
  isFollowing: boolean;
  isAFollower: boolean;
}) => {
  const [status, setStatus] = useState<
    "Follow Back" | "Following" | "Friends" | "Follow"
  >("Follow");

  useEffect(() => {
    if (isFollowing && isAFollower) setStatus("Friends");
    if (isFollowing && !isAFollower) setStatus("Following");
    if (!isFollowing && isAFollower) setStatus("Follow Back");
    if (!isFollowing && !isAFollower) setStatus("Follow");
  }, [isFollowing, isAFollower]);

  return { status };
};

export default useFollowStatus;
