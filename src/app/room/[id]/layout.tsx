"use client";
import React from "react";
import RightSideBar from "@/components/room/rightsideBar";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
