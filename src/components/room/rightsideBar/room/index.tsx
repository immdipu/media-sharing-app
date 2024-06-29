"use client";
import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import RoomIcon from "@/components/Icons/TitleLogo";
import moment from "moment";
import { Button } from "@/components/ui/button";
import EditRoom from "../../EditRoom";
import Link from "next/link";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";
import dynamic from "next/dynamic";
const AboutAdminCard = dynamic(
  () => import("@/components/card/AboutAdminCard"),
);

const RoomTab = () => {
  const JoinedRoom = useAppSelector((state) => state.room.JoinedRoom);
  const currentUser = useAppSelector((state) => state.auth);
  return (
    <div className="flex h-full flex-col">
      <section className="  mt-2 flex flex-col items-center  justify-center">
        <RoomIcon color="#ffffff" opacity={0.1} height={90} width={90} />
        <h3 className=" tooltip line-clamp-1 overflow-hidden px-5 text-center text-xl font-medium capitalize text-Header-primary">
          {JoinedRoom?.name}
        </h3>
      </section>

      {/* second box */}

      <section className=" mx-2 mt-6 flex justify-around gap-2 rounded-md border border-primary-color px-2 py-5">
        <div className="flex w-fit flex-col items-center gap-1 ">
          <h5 className=" font-poppins text-sm capitalize  text-Header-secondary">
            Members Limit
          </h5>
          <p className="text-xs font-normal capitalize text-paragraph-secondary">
            {JoinedRoom?.membersLimit}
          </p>
        </div>
        <div className="flex w-fit flex-col items-center gap-1 ">
          <h5 className="font-poppins text-sm capitalize text-Header-secondary">
            Members Count
          </h5>
          <p className="text-xs font-normal capitalize text-paragraph-secondary">
            {JoinedRoom?.members.length}
          </p>
        </div>
        <div
          data-tooltip-position="top"
          data-tooltip={moment(JoinedRoom?.createdAt).format("lll")}
          className="tooltip flex w-fit flex-col items-center gap-1 "
        >
          <h5 className=" font-poppins text-sm capitalize text-Header-secondary">
            Created
          </h5>
          <p className="text-xs font-normal  text-paragraph-secondary">
            {moment(JoinedRoom?.createdAt).fromNow()}
          </p>
        </div>
      </section>

      {/* third box */}

      <AboutAdminCard
        username={JoinedRoom?.admin?.username!}
        id={JoinedRoom?.admin?._id!}
      />
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
    </div>
  );
};

export default RoomTab;
