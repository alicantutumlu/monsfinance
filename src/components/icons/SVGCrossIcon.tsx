import React from "react";

const SVGCrossIcon = ({ className, onClick }: any) => {
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M19 5L5 19m14 0L5 5"
      />
    </svg>
  );
};

export default SVGCrossIcon;
