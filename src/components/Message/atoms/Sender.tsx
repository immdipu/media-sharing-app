import React from "react";
import { cn } from "@/lib/utils";

interface SenderProps {
  name: string;
  className?: string;
}

const Sender: React.FC<SenderProps> = ({ name, className }) => {
  return (
    <h4
      className={cn(
        "light:text-green-500 l h-fit max-w-[180px] overflow-hidden  overflow-ellipsis whitespace-nowrap  text-sm font-medium capitalize leading-none  text-Header-secondary ",
        className,
      )}
    >
      {name}
    </h4>
  );
};

export default Sender;
