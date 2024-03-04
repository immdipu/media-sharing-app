import React from "react";
import { cn } from "@/lib/utils";

interface CardOnePros {
  header: string;
  content: string;
  classNames?: string;
}

const CardOne: React.FC<CardOnePros> = ({ content, header, classNames }) => {
  return (
    <div
      className={cn(
        "infoCard flex h-full w-full max-w-xs flex-col items-start justify-center rounded-md border border-blue-200 bg-blue-600 px-5 py-4 max-lg:max-w-[250px]",
        classNames,
      )}
    >
      <h1 className="font-inter text-xl font-bold text-neutral-50">{header}</h1>
      <p className="py-3 font-medium text-neutral-100">{content}</p>
    </div>
  );
};

export default CardOne;
