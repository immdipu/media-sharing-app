"use client";
import React, { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userApis } from "@/Apis/APIs";
import { useMutation } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";
import { MagnifyingGlass } from "react-loader-spinner";
import YouTubeVideoCard from "../card/YouTubeVideoCard";
import ShareButton from "../Buttons/ShareButton";
import { YouTubeVideo } from "@/types/Youtube";

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

  return (
    <div>
      <div className="relative mx-3 mt-4 flex items-center justify-between ">
        <ShareButton backButton={true} />
        <div className="relative flex h-10 w-full items-center justify-between overflow-hidden rounded-md bg-Input-background">
          <input
            type="search"
            className="h-full w-full bg-Input-background px-3 py-2 text-sm  text-Paragraph-primary focus:outline-none"
            placeholder="Search"
            value={search}
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
            className="absolute left-0 right-0 top-12 z-20 h-40 rounded-md bg-third-background shadow-lg"
          >
            <ScrollArea className="h-full w-full py-2 ">
              {searchSuggestion.map((item, index) => (
                <p
                  key={index}
                  onClick={() => {
                    ImmediateSearchFunction(item);
                  }}
                  className=" cursor-pointer px-3 py-1 text-sm font-light text-paragraph-secondary hover:bg-Secondary-background"
                >
                  {item}
                </p>
              ))}
            </ScrollArea>
          </section>
        )}
      </div>
      <div className=" w-full px-4 py-2"></div>
      <section className="relative">
        <ScrollArea className="h-[calc(100vh-135px)] w-full  py-2 ">
          {searchResult.map((item, index) => (
            <YouTubeVideoCard {...item} key={item.id} />
          ))}
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
