import React from "react";
import { TabContainer, Tab } from "../Tab/Tab";
import clsx from "clsx";
import { useQueryClient } from "@tanstack/react-query";

interface ChipContainerProps {
  setActive: React.Dispatch<
    React.SetStateAction<0 | 1 | 2 | 3 | 4 | undefined>
  >;
  active: 0 | 1 | 2 | 3 | 4 | undefined;
  setDirection: React.Dispatch<React.SetStateAction<1 | -1>>;
}

const ChipContainer: React.FC<ChipContainerProps> = ({
  active,
  setActive,
  setDirection,
}) => {
  const queryClient = useQueryClient();

  return (
    <div className=" relative mt-2 overflow-hidden px-5">
      <TabContainer
        sliderClassName=" -z-[1] bg-green-500 rounded-sm px-0"
        activeTab={active}
        className=" relative z-0 flex w-full  justify-around gap-2 bg-Main-background"
      >
        <Tab
          onClick={() => {
            setActive((prev) => {
              if (typeof prev === "undefined") return 0;
              setDirection(prev < 0 ? 1 : -1);
              return 0;
            });
            if (active === 0) {
              queryClient.invalidateQueries(["YouTubeSuggested"]);
            }
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 0 && " text-btn-primary",
          )}
        >
          Suggested
        </Tab>
        <Tab
          onClick={() => {
            setActive((prev) => {
              if (typeof prev === "undefined") return 1;
              setDirection(prev < 1 ? 1 : -1);
              return 1;
            });

            if (active === 1) {
              queryClient.invalidateQueries(["YouTubeHomepage"]);
            }
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 1 && " text-btn-primary",
          )}
        >
          Home
        </Tab>
        <Tab
          onClick={() => {
            setActive((prev) => {
              if (typeof prev === "undefined") return 2;
              setDirection(prev < 2 ? 1 : -1);
              return 2;
            });
            if (active === 2) {
              queryClient.invalidateQueries(["YouTubeTrending"]);
            }
          }}
          className={clsx(
            "grid w-full  px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 2 && " text-btn-primary",
          )}
        >
          Trending
        </Tab>

        <Tab
          onClick={() => {
            setActive((prev) => {
              if (typeof prev === "undefined") return 3;
              setDirection(prev < 3 ? 1 : -1);
              return 3;
            });
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 3 && " text-btn-primary",
          )}
        >
          Queue
        </Tab>
        <Tab
          onClick={() => {
            setActive((prev) => {
              if (typeof prev === "undefined") return 4;
              setDirection(prev < 4 ? 1 : -1);
              return 4;
            });
            if (active === 4) {
              queryClient.invalidateQueries(["YouTubeRecent"]);
            }
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 4 && " text-btn-primary",
          )}
        >
          Recent
        </Tab>
      </TabContainer>
    </div>
  );
};

export default ChipContainer;
