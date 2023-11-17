import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-neutral-500 bg-white px-3 py-2 text-sm text-neutral-100 outline-none transition-colors duration-200 ease-linear file:border-0  file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:border-neutral-300    disabled:cursor-not-allowed disabled:opacity-50  ",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
