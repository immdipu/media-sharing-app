import React, { useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Chat from "@/components/room/rightsideBar/chat";
import Users from "./users";
import RoomTab from "@/components/room/rightsideBar/room";
import Media from "./media";
import clsx from "clsx";
import { RoomContext } from "../SingleRoom/JoinedSingleRoom";
import { BsTextRight } from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";

const Index = () => {
  const { showRightSideBar, setShowRightSideBar, MessageCount } =
    useContext(RoomContext);
  const router = useRouter();
  const path = usePathname();

  return (
    <div
      className={clsx(
        "w-96 shrink-0 bg-Secondary-background  transition-all duration-200 ease-linear max-md:absolute",
        showRightSideBar ? "max-md:right-0" : "max-md:-right-96",
      )}
    >
      <button
        onClick={() => {
          if (!setShowRightSideBar) return;
          setShowRightSideBar(!showRightSideBar);
        }}
        className={clsx(
          " absolute -left-12  z-10 hidden h-8 w-12 items-center justify-center rounded-l-md   pr-2 max-md:flex",
          showRightSideBar
            ? "left-[0px] top-16 rounded-l-none rounded-r-md bg-neutral-600 bg-opacity-70"
            : "-left-12 top-4 bg-neutral-700",
        )}
      >
        <BsTextRight className="text-2xl font-normal text-neutral-200" />
      </button>
      <Tabs defaultValue="chat" className="w-auto">
        <TabsList className="sticky top-0 z-10 w-full bg-Input-background   ">
          <TabsTrigger
            onClick={() => {
              router.push(`${path}?tab=chat`);
            }}
            value="chat"
            className="relative w-full text-Paragraph-primary "
          >
            {MessageCount !== 0 && (
              <span
                className={clsx(
                  "absolute left-3 top-2 rounded-full bg-red-500 px-[7px] py-[3px]  text-xs text-white",
                )}
              >
                {MessageCount}
              </span>
            )}
            chat
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              router.push(`${path}?tab=users`);
            }}
            value="users"
            className="w-full text-Paragraph-primary"
          >
            users
          </TabsTrigger>

          <TabsTrigger
            onClick={() => {
              router.push(`${path}?tab=media`);
            }}
            value="media"
            className="w-full text-Paragraph-primary"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            onClick={() => {
              router.push(`${path}?tab=room`);
            }}
            value="room"
            className="w-full text-Paragraph-primary"
          >
            Room
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="h-[calc(100vh-56px)]   ">
          <Chat />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
        <TabsContent value="media" className="h-[calc(100vh-70px)]  ">
          <Media />
        </TabsContent>
        <TabsContent value="room" className="h-[calc(100vh-56px)]   ">
          <RoomTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
