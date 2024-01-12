import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatTopbar = () => {
  return (
    <div className="h-16 bg-Secondary-background">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="ml-2 flex flex-col">
            <span className="text-Secondary-text text-base font-medium text-Header-primary">
              Arya Stark
            </span>
            <span className="text-sm font-medium text-paragraph-secondary">
              Online
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-end">
            <button className="rounded-full border border-secondary-color bg-Secondary-background p-2 transition-transform duration-150 ease-linear hover:bg-Main-background active:scale-75  ">
              <BsThreeDotsVertical className="text-lg text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
