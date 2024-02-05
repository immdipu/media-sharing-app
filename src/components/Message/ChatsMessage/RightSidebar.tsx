import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import clsx from "clsx";
const RightSidebar = () => {
  const { showRightSidebar } = useAppSelector((state) => state.chat);
  return (
    <div
      className={clsx(
        "h-screen shrink-0 overflow-hidden bg-Secondary-background transition-all duration-200 ease-in",
        showRightSidebar ? "w-96" : "w-0",
      )}
    >
      RightSidebar
    </div>
  );
};

export default RightSidebar;
