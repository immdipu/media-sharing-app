import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [data, setData] = useState<YouTubeVideo[]>(
    JSON.parse(localStorage.getItem("YouTubequeue") || "[]"),
  );
  // const { data, isLoading } = useQuery(["Queuee"], () =>
  //   userApis.getHomePageVideos(),
  // );

  return (
    <div>
      <ScrollArea className=" h-[calc(100vh-149px)] w-full  py-2 ">
        {data && data.length > 0 && (
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
        )}

        {data && data.length === 0 && (
          <div className="flex h-full w-full items-center justify-center">
            <h1 className="mt-24 text-base font-normal text-neutral-500">
              Queue is empty!
            </h1>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Queue;
