"use client";
import React from "react";
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { BiLogOutCircle } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LoggedOut } from "@/redux/slice/authSlice";
import clsx from "clsx";
import Link from "next/link";

const Avatar = () => {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          user.isUserAuthenticated
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className=" rounded-full border-2 border-primary-color">
          <AvatarContainer className="h-12 w-12">
            {user.profilePic && (
              <AvatarImage src={user.profilePic} alt="@shadcn" />
            )}
            <AvatarFallback className="uppercase text-Header-primary">
              {user.fullName?.slice(0, 2)}
            </AvatarFallback>
          </AvatarContainer>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-primary-color bg-Secondary-background outline-none">
        <DropdownMenuLabel className="font-medium text-Header-primary">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="h-px bg-Main-background opacity-70" />
        <DropdownMenuItem className="text-Paragraph-primary">
          <Link href={`profile/${user.username}`}>Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="h-px bg-Main-background opacity-40" />
        <DropdownMenuItem
          className="group text-Paragraph-primary"
          onClick={() => {
            dispatch(LoggedOut());
          }}
        >
          Log out{" "}
          <DropdownMenuShortcut>
            <BiLogOutCircle className="text-Header- text-lg  group-hover:text-btn-primary" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Avatar;
