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
import { Input } from "../ui/input";

const Room = () => {
  const rooms = useAppSelector((state) => state.room.Room);
  const [parent, enableAnimations] = useAutoAnimate();
  const [search, setSearch] = React.useState("");
  const [searchResult, SetSearchResults] = React.useState<
    RoomTypes[] | undefined
  >([]);
  const [debouncedSearchTerm, clearTimer] = useDebounce(search, 500);
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
    if (debouncedSearchTerm) {
      const results = rooms?.filter(
        (room) =>
          room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          room.members.some(
            (member) =>
              member.username
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) ||
              member.fullName
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()),
          ),
      );
      SetSearchResults(results);
    }
  }, [debouncedSearchTerm, rooms]);

  const roomsToDisplay =
    searchResult && searchResult.length > 0 ? searchResult : rooms;

  return (
    <div className=" grow pr-4">
      <section className="mt-7 flex gap-2 pl-20 max-md:px-2">
        <CreateRoom />
        <Input
          value={search}
          onChange={(e) => {
            if (e.target.value.length === 0) {
              SetSearchResults(undefined);
            }
            setSearch(e.target.value);
          }}
          className="border-neutral-500 bg-neutral-700 text-neutral-100 placeholder:text-neutral-400"
          placeholder="Search room, people or tags"
        />
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
