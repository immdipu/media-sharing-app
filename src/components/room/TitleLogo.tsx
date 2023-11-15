import React from "react";
interface TitleLogoProps {
  opacity?: number;
  width?: number;
  height?: number;
  color?: string;
}

const TitleLogo: React.FC<TitleLogoProps> = ({
  opacity = 0.5,
  color = "#1C274C",
  height = 40,
  width = 40,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={width}
    height={height}
    viewBox="0 0 24 24"
  >
    <g fill={color}>
      <circle cx={12} cy={12} r={10} opacity={opacity} />
      <path d="M15.5 9.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM11 9.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM5.75 9a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM10.5 5.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM15 5.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM19 9.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM19 14.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM15.5 14.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM9.75 15.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM5.75 13.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM10.5 18.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 19a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </g>
  </svg>
);

export default TitleLogo;
