import React from "react";

const FollowerFollowingListSkeleton = () => {
  return (
    <div className="my-1 flex h-16 w-full items-center justify-between rounded-md bg-Secondary-background px-4 py-2 transition-colors duration-200 ease-linear">
      <div className="h-12 w-12 animate-pulse rounded-full bg-Main-background" />
      <div className="ml-4 flex-1">
        <div className="h-3 w-24 animate-pulse rounded-md bg-Main-background" />
        <div className="mt-1 h-3 w-16 animate-pulse rounded-md bg-Main-background" />
      </div>
      <div className="flex-shrink-0">
        <div className="h-6 w-20 animate-pulse rounded-full bg-Main-background" />
      </div>
    </div>
  );
};

export default FollowerFollowingListSkeleton;
