import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import moment from "moment";

const SingleChatList = () => {
  const date = new Date();
  return (
    <div className="mx-1 flex h-16 items-center rounded-md  py-2 pl-2  hover:bg-Secondary-background">
      <UserAvatarWithPopOver
        ImageLink="https://avatars.githubusercontent.com/u/103568666?v=4"
        username="immdipu"
        fallback="Dipu"
        className="h-14 w-14"
      />
      <div className="h-full cursor-default pr-3 ">
        <div className="flex flex-nowrap items-center justify-between">
          <h1 className="ml-2 line-clamp-1 text-sm font-medium text-Header-primary">
            Dipu chaurasiya
          </h1>
          <p className=" shrink-0 select-none text-xs font-light leading-none text-Paragraph-primary">
            {moment(date).format("hh:mm A")}
          </p>
        </div>

        <p className="ml-2 mt-px line-clamp-1 select-none text-xs font-light text-Paragraph-primary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, quas, voluptatibus repellendus, quos eum
        </p>
      </div>
    </div>
  );
};

export default SingleChatList;
