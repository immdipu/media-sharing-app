"use client";
import React, { useEffect } from "react";
import UserCardList from "@/components/card/UserCard.List";

const index = () => {
  return (
    <div>
      <h3 className="light:text-neutral-900 my-2 mt-4 px-5 text-Header-primary  dark:text-neutral-50 ">
        Members
      </h3>
      <section className="flex flex-col">
        <UserCardList />
        <UserCardList />
        <UserCardList />
        <UserCardList />
        <UserCardList />
        <UserCardList />

        <UserCardList />
      </section>
    </div>
  );
};

export default index;
