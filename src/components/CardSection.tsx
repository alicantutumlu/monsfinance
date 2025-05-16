import React from "react";
import { useTheme } from "../context/ThemeContext";

const CardSection = () => {
  const { theme } = useTheme();
  return (
    <div
      className="row align-items-center   justify-content-between"
      style={{ paddingBottom: "60px" }}
    >
      <div className="col-md-3 drop-shadow ">
        <div className="d-flex flex-column gap-3 mobile-center align-items-center">
          <div>
            <img
              src={
                theme === "dark"
                  ? "/images/icons/pioneer.svg"
                  : "/images/icons/pioneer-light.svg"
              }
              alt=""
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="text-18-700">
              Pioneering the Future of Finance
            </span>
            <span className="text-16-400">
              At Mons.Finance, innovation meets simplicity. From DAO-driven
              decisions to tailored investment options, we’re shaping the future
              of decentralized finance.
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-3 drop-shadow mobile-mt-3 ">
        <div className="d-flex flex-column align-items-center gap-3 mobile-center">
          <div>
            <img
              src={
                theme === "dark"
                  ? "/images/icons/ai.svg"
                  : "/images/icons/ai-light.svg"
              }
              alt=""
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="text-18-700">
              AI-Driven Insights for Smarter Decisions
            </span>
            <span className="text-16-400">
              Leverage advanced AI algorithms to analyze trends, predict market
              movements, and tailor token packs to your unique preferences,
              empowering you to make informed investment choices effortlessly.
            </span>
          </div>
        </div>
      </div>
      <div className="col-md-3 drop-shadow mobile-mt-3">
        <div className="d-flex flex-column gap-3 mobile-center align-items-center">
          <div>
            <img
              src={
                theme === "dark"
                  ? "/images/icons/discover.svg"
                  : "/images/icons/discover-light.svg"
              }
              alt=""
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="text-18-700">
              Discover & Collect Unique NFT Packs
            </span>
            <span className="text-16-400">
              Join our Token Pack Platform and immerse yourself in a world where
              digital art meets innovation, offering you exclusive access to
              unique collectibles that elevate your digital ownership
              experience.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;
