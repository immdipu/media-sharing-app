import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileLoadingSkeleton = () => {
  return (
    <div className="mx-11 min-h-screen bg-Secondary-background p-8">
      <div className="mb-8 flex gap-6">
        <div className="h-44 w-44 animate-pulse rounded-md bg-secondary-hover" />
        <div className="flex-1 space-y-6 py-1">
          <div className="h-8 animate-pulse rounded bg-secondary-hover" />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 h-4 animate-pulse rounded bg-secondary-hover" />
              <div className="col-span-1 h-4 animate-pulse rounded bg-secondary-hover" />
            </div>
            <div className="h-4 animate-pulse rounded bg-secondary-hover" />
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-Secondary-background p-6 shadow-lg">
        <div className="flex animate-pulse space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-6 animate-pulse rounded bg-secondary-hover" />
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div className="h-4 animate-pulse rounded bg-secondary-hover" />
                <div className="h-4 animate-pulse rounded bg-secondary-hover" />
              </div>
              <div className="h-4 animate-pulse rounded bg-secondary-hover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingSkeleton;
