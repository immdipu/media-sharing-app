import React from "react";
import { cn } from "@/lib/utils";

interface UserOptionSingleListProps {
  Icon: any;
  title: string;
  containerClass?: string;
  onClick?: () => void;
  iconClass?: string;
  titleClass?: string;
}

const UserOptionSingleList: React.FC<UserOptionSingleListProps> = ({
  Icon,
  title,
  containerClass,
  iconClass,
  onClick,
  titleClass,
}) => {
  return (
    <li
      className={cn(
        "flex items-center gap-3 px-4 py-3 hover:bg-Main-background",
        containerClass,
      )}
    >
      <Icon className={cn("text-lg ", iconClass)} />{" "}
      <span
        className={cn("text-sm font-normal text-Paragraph-primary", titleClass)}
      >
        {title}
      </span>
    </li>
  );
};

export default UserOptionSingleList;
