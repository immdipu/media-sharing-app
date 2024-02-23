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
          " font-Helvetica flex items-center gap-3 rounded-md border-l-4 px-6 py-2 text-sm  font-normal  tracking-wider  hover:bg-blue-300 hover:bg-opacity-10",
          active
            ? "border-blue-500 bg-blue-500 bg-opacity-10 font-bold text-Paragraph-primary"
            : "text- border-transparent text-paragraph-secondary opacity-70",
        )}
      >
        <Icon
          className={clsx(
            "text-2xl",
            active ? "text-blue-500 " : "text-paragraph-secondary ",
          )}
        />
        <p
          className={clsx(
            " font-medium ",
            active
              ? "text-btn-primary font-medium"
              : "text-btn-secondary font-normal",
          )}
        >
          {label}
        </p>
      </Link>
    </>
  );
};

export default SingleComponent;
