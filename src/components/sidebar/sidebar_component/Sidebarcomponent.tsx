"use client";
import React from "react";
import SingleComponent from "./SingleComponent";
import { useAppSelector, useRoutes } from "@/hooks";
import { APP_NAME } from "@/lib/constants";
import Logo from "@/components/Icons/Logo";
import Link from "next/link";

const Sidebarcomponent = () => {
  const routes = useRoutes(),
    user = useAppSelector((state) => state.auth);
  return (
    <div className="relative ">
      <br />
      <br />
      <Link href={"/"}>
        <Logo />
      </Link>

      {/* <h1 className="font-Helvetica relative mt-8 pl-7 text-xl font-bold tracking-wider text-Header-primary">
        {APP_NAME}
      </h1> */}
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
