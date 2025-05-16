import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import NTFSection from "../NFTsSection/NTFSection";
import { useRouter } from "next/navigation";

const HomeHeroSection = ({
  roadMapRef,
}: {
  roadMapRef: React.RefObject<HTMLDivElement>;
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      const title: any = document.querySelector(".title");
      const leaf1: any = document.querySelector(".leaf1");
      const leaf2: any = document.querySelector(".leaf2");
      const bush2: any = document.querySelector(".bush2");
      const mount1: any = document.querySelector(".mount1");
      const mount2: any = document.querySelector(".mount2");

      if (window.innerWidth > 768) {
        if (leaf1) {
          leaf1.style.marginLeft = `-${value}px`;
          leaf1.style.marginBottom = `+${value / 5}px`;
        }
        if (leaf2) {
          leaf2.style.marginLeft = `${value}px`;
          leaf2.style.marginBottom = `+${value / 5}px`;
        }
      }
      if (title) {
        title.style.marginTop = value * 1.5 + "px";
      }

      if (bush2) {
        bush2.style.marginBottom = `-${value}px`;
      }
      if (mount1) {
        mount1.style.marginBottom = `-${value * 1.1}px`;
      }
      if (mount2) {
        mount2.style.marginBottom = `-${value * 1.2}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <section className="home">
        <img src="/images/mount.svg" className="mount1" alt="Mount 1" />
        {/* <img src="/images/bush2.png" className="bush2" alt="Bush 2" /> */}

        <div className="title w-100-mobile  ">
          <div className="d-flex flex-column gap-3">
            <p className=" text-center ">
              {" "}
              <div className="d-flex flex-column">
                <p className="mainTextHuge">
                  Create your AI-Powered Trading Agent in seconds!{" "}
                </p>
                <br></br>{" "}
                <p className="mainTextHugev2 mb-2">
                  Effortless investing, maximum opportunities with AI!
                </p>
              </div>
              <span className="show-mobile mt-4 mb-3">
                {" "}
                <p
                  style={{
                    display: "block",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "250px",
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    src="/mons/logo-light.svg"
                    alt="Logo"
                  />
                </p>
              </span>
              <div className="hide-mobile mt-4 mb-3">
                <p
                  style={{
                    display: "block",
                    position: "relative",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "250px",
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                    src="/mons/logo-light.svg"
                    alt="Logo"
                  />
                </p>
              </div>
            </p>{" "}
            <p className="text-20-500 text-center mt-3">
              Mons.Finance is pioneering Agentic AI-driven DeFi, transforming
              how users interact with NFTs, tokens, and staking mechanisms. At
              its core, we are building an ecosystem where AI agents actively
              participate in financial decision-making, asset management, and
              optimization—rather than merely providing recommendations.
            </p>
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="btn-53"
                onClick={() => {
                  // const nftsSection = document.getElementById("BuyNFT");
                  // if (nftsSection) {
                  //   nftsSection.scrollIntoView({ behavior: "smooth" });
                  // }
                }}
              >
                <div className="original">Get Started</div>
                <div className="letters">
                  <span>G</span>
                  <span>E</span>
                  <span>T</span>

                  <span>S</span>
                  <span>T</span>
                  <span>A</span>
                  <span>R</span>
                  <span>T</span>
                  <span>E</span>
                  <span>D</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <img
          src={
            theme === "light"
              ? "/images/curve-light.png"
              : "/images/curve-dark.png"
          }
          className="bush1"
          alt="Bush 1"
        />
        {/*Sağdakiler */}
        <div className="slide-right leaf2 my-position-absolute">
          <img
            className="nft-ct left-five"
            alt="Leaf 2"
            src="/mock/nft-12.png"
          />
          <img src="/mock/nft-8.png" className="nft-ct left-six" alt="Leaf 2" />

          <img
            src="/mock/nft-9.png"
            className="nft-ct left-seven"
            alt="Leaf 2"
          />

          <img
            src="/mock/nft-17.png"
            className="nft-ct-v2 last-nft left-eight"
            alt="Leaf 2"
          />
        </div>

        {/*Soldakiler */}
        <div className="my-position-absolute leaf1 slide-left ">
          <img src="/mock/nft-5.png" className="nft-ct-v3 left-none " />
          <img
            src="/mock/nft-7.png"
            className="nft-ct turn-right left-second"
          />
          <img
            src="/mock/nft-11.png"
            className="nft-ct turn-right left-third"
            alt="Leaf 1"
          />
          <img
            src="/mock/nft-10.png"
            className="nft-ct turn-right left-fourth"
            alt="Leaf 1"
          />
        </div>
      </section>

      <section className="position-relative">
        <div className="bodyBackground">
          <div className="row d-flex justify-content-center w-100 py-4 mx-0 px-0">
            <div className="col-md-4 px-0 mx-0 d-flex flex-column justify-content-center align-items-center borderRight gap-2">
              <div className="middleTextMin">Our Active User</div>
              <div className="middleText about-us">100K+</div>
            </div>
            <div className="col-md-4 mx-0 px-0 d-flex flex-column justify-content-center align-items-center borderRight  gap-2">
              <div className="middleTextMin">Our Art Work</div>
              <div className="middleText about-us">8K</div>
            </div>
            <div className="col-md-4 px-0 mx-0 d-flex flex-column justify-content-center align-items-center  gap-2">
              <div className="middleTextMin">Our Bundle NFTs</div>
              <div className="middleText about-us">8K+</div>
            </div>
          </div>
          <div className="borderBottom w-100 about-us"></div>
        </div>
      </section>
      <NTFSection roadMapRef={roadMapRef} />
    </div>
  );
};

export default HomeHeroSection;
