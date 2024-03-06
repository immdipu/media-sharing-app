import React from "react";
import { TabContainer, Tab } from "../Tab/Tab";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { userApis } from "@/Apis/APIs";

interface ChipContainerProps {
  setSearchResult: React.Dispatch<React.SetStateAction<YouTubeVideo[]>>;
  searchResult: YouTubeVideo[];
}

const ChipContainer: React.FC<ChipContainerProps> = ({
  setSearchResult,
  searchResult,
}) => {
  const [active, setActive] = React.useState<0 | 1 | 2 | 3 | 4>(0);

  const getTrending = useMutation(() => userApis.getTrendingVideos(), {
    onSuccess: (data) => {
      setSearchResult(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getHomepage = useMutation(() => userApis.getHomePageVideos(), {
    onSuccess: (data) => {
      setSearchResult(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const getRecentVideos = useMutation(() => userApis.getRecentVideos(), {
    onSuccess: (data) => {
      setSearchResult(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  React.useEffect(() => {
    const data = localStorage.getItem("YouTubeSearchResult");
    if (!data) {
      getHomepage.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" relative mt-2 overflow-hidden px-5">
      <TabContainer
        sliderClassName=" -z-[1] bg-green-500 rounded-sm px-0"
        activeTab={active}
        className=" relative z-0 flex w-full  justify-around gap-2 bg-Main-background"
      >
        <Tab
          onClick={() => {
            setActive(0);
            getHomepage.mutate();
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 0 && " text-btn-primary",
          )}
        >
          Home
        </Tab>
        <Tab
          onClick={() => {
            setActive(1);
            getTrending.mutate();
          }}
          className={clsx(
            "grid w-full  px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 1 && " text-btn-primary",
          )}
        >
          Trending
        </Tab>

        <Tab
          onClick={() => {
            setActive(2);
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 2 && " text-btn-primary",
          )}
        >
          Queue
        </Tab>
        <Tab
          onClick={() => {
            setActive(3);
            getRecentVideos.mutate();
          }}
          className={clsx(
            "grid w-full px-1 py-1 font-roboto text-xs text-Paragraph-primary duration-300",
            active === 3 && " text-btn-primary",
          )}
        >
          Recent
        </Tab>
      </TabContainer>
      <div
        className={clsx(
          "  h-[3px] w-full overflow-hidden bg-blue-300 opacity-0",
          getTrending.isLoading && "opacity-100",
          getHomepage.isLoading && "opacity-100",
          getRecentVideos.isLoading && "opacity-100",
        )}
      >
        <div className="lineLoader h-full  w-[80%] bg-opacity-100"></div>
      </div>
    </div>
  );
};

export default ChipContainer;
