import React, { useContext } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { RoomContext } from "../SingleRoom/JoinedSingleRoom";
import { BsTextRight } from "react-icons/bs";
import { Tab, TabContainer } from "@/components/Tab/Tab";
import { AnimatePresence } from "framer-motion";

const Chat = dynamic(() => import("@/components/room/rightsideBar/chat"));
const Users = dynamic(() => import("@/components/room/rightsideBar/users"));
const Room = dynamic(() => import("@/components/room/rightsideBar/room"));
const Media = dynamic(() => import("@/components/room/rightsideBar/media"));

const Index = () => {
  const { showRightSideBar, setShowRightSideBar, MessageCount } =
    useContext(RoomContext);
  const [active, setActive] = React.useState<0 | 1 | 2 | 3 | 4>(0);

  return (
    <div
      className={clsx(
        " w-96 shrink-0 overflow-hidden bg-Secondary-background  transition-all duration-200 ease-linear max-md:absolute",
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

      <TabContainer
        sliderClassName=" -z-[1] bg-btn-primary"
        activeTab={active}
        className=" z-0 flex w-full rounded-b-md bg-Third-background py-[2px] "
      >
        <Tab
          onClick={() => {
            setActive(0);
          }}
          className={clsx(
            "grid w-full  text-sm font-medium text-Paragraph-primary duration-300",
            active === 0 && " text-btn-primary",
          )}
        >
          Chat
        </Tab>
        <Tab
          onClick={() => {
            setActive(1);
          }}
          className={clsx(
            "grid w-full text-Paragraph-primary duration-300",
            active === 1 && "text-btn-primary",
          )}
        >
          Users
        </Tab>
        <Tab
          className={clsx(
            "grid w-full text-Paragraph-primary duration-300",
            active === 2 && "text-btn-primary",
          )}
          onClick={() => {
            setActive(2);
          }}
        >
          Media
        </Tab>
        <Tab
          onClick={() => {
            setActive(3);
          }}
          className={clsx(
            "grid w-full  text-Paragraph-primary duration-300",
            active === 3 && "text-btn-primary ",
          )}
        >
          Room
        </Tab>
      </TabContainer>

      <section className="h-[calc(100vh-56px)] ">
        <AnimatePresence mode="sync">
          {active === 0 && <Chat key={"Chat"} />}
          {active === 1 && <Users key={"Users"} />}
          {active === 2 && <Media key={"media"} />}
          {active === 3 && <Room key={"Room"} />}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Index;
