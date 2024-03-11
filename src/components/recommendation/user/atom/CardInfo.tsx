import React from "react";

interface ICardInfor {
  fullName: string;
  username: string;
}

const CardInfo: React.FC<ICardInfor> = ({ fullName, username }) => {
  return (
    <div
      data-tooltip={fullName}
      data-tooltip-position="bottom"
      className="tooltip w-full"
    >
      <h1 className="tooltip  overflow-hidden overflow-ellipsis whitespace-nowrap   capitalize leading-none text-Header-primary">
        {fullName}
      </h1>
      <p className="text-xs  text-paragraph-secondary">@{username}</p>
    </div>
  );
};

export default CardInfo;
