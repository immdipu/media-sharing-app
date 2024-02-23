import React from "react";
import { GiEmptyChessboard } from "react-icons/gi";

const EmptyRoomAvatarCard = () => {
  return (
    <div className=" mr-4 grid h-24 w-24 shrink-0  place-content-center overflow-hidden rounded-full border border-primary-color">
      <GiEmptyChessboard className="text-btn-secondary text-9xl opacity-20 transition-opacity duration-500 ease-linear hover:opacity-80" />
    </div>
  );
};

export default EmptyRoomAvatarCard;
