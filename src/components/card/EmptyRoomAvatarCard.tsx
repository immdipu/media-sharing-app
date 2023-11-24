import React from "react";
import { GiEmptyChessboard } from "react-icons/gi";

const EmptyRoomAvatarCard = () => {
  return (
    <div className=" mr-4 grid h-24 w-24 place-content-center overflow-hidden rounded-full border border-primary-color">
      <GiEmptyChessboard className="text-9xl text-button-primary opacity-30 transition-opacity duration-500 ease-linear hover:opacity-80" />
    </div>
  );
};

export default EmptyRoomAvatarCard;
