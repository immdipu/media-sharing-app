import * as React from "react";
import { SVGProps } from "react";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  height = 54.977,
  width = 200,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 85 83.333"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="#3a80ff"
      d="M0 83.333h83.333V0H0v83.333zm50.46-50.76L68.524 14.51v54.31H50.461V32.573zM14.813 14.51l18.063 18.063V68.82H14.812V14.51z"
    />
  </svg>
);
export default Logo;
