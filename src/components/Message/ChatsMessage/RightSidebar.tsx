import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RightSidebarProps extends SingleGetChatTypes {}

const RightSidebar: React.FC<RightSidebarProps> = ({ data }) => {
  const { showRightSidebar } = useAppSelector((state) => state.chat);
  return (
    <div
      className={clsx(
        "h-screen shrink-0 overflow-hidden bg-Secondary-background transition-all duration-200 ease-in",
        showRightSidebar ? "w-96" : "w-0",
      )}
    >
      <h5 className="">User Infomation</h5>
      <div className="flex justify-center ">
        <Avatar className="h-28 w-28">
          <AvatarImage src={data?.chat?.user?.profilePic} />
          <AvatarFallback>
            {data?.chat?.user?.fullName || "Profile pic"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium text-Header-primary">
          {data?.chat?.user?.fullName}
        </h1>
        <p className="text-sm text-Paragraph-primary">
          @{data?.chat?.user?.username}
        </p>
      </div>
    </div>
  );
};

export default RightSidebar;
