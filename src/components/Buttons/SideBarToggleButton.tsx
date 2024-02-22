"use client";
import React from "react";
import { BsTextLeft } from "react-icons/bs";
import { SearchContext } from "@/context/GlobalProvider";

const SideBarToggleButton = () => {
  const GlobalContext = React.useContext(SearchContext);
  return (
    <button
      onClick={() => {
        GlobalContext?.setShowSidebar(!GlobalContext.showSider);
      }}
      className="hidden h-full w-fit rounded-full border p-2  active:bg-neutral-600  max-md:block"
    >
      <BsTextLeft className=" text-2xl text-neutral-300" />
    </button>
  );
};

export default SideBarToggleButton;
