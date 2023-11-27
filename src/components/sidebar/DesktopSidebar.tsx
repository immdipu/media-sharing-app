/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Component from "./sidebar_component/Sidebarcomponent";

import Link from "next/link";

const DesktopSidebar = () => {
  return (
    <div className="bg-_black_bg border-r-third-color fixed inset-y-0 w-56 border-r-[0.2px]  bg-Main-background">
      <Component />
      <div className="absolute bottom-8 left-0 right-0 text-center">
        {/* <Link
          href={"/supporter"}
          className="text-sm   font-medium text-blue-600 opacity-80 hover:underline"
        >
          Become a supporter
        </Link> */}
      </div>
    </div>
  );
};

export default DesktopSidebar;
