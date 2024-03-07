import React from "react";
import TitleLogo from "@/components/Icons/TitleLogo";
import RoomTypeIcon from "./RoomTypeIcon";
import moment from "moment";

interface RoomCardHeaderProps {
  name: string;
  roomType: RoomType;
  createdAt: Date;
}

const RoomCardHeader: React.FC<RoomCardHeaderProps> = ({
  createdAt,
  name,
  roomType,
}) => {
  return (
    <div className="mb-3 flex items-center gap-2 font-medium text-neutral-50">
      <TitleLogo color="#ffffff" opacity={0.2} />{" "}
      <p
        data-tooltip={name}
        data-tooltip-position="top"
        className="tooltip line-clamp-1 block   max-w-xs overflow-hidden  truncate "
      >
        {name}
      </p>{" "}
      <div
        data-tooltip={`${roomType} room`}
        data-tooltip-position="top"
        className="tooltip ml-1 capitalize"
      >
        <RoomTypeIcon roomType={roomType} />
      </div>
      <span className="inline-block h-1 w-1 rounded-full bg-btn-primary" />
      <p className="text-xs font-light text-paragraph-secondary">
        {moment(createdAt).fromNow()}
      </p>
    </div>
  );
};

export default RoomCardHeader;
