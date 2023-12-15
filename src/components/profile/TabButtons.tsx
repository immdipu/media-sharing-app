import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { Role } from "@/types/role";

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
  const [activeTab, setActiveTab] = useState(TabName ?? "edit");
  // const Buttons = ["About", "Edit Profile", "Friends", "Account Settings"];
  const Buttons = ["Edit Profile"];

  useEffect(() => {
    setActiveTab(TabName ?? "edit");
  }, [TabName]);

  return (
    <>
      <div className=" relative mx-11 flex flex-wrap gap-8 bg-Secondary-background pl-8 max-md:gap-3">
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
                "hover:text-_sidenav_bg hover:bg-_blue cursor-pointer  rounded-lg px-2  text-sm transition-all duration-200 ease-linear hover:shadow-lg max-md:text-xs",
                activeTab === item.split(" ").join("").toLowerCase()
                  ? "bg-_blue text-_sidenav_bg"
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
