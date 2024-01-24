import React from "react";
import UserAvatarWithPopOver from "../Resuable/UserAvatarWithPopOver";
import moment from "moment";
import { SingleGetAllChatTypes } from "@/types/ApiResponseTypes";
import { useRouter } from "next/navigation";

const SingleChatList: React.FC<SingleGetAllChatTypes> = ({
  _id,
  createdAt,
  lastMessage,
  unreadMessagesCount,
  user,
}) => {
  const router = useRouter();
  const date = new Date(createdAt);
  return (
    <div
      onClick={() => {
        router.push(`/chat/${_id}`, {
          scroll: false,
        });
      }}
      className="mx-1 flex h-16 items-center rounded-md  py-2 pl-2  hover:bg-Secondary-background"
    >
      <UserAvatarWithPopOver
        ImageLink={user.profilePic}
        username={user.username}
        fallback={user.fullName}
        className="h-14 w-14"
      />
      <div className="h-full cursor-default pr-3 ">
        <div className="flex flex-nowrap items-center justify-between">
          <h1 className="ml-2 line-clamp-1 text-sm font-medium capitalize text-Header-primary">
            {user.fullName || user.username}
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
