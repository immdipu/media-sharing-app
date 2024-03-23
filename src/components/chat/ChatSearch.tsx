import React from "react";
import { Input } from "../ui/input";
import { IoSearchOutline } from "react-icons/io5";

const ChatSearch = () => {
  return (
    <div className=" flex w-full items-center rounded-full bg-Secondary-background px-3 pr-4 ">
      <Input
        placeholder="Search"
        className=" border-none  bg-Secondary-background text-paragraph-secondary outline-none placeholder:font-light placeholder:text-Paragraph-primary"
      />{" "}
      <IoSearchOutline className="text-2xl text-Header-secondary" />
    </div>
  );
};

export default ChatSearch;
