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
