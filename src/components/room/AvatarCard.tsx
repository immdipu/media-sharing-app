import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AvatarCard = () => {
  return (
    <div className="   flex flex-col items-center w-32">
      <Avatar className="w-24 h-24">
        <AvatarImage src="https://lh3.googleusercontent.com/a/AAcHTtemBCO2OhcBqzCqMAYD8lPrguhdxVd4Ff4_vE7mKn_BEEs=s1000-c" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Tooltip delayDuration={400}>
        <TooltipTrigger className="text-sm text-neutral-200 px-3 font-light w-32 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {" "}
          Dipu chaurasiya dfa ldjf olhdf odjf{" "}
        </TooltipTrigger>
        <TooltipContent>
          <p>Dipu chaurasiya</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default AvatarCard;
