import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

interface TabContainerProps {
  children: React.ReactNode;
  className?: string;
  sliderClassName?: string;
  activeTab?: number;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-md  px-5 py-2",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = "Tab";

const TabContainer = forwardRef<HTMLDivElement, TabContainerProps>(
  ({ children, className, activeTab = 0, sliderClassName, ...rest }, ref) => {
    const [containerWidth, setContainerWidth] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }, [containerRef]);

    const tabCount = React.Children.count(children);

    const sliderWidth = containerWidth / tabCount;

    return (
      <div ref={containerRef} className={cn("relative", className)} {...rest}>
        {children}
        <div
          style={{
            width: `${sliderWidth}px`,
            transform: `translateX(${sliderWidth * activeTab}px)`,
          }}
          className={cn(
            " absolute inset-0 -z-10 rounded-md bg-Main-background transition-all duration-200 ease-in-out",
            sliderClassName,
          )}
        />
      </div>
    );
  },
);

TabContainer.displayName = "TabContainer";

export { Tab, TabContainer };
