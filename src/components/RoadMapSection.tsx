import React, { useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Image } from "react-bootstrap";

const RoadMapSection = ({
  roadMapRef,
}: {
  roadMapRef: React.RefObject<HTMLDivElement>;
}) => {
  const { theme } = useTheme();
  return (
    <div ref={roadMapRef}>
      <div className="mobileContainer">
        <div className="middleHead mb-5" id="roadmap">
          ROADMAP
        </div>
      </div>
      <Image
        style={{ width: "100%" }}
        src={
          theme === "light"
            ? window.innerWidth <= 1000
              ? "/images/icons/LightRoadmap.png"
              : "/images/icons/LightRoadmapweb.png"
            : window.innerWidth <= 1000
            ? "/images/icons/DarkRoadmap.png"
            : "/images/icons/DarkRoadmapweb.png"
        }
        alt=""
      />
    </div>
  );
};

export default RoadMapSection;
