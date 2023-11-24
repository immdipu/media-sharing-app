"use client";
import React, { useEffect } from "react";
import UserCardList from "@/components/card/UserCard.List";
import { useAppSelector } from "@/hooks/reduxHooks";

const UsersTab = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);

  return (
    <div>
      <h3 className="light:text-neutral-900 my-2 mt-4 px-5 text-Header-primary  dark:text-neutral-50 ">
        Members
      </h3>
      <section className="flex flex-col">
        {JoinedRoom?.members?.map((user, index) => {
          return <UserCardList key={index} {...user} />;
        })}
      </section>
    </div>
  );
};

export default UsersTab;
