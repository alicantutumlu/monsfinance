import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const router = useRouter();
  const [activePath, setActivePath] = useState<String>();
  const [activeHash, setActiveHash] = useState<String>();
  useEffect(() => {
    const activePath = router.asPath;
    const activeHash = router.asPath.split("#")[1];
    setActivePath(activePath);
    setActiveHash(activeHash);
  }, [router.asPath]);
  const { theme } = useTheme();
  return (
    <div className="footer-ct mt-5">
      <div className="container">
        <div className="d-flex flex-column gap-3 ">
          <div className="d-flex align-items-center gap-3 flex-wrap justify-content-between  flex-wrap p-4 mt-3">
            <img
              className="footer-logo pointer"
              src={
                theme === "light"
                  ? "/mons/logo-dark.svg"
                  : "/mons/logo-light.svg"
              }
              alt=""
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth", // Smooth scrolling
                });
                // router.push("/"); // Ana sayfaya yönlendir
              }}
            />
            <div className="d-flex align-items-center justify-content-center gap-4  flex-wrap">
              <div className="d-flex align-items-center gap-4">
                {activePath === "/how-to-buy-nft" ||
                activePath === "/whitelist" ||
                activePath === "/my-cnfts" ? (
                  <>
                    {" "}
                    <p
                      onClick={() => router.push("/")}
                      // className={` fs-5 ${`scrolled-text }`}`}
                      className="footer-links "
                    >
                      Home
                    </p>
                    <p
                      onClick={() => router.push("/my-cnfts")}
                      // className={` fs-5 ${`scrolled-text }`}`}
                      className="footer-links "
                    >
                      My cNFTs
                    </p>
                    <p
                      onClick={() => {
                        window.open("/whitepaper.pdf", "_blank");
                      }}
                      // className={` fs-5 ${`scrolled-text `}`}
                      className="footer-links "
                    >
                      Whitepaper
                    </p>
                  </>
                ) : (
                  <>
                    {/* <p
                      onClick={() => {
                        const nftsSection = document.getElementById("BuyNFT");
                        if (nftsSection) {
                          nftsSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="footer-links buy-text">
                      {"Buy NFT"}
                    </p>
                    <p
                      onClick={() => router.push("/how-to-buy-nft")}
                      className="footer-links">
                      {"How To Buy NFT"}
                    </p> */}

                    <p
                      onClick={() => {
                        const nftsSection = document.getElementById("roadmap");
                        if (nftsSection) {
                          nftsSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="footer-links"
                    >
                      {"ROADMAP"}
                    </p>
                    <p
                      onClick={() => {
                        window.open("/whitepaper.pdf", "_blank");
                      }}
                      className="footer-links"
                    >
                      {"Whitepaper"}
                    </p>
                  </>
                )}
              </div>
              <div className="vertical-line"></div>
              <div className="d-flex align-items-center gap-4">
                {/* <img
                  onClick={() => {
                    window.open(
                      `https://www.facebook.com/profile.php?id=61561856144512&locale=tr_TR`,
                      "_blank"
                    );
                  }}
                  className="pointer social"
                  src="/images/icons/facebook.svg"
                  alt=""
                /> */}

                {/* <img
                  onClick={() => {
                    window.open(
                      `https://www.instagram.com/inno.valley/`,
                      "_blank"
                    );
                  }}
                  className="pointer social"
                  src="/images/icons/instagram.svg"
                  alt=""
                /> */}

                <img
                  onClick={() => {
                    window.open(`https://x.com/MonsFinance`, "_blank");
                  }}
                  className="pointer social"
                  src="/images/icons/x.svg"
                  alt=""
                />
                <img
                  onClick={() => {
                    window.open(`https://t.me/MonsFinance`, "_blank");
                  }}
                  className="pointer social"
                  src="/images/icons/telegram.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="footer-ct d-flex align-items-center justify-content-center ">
            <p className="footer-copy mb-0 mt-4">
              © 2024 MonsFinance. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
