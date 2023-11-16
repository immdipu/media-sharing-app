"use client";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

const SingleMessage = () => {
  React.useEffect(() => {
    document.body.classList.add("light");
  }, []);

  return (
    <div className="  flex px-3 py-2 hover:bg-neutral-600">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtemBCO2OhcBqzCqMAYD8lPrguhdxVd4Ff4_vE7mKn_BEEs=s1000-c" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-2 w-full">
        <div className="flex items-center gap-3">
          <h4 className="light:text-green-500 w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-medium text-neutral-100  dark:text-blue-700  ">
            Dipu chaurasiya
          </h4>
        </div>

        <div className=" relative ">
          <p className="mr-3 line-clamp-3  block w-full  break-words pb-2  text-xs font-light text-neutral-200   ">
            this is a t djf pdif oduf o udof oudof do u ofdijf oodus io sudfai
            odufoa efa oueo te
            <span className="">
              <span className="px-3">
                {" "}
                <span className="text-xs opacity-0">
                  {" "}
                  {new Date().toLocaleDateString()}
                </span>{" "}
              </span>
            </span>
          </p>
          <div className=" absolute bottom-1 right-5 flex  w-full justify-end ">
            <span className="text-[0.65rem] font-extralight text-neutral-200 ">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
