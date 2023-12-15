import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

interface TabButtonsProps {
  username: string;
  ownprofile: boolean;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  username,
  ownprofile = false,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const TabName = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(TabName ?? "editprofile");
  // const Buttons = ["About", "Edit Profile", "Friends", "Account Settings"];
  const Buttons = ["Edit Profile"];

  useEffect(() => {
    setActiveTab(TabName ?? "editprofile");
  }, [TabName]);

  return (
    <>
      <div className=" relative mx-11 flex h-16 flex-wrap items-center gap-8 bg-Secondary-background pl-8 max-md:gap-3">
        {Buttons.filter((item) => {
          if (item === "Edit Profile") return ownprofile;
          return true;
        }).map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                router.push(
                  `/profile/${username}?tab=${item
                    .split(" ")
                    .join("")
                    .toLowerCase()}`,
                );
              }}
              className={clsx(
                "h-fit cursor-pointer rounded-md px-2 py-1  text-sm transition-all  duration-200 ease-linear hover:text-button-primary hover:opacity-90 hover:shadow-lg max-md:text-xs",
                activeTab === item.split(" ").join("").toLowerCase()
                  ? "bg-button-background text-button-primary"
                  : "",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TabButtons;
