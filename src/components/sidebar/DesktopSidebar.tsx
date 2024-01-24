/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import Component from "./sidebar_component/Sidebarcomponent";
import Dialog from "@/components/Dialog/index";
import MessageSidebar from "./MessageSidebar/MessageSidebar";
import Feeback from "@/components/feeback";
import { usePathname } from "next/navigation";

const DesktopSidebar = () => {
  const pathname = usePathname();
  if (pathname === "/chat" || /\/chat\/\w+/.test(pathname)) {
    return (
      <div className="bg-_black_bg fixed inset-y-0 w-80 border-r-[0.2px] border-r-third-color  bg-Main-background">
        <MessageSidebar />
      </div>
    );
  }

  return (
    <div className="bg-_black_bg fixed inset-y-0 w-56 border-r-[0.2px] border-r-third-color  bg-Main-background">
      <Component />
      <div className="absolute bottom-8 left-0 right-0 text-center">
        {/* <Link
          href={"/supporter"}
          className="text-sm   font-medium text-blue-600 opacity-80 hover:underline"
        >
          Become a supporter
        </Link> */}

        <Dialog
          button={
            <p className="text-sm   font-medium text-blue-600 opacity-80 hover:underline">
              Report an issue
            </p>
          }
          title="Report an issue"
          description="Please describe the issue you are facing"
          data={<Feeback />}
        />
      </div>
    </div>
  );
};

export default DesktopSidebar;
