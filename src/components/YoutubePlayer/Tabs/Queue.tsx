import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Each from "@/components/Resuable/Each";
import { YouTubeVideoCard } from "@/components/card";
import { userApis } from "@/Apis/APIs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { tabAnimation } from "@/lib/constants";

interface QueueProps {
  hanldlePlay?: (item: string) => void;
}

const Queue: React.FC<QueueProps> = ({ hanldlePlay }) => {
  const { data, isLoading } = useQuery(["Queuee"], () =>
    userApis.getHomePageVideos(),
  );

  return (
    <motion.div
      initial={tabAnimation.initial}
      animate={tabAnimation.animate}
      exit={tabAnimation.exit}
      transition={tabAnimation.transition}
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
  );
};

export default Queue;
