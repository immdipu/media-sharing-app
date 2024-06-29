import React, { useContext } from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { RoomContext } from "../SingleRoom/JoinedSingleRoom";
import { BsTextRight } from "react-icons/bs";
import { Tab, TabContainer } from "@/components/Tab/Tab";
import { AnimatePresence, motion, Variants } from "framer-motion";

const Chat = dynamic(() => import("@/components/room/rightsideBar/chat"));
const Users = dynamic(() => import("@/components/room/rightsideBar/users"));
const Room = dynamic(() => import("@/components/room/rightsideBar/room"));
const Media = dynamic(() => import("@/components/room/rightsideBar/media"));

const Index = () => {
  const { showRightSideBar, setShowRightSideBar, MessageCount } =
    useContext(RoomContext);
  const [active, setActive] = React.useState<0 | 1 | 2 | 3 | 4>(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  const animations: Variants = {
    hidden: (direction: -1 | 1) => ({
      x: direction === -1 ? "-100%" : "100%",
    }),
    visible: {
      x: 0,
    },
    exit: (direction: -1 | 1) => ({
      x: direction === -1 ? "100%" : "-100%",
    }),
  };

  return (
    <div
      className={clsx(
        " borde w-96 shrink-0 overflow-x-hidden  bg-Secondary-background  transition-all duration-200 ease-linear max-md:absolute",
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
            setActive((prev) => {
              setDirection(prev < 0 ? 1 : -1);
              return 0;
            });
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
            setActive((prev) => {
              setDirection(prev < 1 ? 1 : -1);
              return 1;
            });
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
            setActive((prev) => {
              setDirection(prev < 2 ? 1 : -1);
              return 2;
            });
          }}
        >
          Media
        </Tab>
        <Tab
          onClick={() => {
            setActive((prev) => {
              setDirection(prev < 3 ? 1 : -1);
              return 3;
            });
          }}
          className={clsx(
            "grid w-full  text-Paragraph-primary duration-300",
            active === 3 && "text-btn-primary ",
          )}
        >
          Room
        </Tab>
      </TabContainer>

      <section
        style={{
          contain: "paint",
        }}
        className="overflow-x-hidden"
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            variants={animations}
            custom={direction}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0,
            }}
            key={active}
            className="h-[calc(100vh-56px)]"
          >
            {active === 0 && <Chat key={"Chat"} />}
            {active === 1 && <Users key={"Users"} />}
            {active === 2 && <Media key={"media"} />}
            {active === 3 && <Room key={"Room"} />}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Index;
