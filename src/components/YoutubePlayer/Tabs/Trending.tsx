import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Each from "@/components/Resuable/Each";
import { YouTubeVideoCard } from "@/components/card";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";
import InLineLoader from "@/components/Skeleton/InLineLoader";

interface TrendingProps {
  hanldlePlay?: (item: string) => void;
  refresh?: boolean;
}

const Trending: React.FC<TrendingProps> = ({ hanldlePlay, refresh }) => {
  const { data, isLoading, isFetching } = useQuery(
    ["YouTubeTrending", refresh],
    () => userApis.getTrendingVideos(),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnMount: false,
    },
  );

  return (
    <>
      <InLineLoader isLoading={isLoading || isFetching} />

      <motion.div
        initial={tabAnimation.initial}
        animate={tabAnimation.animate}
        exit={tabAnimation.exit}
        transition={tabAnimation.transition}
        className=" relative mt-1"
      >
        <ScrollArea className=" h-[calc(100vh-149px)] w-full  py-2 ">
          <Each
            of={data || []}
            render={(item) => (
              <YouTubeVideoCard
                {...item}
                handlePlay={hanldlePlay}
                key={item.id}
              />
            )}
          />
        </ScrollArea>
      </motion.div>
    </>
  );
};

export default Trending;
