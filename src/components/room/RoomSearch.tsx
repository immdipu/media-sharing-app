import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface RoomSearchProps {
  className?: string;
  setSearch: (search: string[]) => void;
  search: string[];
}

const RoomSearch: React.FC<RoomSearchProps> = ({ search, setSearch }) => {
  const [parent, enableAnimations] = useAutoAnimate();
  const handleClearSearch = (searchTerm: string): void => {
    if (search.length > 0) {
      const newSearch = search.filter((s) => s !== searchTerm);
      setSearch(newSearch);
    }
  };

  return (
    <div className="flex w-full  items-center rounded-md border-neutral-500 bg-neutral-700 pl-2 ">
      <div
        ref={parent}
        className=" flex max-w-[50%] shrink-0  flex-row flex-wrap gap-1 overflow-x-hidden overflow-y-hidden"
      >
        {search.map((term, index) => (
          <Chip key={index} term={term} handleClick={handleClearSearch} />
        ))}
      </div>
      <Input
        className="w-full    border-none bg-inherit pl-1 text-Paragraph-primary placeholder:text-neutral-400"
        placeholder="Search room, people or tags e.g public, private, friends, room name, username, full name"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch([...search, e.currentTarget.value]);
            e.currentTarget.value = "";
          }
          if (e.key === "Backspace" && e.currentTarget.value === "") {
            setSearch(search.slice(0, search.length - 1));
          }
        }}
      />
    </div>
  );
};

export default RoomSearch;

const Chip = ({
  term,
  handleClick,
}: {
  term: string;
  handleClick: (searchTerm: string) => void;
}) => {
  return (
    <div className=" flex h-fit items-center rounded-sm bg-Main-background ">
      <p className=" px-2 font-openSans text-sm  leading-none  text-Paragraph-primary">
        {term}
      </p>
      <div
        onClick={() => {
          handleClick(term);
        }}
        className="group ml-1 h-full cursor-pointer border-l  border-primary-color bg-Secondary-background px-1 py-1"
      >
        <X
          size={17}
          strokeWidth={1.75}
          className="text-red-400  duration-300 group-hover:text-red-600"
        />
      </div>
    </div>
  );
};
