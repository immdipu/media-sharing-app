import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { ToggleRightSidebar } from "@/redux/slice/chatSlice";

interface ChatTopBarProps {
  profilePic: string;
  username: string;
  fullName: string;
}

const ChatTopbar: React.FC<ChatTopBarProps> = ({
  fullName,
  profilePic,
  username,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="h-16 bg-Secondary-background">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profilePic} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>

          <div className="ml-2 flex flex-col">
            <span className="text-Secondary-text text-base font-medium text-Header-primary">
              {fullName}
            </span>
            <span className="text-sm font-normal text-paragraph-secondary">
              Online
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-end gap-4 ">
            <button className=" mr-9 grid h-9 w-9 shrink-0 place-content-center rounded-full  duration-300 hover:bg-secondary-hover">
              <IoSearchOutline className="text-xl text-neutral-300" />
            </button>
            <button
              onClick={() => {
                dispatch(ToggleRightSidebar());
              }}
              className="shrink-0 rounded-full border border-secondary-color bg-Secondary-background p-2 transition-transform duration-150 ease-linear hover:bg-Main-background active:scale-75  "
            >
              <BsThreeDotsVertical className="text-lg text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTopbar;
