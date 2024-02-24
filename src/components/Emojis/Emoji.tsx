import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface EmojiProps {
  className?: string;
  link: string;
  alt: string;
  onclick: (emoji: string) => void;
  code: string;
  myReaction?: boolean;
}

const Emoji: React.FC<EmojiProps> = ({
  className,
  link,
  alt,
  onclick,
  code,
  myReaction,
}) => {
  return (
    <Avatar
      onClick={() => {
        onclick(code);
      }}
      className={cn(" relative hover:bg-Main-background", className)}
    >
      <AvatarImage src={link} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default Emoji;
