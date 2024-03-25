import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, UserCircleIcon } from "lucide-react";
import Link from "next/link";

interface RightSidebarProps extends SingleGetChatTypes {}

const RightSidebar: React.FC<RightSidebarProps> = ({ data }) => {
  const { showRightSidebar } = useAppSelector((state) => state.chat);
  return (
    <div
      className={clsx(
        "h-screen shrink-0 overflow-hidden border-l border-primary-color bg-Secondary-background transition-all duration-200 ease-in",
        showRightSidebar ? "w-96" : "w-0",
      )}
    >
      <div className="h-16    pt-4">
        <h5 className="mx-4  overflow-hidden whitespace-nowrap text-xl font-semibold text-Header-primary">
          User Infomation
        </h5>
      </div>

      <div className="mt-8 flex justify-center">
        <Avatar className="h-28 w-28">
          <AvatarImage src={data?.chat?.user?.profilePic} />
          <AvatarFallback>
            {data?.chat?.user?.fullName || "Profile pic"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium capitalize text-Header-primary">
          {data?.chat?.user?.fullName}
        </h1>
        <p className="text-sm text-Paragraph-primary">
          @{data?.chat?.user?.username}
        </p>
      </div>

      <br />
      <section className="">
        <Link
          href={`/profile/${data.chat.user.username}`}
          className="flex w-full gap-6 rounded   px-8 py-3 hover:bg-Main-background"
        >
          <UserCircleIcon className="text-Paragraph-primary" />
          <h5 className=" text-Paragraph-primary">Visit Profile</h5>
        </Link>
        <button className="flex w-full gap-6 rounded   px-8 py-3 hover:bg-Main-background">
          <Trash2 className="text-red-500" />
          <h5 className=" text-Paragraph-primary">Delete Chat</h5>
        </button>
      </section>
    </div>
  );
};

export default RightSidebar;
