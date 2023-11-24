"use client";
import React, { useEffect } from "react";
import Room from "@/components/room";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { RoomTypes } from "@/types/room";
import { AddAllRoom } from "@/redux/slice/roomSlice";

const RoomCard = () => {
  const rooms = useAppSelector((state) => state.room.Room);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery(
    ["rooms"],
    () => userApis.getAllRooms(),
    {},
  );

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        dispatch(AddAllRoom(data));
      }
    }
  });

  return (
    <section className="mt-7 flex flex-col gap-10 px-20 ">
      {rooms &&
        rooms.length > 0 &&
        rooms?.map((room, index) => <Room {...room} key={index} />)}
    </section>
  );
};

export default RoomCard;
