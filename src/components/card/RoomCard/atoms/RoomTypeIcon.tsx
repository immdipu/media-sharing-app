import React from "react";
import { FcGlobe, FcLock, FcConferenceCall } from "react-icons/fc";
interface RoomTypeIconProps {
  roomType: RoomType;
}

const RoomTypeIcon: React.FC<RoomTypeIconProps> = ({ roomType }) => {
  if (roomType === "PUBLIC") {
    return <FcGlobe className="tooltip text-2xl text-btn-primary" />;
  }

  if (roomType === "PRIVATE") {
    return <FcLock className="text-2xl text-btn-primary" />;
  }

  if (roomType === "FRIEND") {
    return <FcConferenceCall className="text-2xl text-btn-primary" />;
  }

  return null;
};

export default RoomTypeIcon;
