"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { Home, Mail, User } from "lucide-react";
import { BsPersonCircle } from "react-icons/bs";
import { useAppSelector } from "./reduxHooks";

const useRoutes = () => {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth);
  const routes = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
        icon: Home,
        active: pathname === "/",
      },
      {
        label: "Chat",
        href: `/chat`,
        icon: Mail,
        active: pathname === `/chat`,
      },
      {
        label: "Profile",
        href: `/profile/${user?.username}`,
        icon: User,
        active: pathname === `/profile/${user?.username}`,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, user.isUserAuthenticated],
  );

  return routes;
};

export default useRoutes;
