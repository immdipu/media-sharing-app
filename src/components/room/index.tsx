"use client";
import AvatarCard from "./AvatarCard";
import React from "react";
import TitleLogo from "./TitleLogo";
import { Button } from "../ui/button";
import { RoomTypes } from "@/types/room";

const index: React.FC<RoomTypes> = ({
  admin,
  bannedUsers,
  createdAt,
  id,
  members,
  membersLimit,
  moderators,
  name,
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl  border border-neutral-500 bg-neutral-700 px-5 py-2">
      <h4 className="mb-3 flex items-center gap-2 font-medium text-neutral-50">
        <TitleLogo color="#ffffff" opacity={0.2} /> {name}
      </h4>
      <section className="flex gap-1 overflow-hidden">
        {members &&
          members.length > 0 &&
          members?.map((member, index) => (
            <AvatarCard {...member} key={index} />
          ))}
      </section>
      <section className="my-3">
        <Button variant={"secondary"} className="mt-3 w-full text-lg">
          Join
        </Button>
      </section>
    </div>
  );
};

export default index;
