import React from "react";
import { cn } from "@/lib/utils";

interface IShareButton {
  isSharing: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ShareButton: React.FC<IShareButton> = ({
  disabled,
  isSharing,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "ml-2  h-10 rounded-md p-2 text-sm text-neutral-100 transition-all  duration-300   ease-linear hover:opacity-80 active:scale-95 disabled:bg-neutral-500 disabled:opacity-30",
        isSharing ? "bg-red-500 text-neutral-50" : "bg-green-600",
        className,
      )}
    >
      {isSharing ? "Sharing" : "Share"}
    </button>
  );
};

export default ShareButton;
