"use client";
import React, { useState, useContext } from "react";
import { BiCategory } from "react-icons/bi";
import DesktopSidebar from "./DesktopSidebar";
import clsx from "clsx";
import { SearchContext } from "@/context/GlobalProvider";

const MobileSidebar = () => {
  const GlobalContext = useContext(SearchContext);
  return (
    <>
      <div
        className={clsx(
          "first-letter fixed z-[52]  hidden w-56 shrink-0 transition-all duration-100 ease-in-out max-md:block",
          GlobalContext?.showSider ? "left-0" : "-left-60",
        )}
      >
        <DesktopSidebar />
      </div>
      {GlobalContext?.showSider && (
        <div
          onClick={() =>
            GlobalContext?.setShowSidebar(!GlobalContext.showSider)
          }
          className="fixed inset-0 z-[51] hidden h-full w-full items-center  justify-between bg-neutral-950 bg-opacity-50 px-3 max-md:flex"
        />
      )}
    </>
  );
};

export default MobileSidebar;
