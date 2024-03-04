"use client";
import React, { useEffect } from "react";
import UserCardList from "@/components/card/UserCard.List";
import { useAppSelector } from "@/hooks/reduxHooks";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";

const UsersTab = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const id = useAppSelector((state) => state.auth.id);

  return (
    <motion.div
      initial={tabAnimation.initial}
      animate={tabAnimation.animate}
      exit={tabAnimation.exit}
      transition={tabAnimation.transition}
      className="h-full pt-5"
    >
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
    </motion.div>
  );
};

export default UsersTab;
