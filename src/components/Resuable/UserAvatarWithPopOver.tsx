import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import UserProfilePopoverCardSkeleton from "../Skeleton/UserProfilePopoverCardSkeleton";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const UserProfilePopoverCard = dynamic(
  () => import("@/components/card/UserProfilePopoverCard"),
  {
    loading: () => <UserProfilePopoverCardSkeleton />,
  },
);

interface UserAvatarWithPopOverProps {
  ImageLink: string;
  username: string;
  fallback: string;
  className?: string;
}

const UserAvatarWithPopOver: React.FC<UserAvatarWithPopOverProps> = ({
  ImageLink,
  fallback,
  username,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={cn(" h-10 w-10", className)}>
          <AvatarImage src={ImageLink} />
          <AvatarFallback className="uppercase">{fallback}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="border-secondary-color bg-Secondary-background px-3">
        <UserProfilePopoverCard username={username} />
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatarWithPopOver;
