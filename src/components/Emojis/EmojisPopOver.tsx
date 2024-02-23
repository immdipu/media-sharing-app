import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Emoji from "./Emoji";

interface EmojisPopOverProps {
  children: React.ReactNode;
}

const EmojisPopOver: React.FC<EmojisPopOverProps> = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="border-secondary-color bg-Secondary-background px-3">
        <Emoji />
      </PopoverContent>
    </Popover>
  );
};

export default EmojisPopOver;
