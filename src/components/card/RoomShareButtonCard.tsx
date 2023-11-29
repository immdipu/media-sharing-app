import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RoomShareButtonCard = () => {
  return (
    <div>
      <Avatar className="h-16 w-16 rounded-md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default RoomShareButtonCard;
