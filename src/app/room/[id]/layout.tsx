import React from "react";
import RightSideBar from "@/components/room/rightsideBar";

export default function RoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {children}
      <RightSideBar />
    </div>
  );
}
