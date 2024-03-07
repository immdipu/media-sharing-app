import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";

const AvatarCard: React.FC<membersTypes> = ({
  _id,
  fullName,
  profilePic,
  username,
  verified,
}) => {
  return (
    <div className="   flex w-32 flex-col items-center">
      <UserAvatarWithPopOver
        ImageLink={profilePic}
        fallback={fullName}
        username={username}
        className="h-24 w-24"
      />
    </div>
  );
};

export default AvatarCard;
