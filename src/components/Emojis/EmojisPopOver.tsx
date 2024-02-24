import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Emoji from "./Emoji";
import { EmojisCollection } from "@/lib/constants";

interface EmojisPopOverProps {
  children: React.ReactNode;
  setEmojis?: React.Dispatch<React.SetStateAction<boolean>>;
  showEmojis: boolean;
}

const EmojisPopOver: React.FC<EmojisPopOverProps> = ({
  children,
  setEmojis,
  showEmojis,
}) => {
  return (
    <Popover
      onOpenChange={(e) => {
        if (setEmojis) {
          setEmojis(e);
        }
      }}
      open={showEmojis}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="flex items-center justify-evenly gap-1 border-secondary-color bg-Secondary-background py-2  ">
        {EmojisCollection.map((emoji, index) => (
          <Emoji
            key={index}
            link={emoji.link}
            alt={emoji.alt}
            className="h-10 w-10 cursor-pointer rounded-full p-2  transition-all duration-300 ease-in-out hover:scale-125 hover:shadow-lg"
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default EmojisPopOver;
