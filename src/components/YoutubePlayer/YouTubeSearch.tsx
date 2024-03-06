"use client";
import React, { use, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userApis } from "@/Apis/APIs";
import { useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { MagnifyingGlass } from "react-loader-spinner";
import YouTubeVideoCard from "../card/YouTubeVideoCard";
import ShareButton from "../Buttons/YouTubeShareButton";
import { YouTubeVideo } from "@/types/Youtube.api";
import "./YouTubeSearch.css";
import Each from "../Resuable/Each";
import ChipContainer from "./ChipContainer";

const YouTubeSearch = () => {
  const [search, setSearch] = React.useState<string>("");
  const [searchSuggestion, setSearchSuggestion] = React.useState([]);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const [debouncedSearchTerm, clearTimer] = useDebounce(search, 5000);
  const [ImmediateSearch, setImmediateSearch] = React.useState(false);
  const SuggestionRef = useRef<HTMLElement | null>(null);
  const [searchResult, setSearchResult] = React.useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        SuggestionRef.current &&
        !SuggestionRef.current?.contains(event.target)
      ) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestion]);

  useEffect(() => {
    const data = localStorage.getItem("YouTubeSearchResult");
    if (data) {
      setSearchResult(JSON.parse(data));
    }
  }, []);

  const Search = useMutation(
    (searchTerm: string) => userApis.getYoutubeSuggeston(searchTerm),
    {
      onSuccess: (data) => {
        setSearchSuggestion(data);
        setShowSuggestion(true);
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
        if (ImmediateSearch) {
          setImmediateSearch(false);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const getRelatedVideos = useMutation(
    (videoId: string) => userApis.getRelatedVideos(videoId),
    {
      onSuccess: (data) => {
        localStorage.setItem("YouTubeSearchResult", JSON.stringify(data));
        setSearchResult(data);
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
    setShowSuggestion(false);
    clearTimer();
  };

  React.useEffect(() => {
    if (!ImmediateSearch && debouncedSearchTerm) {
      // searchVideos.mutate(debouncedSearchTerm);
      setShowSuggestion(false);
    } else {
      setImmediateSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handlePlayVideo = (id: string) => {
    getRelatedVideos.mutate(id);
  };

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
          />
          <button className="h-full w-fit bg-Input-background px-3 py-2 text-sm text-Paragraph-primary focus:outline-none">
            <IoSearch className="text-xl" />
          </button>
        </div>
        <ShareButton />
        {searchSuggestion.length > 0 && showSuggestion && (
          <section
            ref={SuggestionRef}
            className="absolute  left-0 right-0 top-14 z-20 h-40 rounded-md border border-primary-color bg-Secondary-background shadow-lg"
          >
            <ScrollArea className="h-full w-full py-2 ">
              <Each
                of={searchSuggestion}
                render={(item, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      ImmediateSearchFunction(item);
                    }}
                    className=" cursor-pointer px-3 py-1 font-roboto text-sm  font-light text-paragraph-secondary hover:bg-Main-background"
                  >
                    {item}
                  </p>
                )}
              />
            </ScrollArea>
          </section>
        )}
      </div>
      <ChipContainer
        searchResult={searchResult}
        setSearchResult={setSearchResult}
      />
      <section className="relative">
        <ScrollArea className=" h-[calc(100vh-149px)] w-full  py-2 ">
          <Each
            of={searchResult}
            render={(item) => (
              <YouTubeVideoCard
                {...item}
                handlePlay={handlePlayVideo}
                key={item.id}
              />
            )}
          />
        </ScrollArea>
        {searchVideos.isLoading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 grid place-content-center bg-neutral-700 bg-opacity-5 backdrop-blur-sm">
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#aeaeae"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default YouTubeSearch;
