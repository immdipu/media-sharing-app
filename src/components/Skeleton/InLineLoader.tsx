import React from "react";
import { cn } from "@/lib/utils";

interface InLineLoaderProps {
  isLoading: boolean;
  className?: string;
}

const InLineLoader: React.FC<InLineLoaderProps> = ({
  isLoading,
  className,
}) => {
  return (
    <div
      className={cn(
        "  h-[3px] w-full overflow-hidden bg-blue-300 opacity-0",
        className,
        isLoading && "opacity-100",
      )}
    >
      <div className="lineLoader h-full  w-[80%] bg-opacity-100"></div>
    </div>
  );
};

export default InLineLoader;
