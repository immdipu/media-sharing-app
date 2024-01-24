import React from "react";
import { MdMessage } from "react-icons/md";

import { useAppSelector } from "@/hooks/reduxHooks";
const MessageButton = () => {
  return (
    <button className="rounded-full border border-secondary-color px-2 py-2 hover:bg-secondary-hover">
      <MdMessage className="text-xl text-Paragraph-primary" />
    </button>
  );
};

export default MessageButton;
