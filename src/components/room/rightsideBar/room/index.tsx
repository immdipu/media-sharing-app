"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomIcon from "@/components/Icons/TitleLogo";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditRoom from "../../EditRoom";
import Link from "next/link";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";

const RoomTab = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const currentUser = useAppSelector((state) => state.auth);
  return (
    <motion.div
      initial={tabAnimation.initial}
      animate={tabAnimation.animate}
      exit={tabAnimation.exit}
      transition={tabAnimation.transition}
      className="flex h-full flex-col"
    >
      <section className="  mt-2 flex flex-col items-center  justify-center">
        <RoomIcon color="#ffffff" opacity={0.2} height={90} width={90} />
        <h3 className=" tooltip line-clamp-1 overflow-hidden px-5 text-center text-xl font-medium capitalize text-Header-primary">
          {JoinedRoom?.name}
        </h3>
      </section>

      {/* second box */}

      <section className="bg-third-background mx-2 mt-6 flex justify-around gap-2 rounded-md border border-secondary-color px-2 py-5">
        <div className="flex w-fit flex-col items-center gap-1 ">
          <h5 className=" text-sm capitalize  text-Header-secondary">
            Members Limit
          </h5>
          <p className="text-xs font-normal capitalize text-paragraph-secondary">
            {JoinedRoom?.membersLimit}
          </p>
        </div>
        <div className="flex w-fit flex-col items-center gap-1 ">
          <h5 className=" text-sm capitalize text-Header-secondary">
            Members Count
          </h5>
          <p className="text-xs font-normal capitalize text-paragraph-secondary">
            {JoinedRoom?.members.length}
          </p>
        </div>
        <div className="flex w-fit flex-col items-center gap-1 ">
          <h5 className=" text-sm capitalize text-Header-secondary">Created</h5>
          <p className="text-xs font-normal  text-paragraph-secondary">
            {moment(JoinedRoom?.createdAt).fromNow()}
          </p>
        </div>
      </section>

      {/* third box */}

      <section className="bg-third-background mx-2 mt-3 flex  flex-col rounded-md border border-secondary-color px-3 py-2">
        <h3 className="mt-2 font-medium text-Header-secondary">
          {" "}
          About Admin{" "}
        </h3>
        <div className="mt-4 flex">
          <Avatar className="h-16 w-16">
            <AvatarImage src={JoinedRoom?.admin?.profilePic} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-3 mt-1 pb-4">
            <h3 className="font-medium text-Header-secondary">
              {JoinedRoom?.admin.fullName}
            </h3>
            <p className="text-xs font-normal leading-none text-paragraph-secondary">
              {JoinedRoom?.admin?.username}
            </p>
            <div className=" mt-3 flex gap-5">
              <h3 className="text-xs font-normal text-Header-secondary">
                Followers: <span className="text-Header-primary">10</span>{" "}
              </h3>
              <h3 className="text-xs font-normal text-Header-secondary">
                Following: <span className="text-Header-primary">10</span>{" "}
              </h3>
            </div>
          </div>
        </div>
      </section>
      {/* fourth box */}
      <section className="mx-2 mb-5 flex h-full flex-col justify-end gap-2">
        {JoinedRoom?.admin?._id === currentUser.id && <EditRoom />}

        <Link className="block w-full" href={"/"}>
          <Button
            variant={"destructive"}
            className="w-full rounded-md hover:bg-red-400 "
          >
            Leave
          </Button>
        </Link>
      </section>
    </motion.div>
  );
};

export default RoomTab;
