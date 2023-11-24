"use client";
import React from "react";
import Room from "@/components/room";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";

const RoomCard = () => {
  const rooms = useAppSelector((state) => state.room.Room);
  const { data, isLoading } = useQuery(
    ["rooms"],
    () => userApis.getAllRooms(),
    {},
  );

  if (data) {
    console.log("query data", data);
  }

  return (
    <section className="mt-7 flex flex-col gap-10 px-20 ">
      {rooms &&
        rooms.length > 0 &&
        rooms?.map((room, index) => <Room {...room} key={index} />)}
    </section>
  );
};

export default RoomCard;