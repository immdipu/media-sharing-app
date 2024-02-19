"use client";
import React, { useEffect } from "react";
import UserCardList from "@/components/card/UserCard.List";
import { useAppSelector } from "@/hooks/reduxHooks";

const UsersTab = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const id = useAppSelector((state) => state.auth.id);

  return (
    <div className="h-full pt-5">
      <h3 className="light:text-neutral-900  px-5 text-Header-primary  dark:text-neutral-50 ">
        Members
      </h3>
      <section className="flex flex-col">
        {JoinedRoom?.moderators.map((user, index) => {
          return <UserCardList key={index} {...user} roomRole="moderator" />;
        })}
        {JoinedRoom?.members?.map((user, index) => {
          const isSelf = user._id === id;
          if (user._id === JoinedRoom.admin._id) {
            return (
              <UserCardList
                self={isSelf}
                key={index}
                {...user}
                roomRole="admin"
              />
            );
          }
          return (
            <UserCardList
              self={isSelf}
              key={index}
              {...user}
              roomRole="member"
            />
          );
        })}
      </section>
    </div>
  );
};

export default UsersTab;
