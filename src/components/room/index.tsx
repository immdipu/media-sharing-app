"use client";
import AvatarCard from "./AvatarCard";
import React from "react";
import TitleLogo from "../Icons/TitleLogo";
import { Button } from "../ui/button";
import { RoomTypes } from "@/types/room";
import { useRouter } from "next/navigation";
import EmptyRoomAvatarCard from "../card/EmptyRoomAvatarCard";
import Link from "next/link";

const Room: React.FC<RoomTypes> = ({
  admin,
  bannedUsers,
  createdAt,
  _id,
  members,
  membersLimit,
  moderators,
  name,
}) => {
  const router = useRouter();

  const renderEmptyCards = (count: number) => {
    const EmtpyCards = [];
    for (let i = 0; i < count; i++) {
      EmtpyCards.push(<EmptyRoomAvatarCard key={i} />);
    }
    return EmtpyCards;
  };

  return (
    <div className="flex w-full flex-col rounded-xl   border border-neutral-500 bg-neutral-700 px-5 py-2">
      <h4 className="mb-3 flex items-center gap-2 font-medium text-neutral-50">
        <TitleLogo color="#ffffff" opacity={0.2} /> {name}
      </h4>
      <section className="flex gap-1 overflow-clip">
        {members &&
          members.length > 0 &&
          members?.map((member, index) => (
            <AvatarCard {...member} key={index} />
          ))}
        {members &&
          members.length > 0 &&
          renderEmptyCards(membersLimit - members.length)}

        {members && members.length === 0 && renderEmptyCards(10)}
      </section>
      <section className="my-3">
        <Link href={`/room/${_id}`} className="block w-full">
          <Button variant={"secondary"} className="mt-3 w-full text-lg">
            Join
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Room;
