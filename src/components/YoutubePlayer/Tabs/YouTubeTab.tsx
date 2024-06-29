import React from "react";
import ChipContainer from "../ChipContainer";
import { AnimatePresence, Variants, motion } from "framer-motion";
import HomeTab from "./Home";
import TrendingTab from "./Trending";
import QueueTab from "./Queue";
import RecentTab from "./Recent";
import Suggested from "./Suggested";
import SearchResults from "./SearchResults";

interface YouTubeTabProps {
  active: 0 | 1 | 2 | 3 | 4 | undefined;
  setActive: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | 4 | undefined>
  >;
  searchResult: YouTubeVideo[] | null;
}

const YouTubeTab: React.FC<YouTubeTabProps> = ({
  active,
  setActive,
  searchResult,
}) => {
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
    <div>
      <ChipContainer
        setDirection={setDirection}
        setActive={setActive}
        active={active}
      />
      <section className="relative">
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
          >
            {active === 0 && <Suggested key={"suggested"} />}
            {active === 1 && <HomeTab key={"home"} />}
            {active === 2 && <TrendingTab key={"trending"} />}
            {active === 3 && <QueueTab key={"queue"} />}
            {active === 4 && <RecentTab key={"recent"} />}
            {active === undefined && (
              <SearchResults key={"searchResult"} data={searchResult} />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
};

export default YouTubeTab;
