"use client";
import React from "react";

const UserProfilePopoverCardSkeleton = () => {
  return (
    <div className="h-full w-full rounded-lg   p-4 ">
      <div className="flex animate-pulse space-x-4 ">
        <div className="h-16 w-16 rounded-full bg-Main-background " />
        <div className="flex-1 ">
          <div className="h-4 w-3/4 rounded " />
          <div className="space-y-2">
            <div className="h-4 rounded bg-Main-background" />
            <div className="h-4 w-5/6 rounded bg-Main-background" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex animate-pulse space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 w-1/4 rounded bg-Main-background" />
          <div className="flex gap-4">
            <div className="h-4 w-1/2 rounded bg-Main-background" />
            <div className="h-4 w-1/2 rounded bg-Main-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePopoverCardSkeleton;
