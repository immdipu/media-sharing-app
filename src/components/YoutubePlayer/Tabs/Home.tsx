import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Each from "@/components/Resuable/Each";
import { YouTubeVideoCard } from "@/components/card";
import { userApis } from "@/Apis/APIs";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";
import InLineLoader from "@/components/Skeleton/InLineLoader";

interface HomeProps {
  hanldlePlay?: (item: string) => void;
}

const Home: React.FC<HomeProps> = ({ hanldlePlay }) => {
  const { data, isLoading, isFetching } = useQuery(
    ["YouTubeHomepage"],
    () => userApis.getHomePageVideos(),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnMount: false,
    },
  );

  return (
    <>
      <InLineLoader isLoading={isLoading || isFetching} />

      <ScrollArea className=" h-[calc(100vh-149px)] w-full   py-2 ">
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
    </>
  );
};

export default Home;
