import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { membersTypes } from "@/types/room";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/hooks/reduxHooks";
const UserListOptionCard = dynamic(() => import("./UserListOptionCard"), {
  loading: () => (
    <div className="flex w-48 flex-col gap-2 px-3 py-3">
      <div className="h-9 w-full  rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
      <div className="h-9 w-full rounded bg-Main-background" />
    </div>
  ),
});

const UserAvatarWithPopOver = dynamic(
  () => import("../Resuable/UserAvatarWithPopOver"),
  {
    loading: () => (
      <div className="flex h-10 w-10 animate-pulse rounded-full bg-Main-background" />
    ),
  },
);

interface UserCardListProps extends membersTypes {
  roomRole: "admin" | "moderator" | "member";
  self?: boolean;
}

const UserCardList: React.FC<UserCardListProps> = ({
  _id,
  fullName,
  profilePic,
  username,
  verified,
  roomRole,
  self,
}) => {
  const user = useAppSelector((state) => state.auth);
  return (
    <div className="flex px-4 py-3 hover:bg-secondary-hover">
      <UserAvatarWithPopOver
        ImageLink={profilePic}
        fallback={fullName.slice(0, 2)}
        username={username}
      />
      <div className="ml-2 flex-1 ">
        <h1 className="font-Helvetica flex  items-center  text-sm font-normal  text-Paragraph-primary">
          <p className="mr-2 overflow-hidden  overflow-ellipsis whitespace-nowrap  ">
            {fullName}
          </p>
          {/* <span className="text-paragraph-secondary ml-2 inline-block rounded-full border  border-secondary-color bg-Secondary-background px-2 py-[1px] text-xs">
            Admin
          </span> */}
          {roomRole === "admin" && (
            <span className="ml-1 inline-block rounded-full border border-primary-color bg-green-500  px-2 py-[2px] text-xs leading-none text-Header-secondary ">
              Owner
            </span>
          )}
          {self && (
            <span className="ml-1 inline-block rounded-full border border-primary-color   bg-Input-background  px-2 py-[2px] text-xs leading-none text-Header-secondary ">
              You
            </span>
          )}
        </h1>
        <h4 className="mt-px text-xs font-normal tracking-wide text-neutral-400">
          @{username}
        </h4>
      </div>
      {user.id !== _id && (
        <Popover>
          <PopoverTrigger asChild>
            <div className=" my-auto  flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border  border-neutral-700 transition-colors duration-300 ease-linear hover:bg-neutral-700">
              <BsThreeDotsVertical className="text-neutral-300" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="mr-6 h-fit w-fit overflow-hidden border-secondary-color bg-Secondary-background p-0">
            <ul className="list-none">
              <UserListOptionCard id={_id} />
            </ul>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default UserCardList;
