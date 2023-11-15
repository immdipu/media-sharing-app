import React from "react";
import Link from "next/link";
import clsx from "clsx";

export interface DesktopSingleComponentProps {
  href: string;
  icon: any;
  active: boolean;
  label: string;
}

const SingleComponent: React.FC<DesktopSingleComponentProps> = ({
  href,
  active,
  icon: Icon,
  label,
}) => {
  return (
    <>
      <Link
        href={href}
        className={clsx(
          " font-Helvetica gap-3 font-normal tracking-wider flex border-l-4 rounded-md hover:bg-blue-300 hover:bg-opacity-10  px-6  py-2 items-center",
          active
            ? "text-white border-blue-500 "
            : "text-_light_white border-transparent"
        )}
      >
        <Icon
          className={clsx(
            "text-2xl",
            active ? "text-blue-500 " : "text-_light_white "
          )}
        />
        <p>{label}</p>
      </Link>
    </>
  );
};

export default SingleComponent;
