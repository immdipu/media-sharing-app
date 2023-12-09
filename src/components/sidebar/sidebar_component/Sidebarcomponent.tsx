"use client";
import React from "react";
import useSidebarRoutes from "@/hooks/useRoutes";
import SingleComponent from "./SingleComponent";
import { useAppSelector } from "@/hooks/reduxHooks";
import { DesktopSingleComponentProps } from "./SingleComponent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidebarcomponent = () => {
  const routes = useSidebarRoutes(),
    user = useAppSelector((state) => state.auth);
  return (
    <div className="relative ">
      <h1 className="font-Helvetica relative mt-8 pl-7 text-xl font-bold tracking-wider text-Header-primary">
        MediaSharing
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <span className=" absolute -top-1 rounded-sm bg-blue-500 px-1 py-1 text-[10px] font-medium  leading-none">
              Beta
            </span>
            <TooltipContent className="border-secondary-color bg-Secondary-background font-normal text-Paragraph-primary">
              <p>
                This is beta version and
                <br />
                this website is still under development.
              </p>
            </TooltipContent>
          </TooltipTrigger>
        </Tooltip>
      </h1>
      <section className="mt-14 flex flex-col gap-6 ">
        {routes.map((item: DesktopSingleComponentProps) => {
          if (item.label === "Profile" && !user.isUserAuthenticated)
            return null;
          return (
            <SingleComponent
              key={item.label}
              href={item.href}
              label={item.label}
              active={item.active}
              icon={item.icon}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Sidebarcomponent;
