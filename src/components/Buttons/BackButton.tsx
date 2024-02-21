import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "@/components/ui/button";

interface IBackButton {
  onClick: () => void;
}

const BackButton: React.FC<IBackButton> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      data-tooltip="Close"
      data-tooltip-position="top"
      className="tooltip group mr-1 h-fit -translate-x-1  bg-transparent p-0"
    >
      <BiArrowBack className="text-xl opacity-70 group-hover:opacity-100" />
    </Button>
  );
};

export default BackButton;
