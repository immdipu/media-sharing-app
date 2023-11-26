import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbLogout2 } from "react-icons/tb";
import { RoomJoinLeaveTypes } from "@/types/room";
import { FaBell } from "react-icons/fa";

const RoomUpdateCard = ({
  message = " ",
  updatedBy = "",
}: {
  message: string;
  updatedBy: string;
}) => {
  return (
    <div className="  flex min-h-[3rem] items-center bg-third-background px-3 py-2 hover:bg-secondary-hover">
      <div className="ml-3">
        <FaBell className="text-2xl text-green-200" />
      </div>
      <div className="ml-3 w-full">
        <p className="text-sm text-green-600">
          {message}{" "}
          <span className="font-medium text-paragraph-secondary">
            {updatedBy}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default RoomUpdateCard;
