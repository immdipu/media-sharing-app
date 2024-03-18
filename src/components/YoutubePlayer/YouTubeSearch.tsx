"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { userApis } from "@/Apis/APIs";
import { useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import ShareButton from "../Buttons/YouTubeShareButton";
import "./YouTubeSearch.css";
import Each from "../Resuable/Each";
import YouTubeTab from "./Tabs/YouTubeTab";
import InLineLoader from "../Skeleton/InLineLoader";

const YouTubeSearch = () => {
  const [search, setSearch] = React.useState<string>("");
  const [searchSuggestion, setSearchSuggestion] = React.useState([]);
  const [debouncedSearchTerm, clearTimer] = useDebounce(search, 5000);
  const [ImmediateSearch, setImmediateSearch] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<YouTubeVideo[] | null>(
    null,
  );
  const [active, setActive] = React.useState<0 | 1 | 2 | 3 | 4 | undefined>(
    undefined,
  );

  const Search = useMutation(
    (searchTerm: string) => userApis.getYoutubeSuggeston(searchTerm),
    {
      onSuccess: (data) => {
        setSearchSuggestion(data);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const searchVideos = useMutation(
    (searchTerm: string) => userApis.getYouTubeVideos(searchTerm),
    {
      onSuccess: (data) => {
        localStorage.setItem("YouTubeSearchResult", JSON.stringify(data));
        setSearchResult(data);
        setActive(undefined);
        if (ImmediateSearch) {
          setImmediateSearch(false);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const ImmediateSearchFunction = (searchTerms: string) => {
    setImmediateSearch(true);
    setSearch(searchTerms);
    searchTerms.length > 0 && searchVideos.mutate(searchTerms);

    clearTimer();
  };

  React.useEffect(() => {
    if (!ImmediateSearch && debouncedSearchTerm) {
      searchVideos.mutate(debouncedSearchTerm);
    } else {
      setImmediateSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div>
      <div className="relative mx-2 flex items-center justify-between pt-4 ">
        <div className="BackButton w-6 transition-all duration-100 ease-linear">
          <ShareButton backButton={true} />
        </div>
        <div className=" relative flex h-10 w-full items-center justify-between overflow-hidden rounded-md bg-Main-background">
          <input
            type="search"
            className="searchInput h-full w-full   bg-Main-background px-3 py-2 text-sm text-Paragraph-primary outline-none transition-all  duration-200 ease-linear  focus:outline-none"
            placeholder="Search"
            value={search}
            onFocus={() => {
              const backButton = document.querySelector(".BackButton");
              backButton?.classList.add("backButtonhide");
            }}
            onBlur={() => {
              const backButton = document.querySelector(".BackButton");
              backButton?.classList.remove("backButtonhide");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                ImmediateSearchFunction(search);
              }
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              search.length > 0 && Search.mutate(search);
            }}
            list="searchOptions"
          />
          <datalist
            id="searchOptions"
            className="absolute z-10 mt-1 w-full rounded-md border bg-Main-background text-primary  shadow-lg"
          >
            {searchSuggestion.length > 0 && (
              <Each
                of={searchSuggestion}
                render={(item, index) => <option key={index} value={item} />}
              />
            )}
          </datalist>
          <button
            onClick={() => {
              ImmediateSearchFunction(search);
            }}
            className="h-full w-fit bg-Input-background px-3 py-2 text-sm text-Paragraph-primary focus:outline-none"
          >
            <IoSearch className="text-xl" />
          </button>
        </div>
        <ShareButton />
      </div>
      <InLineLoader isLoading={searchVideos.isLoading} />
      <YouTubeTab
        active={active}
        setActive={setActive}
        searchResult={searchResult}
      />
    </div>
  );
};

export default YouTubeSearch;
