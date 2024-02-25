import React from "react";

const UserListOptionCardSkeleton = () => {
  return (
    <div className="flex w-48 flex-col gap-2 px-3 py-3">
      <div className="h-9 w-full  rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
    </div>
  );
};

export default UserListOptionCardSkeleton;
