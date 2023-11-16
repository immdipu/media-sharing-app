import * as React from "react";

interface IconProps {
  width?: string;
  height?: string;
  color?: string;
}

const MessageSend: React.FC<IconProps> = ({
  width = "100px",
  height = "100px",
  color = "#1C274C",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M13.4227 17.3618L16.9348 8.19598C17.2164 7.46107 16.5389 6.78361 15.804 7.06521L6.63824 10.5773C5.80779 10.8955 5.78079 12.06 6.5981 12.3083L10.0751 13.3648C10.3455 13.447 10.553 13.6545 10.6352 13.9249L11.6917 17.4019C11.94 18.2192 13.1045 18.1922 13.4227 17.3618Z"
        fill={color}
      />
    </g>
  </svg>
);
export default MessageSend;
