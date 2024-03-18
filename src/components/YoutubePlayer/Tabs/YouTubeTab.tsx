import React from "react";
import ChipContainer from "../ChipContainer";
import { AnimatePresence } from "framer-motion";
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
  return (
    <div>
      <ChipContainer setActive={setActive} active={active} />
      <section className="relative">
        <AnimatePresence mode="sync">
          {active === 0 && <Suggested key={"suggested"} />}
          {active === 1 && <HomeTab key={"home"} />}
          {active === 2 && <TrendingTab key={"trending"} />}
          {active === 3 && <QueueTab key={"queue"} />}
          {active === 4 && <RecentTab key={"recent"} />}
          {active === undefined && (
            <SearchResults key={"search"} data={searchResult} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default YouTubeTab;
