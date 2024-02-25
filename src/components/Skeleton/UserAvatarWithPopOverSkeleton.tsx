import React from "react";
import { cn } from "@/lib/utils";

const UserAvatarWithPopOverSkeleton = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-10 w-10 animate-pulse rounded-full bg-Main-background",
        className,
      )}
    />
  );
};

export default UserAvatarWithPopOverSkeleton;
