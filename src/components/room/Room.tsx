"use client";
import React, { useEffect } from "react";
import RoomCard from "@/components/card/RoomCard";
import { useAppSelector, useAppDispatch, useDebounce } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";
import { AddAllRoom } from "@/redux/slice/roomSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Each from "../Resuable/Each";
import CreateRoom from "../createRoom";
import RecommedationUser from "../recommendation/user/Index";
import RoomSearch from "./RoomSearch";

const Room = () => {
  const rooms = useAppSelector((state) => state.room.Room);
  const [parent, enableAnimations] = useAutoAnimate();
  const [search, setSearch] = React.useState<string[]>([]);
  const [searchResult, SetSearchResults] = React.useState<
    RoomTypes[] | undefined
  >([]);

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
  }, [data]);

  useEffect(() => {
    if (search.length > 0) {
      const filteredRooms = rooms?.filter((room) => {
        const matches = search.every((term) => {
          const roomMatches =
            room.name.toLowerCase().includes(term.toLowerCase()) ||
            room.roomType.toLowerCase().includes(term.toLowerCase()) ||
            room.members.some((member) => {
              return (
                member.username.toLowerCase().includes(term.toLowerCase()) ||
                member.fullName.toLowerCase().includes(term.toLowerCase())
              );
            });
          console.log(
            `Term: ${term}, Room: ${room.name}, Matches: ${roomMatches}`,
          );
          return roomMatches;
        });
        console.log(`Room: ${room.name}, All Matches: ${matches}`);
        return matches;
      });
      console.log("Filtered Rooms:", filteredRooms);
      SetSearchResults(filteredRooms);
    } else {
      SetSearchResults([]);
    }
  }, [search, rooms]);

  const roomsToDisplay =
    searchResult && searchResult.length > 0 ? searchResult : rooms;

  return (
    <div className=" grow pr-4">
      <section className="mt-7 flex gap-2 pl-20 max-md:px-2">
        <CreateRoom />

        <RoomSearch search={search} setSearch={setSearch} />
      </section>
      <section className=" pl-20 max-md:px-3">
        <h3 className="mt-10 text-lg font-bold text-neutral-50 max-md:px-3">
          Rooms
        </h3>
        <RecommedationUser />

        <section ref={parent} className="mt-7 flex flex-col  gap-10   ">
          {roomsToDisplay && roomsToDisplay.length > 0 && (
            <Each
              of={roomsToDisplay}
              render={(room, index) => <RoomCard {...room} key={index} />}
            />
          )}

          {(rooms && rooms.length === 0) ||
            (!rooms && (
              <div className="mt-16 flex h-full w-full justify-center ">
                <h3 className="text-lg font-bold text-Header-secondary">
                  No rooms available. Create one!
                </h3>
              </div>
            ))}
        </section>
      </section>
    </div>
  );
};

export default Room;
