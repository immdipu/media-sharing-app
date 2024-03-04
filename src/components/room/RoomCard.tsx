"use client";
import React, { useEffect } from "react";
import Room from "@/components/room";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { AddAllRoom } from "@/redux/slice/roomSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const RoomCard = () => {
  const rooms = useAppSelector((state) => state.room.Room);
  const [parent, enableAnimations] = useAutoAnimate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery(
    ["rooms"],
    () => userApis.getAllRooms(),
    {
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2,
      enabled: true,
      refetchIntervalInBackground: true,
      refetchInterval: 8000,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        dispatch(AddAllRoom(data));
      }
    }
  });

  return (
    <section ref={parent} className="mt-7 flex flex-col  gap-10   ">
      {rooms &&
        rooms.length > 0 &&
        rooms?.map((room, index) => <Room {...room} key={index} />)}

      {(rooms && rooms.length === 0) ||
        (!rooms && (
          <div className="mt-16 flex h-full w-full justify-center ">
            <h3 className="text-lg font-bold text-Header-secondary">
              No rooms available. Create one!
            </h3>
          </div>
        ))}
    </section>
  );
};

export default RoomCard;
