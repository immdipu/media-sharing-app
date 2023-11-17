"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

const AvatarCard = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="   flex w-32 flex-col items-center">
      <Avatar className="h-24 w-24">
        <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtemBCO2OhcBqzCqMAYD8lPrguhdxVd4Ff4_vE7mKn_BEEs=s1000-c" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Tooltip delayDuration={400}>
        <TooltipTrigger
          onClick={() => {
            setTheme("darkTheme");
          }}
          className="w-32 overflow-hidden overflow-ellipsis whitespace-nowrap px-3 text-sm font-light text-neutral-200"
        >
          {" "}
          {theme}
        </TooltipTrigger>
        <TooltipContent>
          <p>Dipu chaurasiya</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AvatarCard;
