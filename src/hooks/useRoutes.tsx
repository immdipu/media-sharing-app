import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { RiMovie2Line } from "react-icons/ri";
import { BiHelpCircle, BiMessageSquareDots } from "react-icons/bi";
import { SiAirplayvideo } from "react-icons/si";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        lable: "Home",
        path: "/",
        Icon: MdExplore,
        active: pathname === "/",
      },
      {
        label: "Chat",
        href: `/chat`,
        icon: BiMessageSquareDots,
        active: pathname === `/chat`,
      },
      {
        label: "Profile",
        href: `/profile/${user?.username}`,
        icon: BsPersonCircle,
        active: pathname === `/profile/${user?.username}`,
      },
    ],
    [pathname]
  );

  return <div>useRoutes</div>;
};

export default useRoutes;
