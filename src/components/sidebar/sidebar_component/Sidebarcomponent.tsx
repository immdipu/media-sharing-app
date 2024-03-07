"use client";
import React from "react";
import useSidebarRoutes from "@/hooks/useRoutes";
import SingleComponent from "./SingleComponent";
import { useAppSelector } from "@/hooks/reduxHooks";
import { DesktopSingleComponentProps } from "./SingleComponent";

import { APP_NAME } from "@/lib/constants";

const Sidebarcomponent = () => {
  const routes = useSidebarRoutes(),
    user = useAppSelector((state) => state.auth);
  return (
    <div className="relative ">
      <h1 className="font-Helvetica relative mt-8 pl-7 text-xl font-bold tracking-wider text-Header-primary">
        {APP_NAME}
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
