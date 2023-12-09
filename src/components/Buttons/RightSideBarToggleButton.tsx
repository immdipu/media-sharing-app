"use client";
import React from "react";
import { BsTextLeft } from "react-icons/bs";
import { SearchContext } from "@/context/GlobalProvider";

const RightSideBarToggleButton = ({ allProps }: any) => {
  const { showRightSideBar, setShowRightSideBar } = allProps;
  return (
    <button
      onClick={() => {
        setShowRightSideBar(!showRightSideBar);
      }}
      className="ml-4 hidden h-full w-fit rounded-full p-2  active:bg-neutral-600  max-md:block"
    >
      <BsTextLeft className=" text-2xl text-neutral-300" />
    </button>
  );
};

export default RightSideBarToggleButton;
