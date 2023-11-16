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
  return (
    <div className="  flex py-2 px-3 hover:bg-neutral-600">
      <Avatar className="w-10 h-10">
        <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtemBCO2OhcBqzCqMAYD8lPrguhdxVd4Ff4_vE7mKn_BEEs=s1000-c" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="ml-2 w-full">
        <div className="flex items-center gap-3">
          <h4 className="text-neutral-100 text-sm font-medium w-1/2 overflow-hidden whitespace-nowrap overflow-ellipsis   ">
            Dipu chaurasiya
          </h4>
        </div>

        <div className=" relative ">
          <p className="text-neutral-200 line-clamp-3  w-full block  font-light pb-2  break-words text-xs mr-3   ">
            this is a t djf pdif oduf o udof oudof do u ofdijf oodus io sudfai
            odufoa efa oueo te
            <span className="">
              <span className="px-3">
                {" "}
                <span className="opacity-0 text-xs">
                  {" "}
                  {new Date().toLocaleDateString()}
                </span>{" "}
              </span>
            </span>
          </p>
          <div className=" w-full flex justify-end absolute  right-5 bottom-1 ">
            <span className="text-[0.65rem] text-neutral-200 font-extralight ">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;
