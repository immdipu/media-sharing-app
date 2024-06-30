import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ViewsFormat = (views: number) => {
  if (views > 1000000000) {
    return `${(views / 1000000000).toFixed(1)}B views`;
  } else if (views > 1000000) {
    return `${(views / 1000000).toFixed(0)}M views`;
  } else if (views > 1000) {
    return `${(views / 1000).toFixed(0)}K views`;
  } else {
    return `${views} views`;
  }
};

export const formatVideoTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
};
