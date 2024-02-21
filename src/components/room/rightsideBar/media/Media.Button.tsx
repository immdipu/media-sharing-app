import React from "react";

interface MediaButtonProps {
  title: string;
  icon: any;
  onClick: () => void;
}

const MediaButton: React.FC<MediaButtonProps> = ({
  icon: Icon,
  onClick,
  title,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex h-full w-full flex-col items-center rounded-md border border-third-color bg-third-background py-3 transition-all duration-200 ease-linear hover:border-secondary-color hover:bg-Secondary-background"
    >
      <Icon className="overflow-hidden  text-3xl text-neutral-200" />
      <p className="textsm font-medium  text-Header-secondary">{title}</p>
    </button>
  );
};

export default MediaButton;
