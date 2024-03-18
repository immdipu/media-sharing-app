import React, { use, useEffect, useLayoutEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Each from "@/components/Resuable/Each";
import { YouTubeVideoCard } from "@/components/card";

interface SearchResultsProps {
  hanldlePlay?: (item: string) => void;
  data: YouTubeVideo[] | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  hanldlePlay,
  data: datas,
}) => {
  const [data, setData] = useState<YouTubeVideo[] | null>(datas);

  useEffect(() => {
    if (!datas && localStorage.getItem("YouTubeSearchResult")) {
      console.log("setting data");
      setData(JSON.parse(localStorage.getItem("YouTubeSearchResult")!));
    } else {
      setData(datas);
    }
  }, [datas]);

  return (
    <ScrollArea className=" h-[calc(100vh-149px)] w-full  py-2 ">
      {data && data.length > 0 && (
        <Each
          of={data}
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
        <div className="flex h-full items-center justify-center">
          <h1 className="text-2xl font-bold">No Results Found</h1>
        </div>
      )}
      {!data && (
        <div className="grid h-full  justify-center ">
          <br />
          <br />
          <br />
          <br />
          <br />
          <h1 className=" font text-sm text-paragraph-secondary">
            Search for a video to see the results...
          </h1>
        </div>
      )}
    </ScrollArea>
  );
};

export default SearchResults;
