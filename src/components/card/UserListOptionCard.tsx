import React from "react";
import { MdBlock } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";
import { RiAdminFill } from "react-icons/ri";
import { MdAddModerator } from "react-icons/md";

const UserListOptionCard = () => {
  return (
    <>
      <li className=" flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <RiAdminFill className="text-lg text-green-600" />{" "}
        <span className="text-sm text-Paragraph-primary">
          Transfer Ownership
        </span>
      </li>
      <li className=" flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <MdAddModerator className="text-lg text-blue-700" />{" "}
        <span className="text-sm text-Paragraph-primary">Add as moderator</span>
      </li>
      <li className=" flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <MdBlock className="text-lg text-red-600" />{" "}
        <span className="text-sm text-Paragraph-primary">Block User</span>
      </li>
      <li className="flex items-center gap-3 px-4 py-2 hover:bg-Main-background">
        <IoExitOutline className="text-lg text-red-600" />{" "}
        <span className="text-sm text-Paragraph-primary">Kick out</span>
      </li>
      <li className="flex items-center gap-3 px-4 py-3 hover:bg-Main-background">
        <SlUserFollow className="text-base text-Paragraph-primary" />{" "}
        <span className="text-sm text-Paragraph-primary">Follow</span>
      </li>
    </>
  );
};

export default UserListOptionCard;
