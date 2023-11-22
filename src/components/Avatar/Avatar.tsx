"use client";
import React from "react";
import {
  Avatar as AvatarContainer,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useAppSelector } from "@/hooks/reduxHooks";

const Avatar = () => {
  const user = useAppSelector((state) => state.auth);
  console.log("user", user);
  return (
    <div>
      <AvatarContainer>
        <AvatarImage src={user.profilePic} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </AvatarContainer>
    </div>
  );
};

export default Avatar;
