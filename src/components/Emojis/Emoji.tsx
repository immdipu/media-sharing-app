import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface EmojiProps {
  className?: string;
  link: string;
  alt: string;
  onclick?: () => void;
}

const Emoji: React.FC<EmojiProps> = ({ className, link, alt, onclick }) => {
  return (
    <Avatar
      onClick={onclick}
      className={cn(" relative hover:bg-Main-background", className)}
    >
      <AvatarImage src={link} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default Emoji;
