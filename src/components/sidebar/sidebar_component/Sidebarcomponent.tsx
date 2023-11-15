"use client";
import React from "react";
import useSidebarRoutes from "@/hooks/useRoutes";
import SingleComponent from "./SingleComponent";
import { useAppSelector } from "@/hooks/reduxHooks";
import { DesktopSingleComponentProps } from "./SingleComponent";

const Sidebarcomponent = () => {
  const routes = useSidebarRoutes(),
    user = useAppSelector((state) => state.auth);
  return (
    <div className="relative">
      <h1 className="text-_white font-Helvetica text-2xl font-bold tracking-wider pl-7 mt-8">
        ShowMania
      </h1>
      <section className="mt-14 flex flex-col gap-6">
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
