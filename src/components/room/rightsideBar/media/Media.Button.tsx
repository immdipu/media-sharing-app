import { cn } from "@/lib/utils";
import React from "react";

interface MediaButtonProps {
  title: string;
  icon: any;
  onClick: () => void;
  className?: string;
}

const MediaButton: React.FC<MediaButtonProps> = ({
  icon: Icon,
  onClick,
  title,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full flex-col items-center rounded-md border border-third-color bg-third-background py-3 transition-all duration-200 ease-linear hover:border-secondary-color hover:bg-Secondary-background"
    >
      <Icon className={cn("overflow-hidden  text-3xl ", className)} />
      <p className="mt-2 text-xs font-medium  text-Header-secondary">{title}</p>
    </button>
  );
};

export default MediaButton;
