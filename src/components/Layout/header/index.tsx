import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { darkTheme, lightTheme } from "../../../assets/defaultThemes";
import { useTheme } from "../../../context/ThemeContext";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import UserContext from "../../../context/UserContext";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletName,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import nacl from "tweetnacl";
import SVGCrossIcon from "../../icons/SVGCrossIcon";
import SVGNav from "../../icons/SVGNav";
const Header = ({ scrollToRoadMap }: { scrollToRoadMap: () => void }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [activePath, setActivePath] = useState<String>();
  const [activeHash, setActiveHash] = useState<String>();
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const { theme, handleChangeTheme } = useTheme();
  const router = useRouter();
  // const { open } = useWeb3Modal();

  useEffect(() => {
    const activePath = router.asPath;
    const activeHash = router.asPath.split("#")[1];
    setActivePath(activePath);
    setActiveHash(activeHash);
  }, [router.asPath]);

  const { userWalletContext, setUserWalletContext }: any = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };

  useEffect(() => {
    if (window.document) {
      const root = window.document.documentElement;
      const selectedTheme: any = theme === "dark" ? darkTheme : lightTheme;
      Object.keys(selectedTheme.colors).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = selectedTheme.colors[key];
        root.style.setProperty(cssKey, cssValue);
      });
    }
  }, [theme]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", function () {
      var header: any = document.querySelector("header");
      var scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }

  // Solana adapter
  const { publicKey, signMessage, connected, select, connect, wallet } =
    useWallet();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const { setVisible } = useWalletModal();

  const [verified, setVerified] = useState<any>();
  useEffect(() => {
    if (!connected) {
      setError("");
      setMessage("");
      setSignature("");
      setSignedMessage("");
      setVerified("");
    }
  }, [connected]);
  const handleInput = (e: any) => {
    const msg = e.target.value;
    setMessage(msg);
  };
  const targetDate: any = new Date("2025-01-27T18:00:00Z");
  const [hasExecuted, setHasExecuted] = useState(false);
  useEffect(() => {
    const now: any = new Date();
    if (now > targetDate && !hasExecuted) {
      const nftsSection = document.getElementById("BuyNFT");
      setHasExecuted(true);
      // setTimeout(() => {
      //   if (nftsSection) {
      //     nftsSection.scrollIntoView({ behavior: "smooth" });
      //   }
      // }, 1200);
    }
  }, [hasExecuted, targetDate]);
  return (
    <>
      <header
        className={`header  ${isScroll && "scroll"} ${
          activePath !== "/" && "nonHome"
        }`}>
        <section className="headersub justify-content-between d-flex ">
          <div>
            <img
              onClick={() => {
                router.push("/");
              }}
              className="image-container c-pointer"
              src={
                theme == "light"
                  ? !isScroll && activePath === "/"
                    ? "/mons/logo-light.svg"
                    : "/mons/logo-dark.svg"
                  : !isScroll && activePath === "/"
                  ? "/mons/logo-light.svg"
                  : "/mons/logo-light.svg"
              }
              alt=""
            />
          </div>

          <div className="navbar d-flex  centered gap-5">
            {activePath === "/how-to-buy-nft" ||
            activePath === "/whitelist" ||
            activePath === "/my-cnfts" ? (
              <>
                {" "}
                <li
                  onClick={() => router.push("/")}
                  // className={` fs-6 ${`scrolled-text }`}`}
                  className={` fs-6 footer-links`}>
                  Home
                </li>
                <li
                  onClick={() => {
                    window.open("/whitepaper.pdf", "_blank");
                  }}
                  // className={` fs-6 ${`scrolled-text `}`}
                  className={`fs-6 footer-links`}>
                  Whitepaper
                </li>
                <li
                  onClick={() => {
                    router.push("/my-cnfts");
                  }}
                  // className={` fs-6 ${`scrolled-text `}`}
                  className={`fs-6 footer-links`}>
                  My cNFTs
                </li>
              </>
            ) : (
              <>
                {" "}
                {/* <li
                  onClick={() => {
                    const nftsSection = document.getElementById("BuyNFT");
                    if (nftsSection) {
                      nftsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}
                >
                  Buy NFT
                </li>
                <li
                  onClick={() => router.push("/how-to-buy-nft")}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}
                  // className={`footer-links`}
                >
                  How To Buy NFT
                </li>
          
                </li> */}
                <a
                  style={{ textDecoration: "none" }}
                  href={"/agent"}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}>
                  Agentic AI
                </a>
                <li
                  onClick={scrollToRoadMap}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}
                  // className={`footer-links`}
                >
                  Road Map
                </li>
                <li
                  onClick={() => {
                    window.open("/whitepaper.pdf", "_blank");
                  }}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}
                  // className={`footer-links`}
                >
                  Whitepaper
                </li>
                <li
                  onClick={() => router.push("/my-cnfts")}
                  className={` fs-6 ${`scrolled-text ${isScroll}`}`}
                  // className={`footer-links`}
                >
                  My cNFTs
                </li>
              </>
            )}

            <li>
              <label className="theme-switch-one style__three style__one">
                <input
                  type="checkbox"
                  id="slider"
                  className="check-status"
                  checked={theme === "dark" ? true : false}
                />
                <span
                  className="slider round"
                  onClick={() =>
                    handleChangeTheme(theme === "light" ? "dark" : "light")
                  }></span>
              </label>
            </li>

            {/* <li onClick={connectFunction} className="mainButton p-3">
              {userWalletContext !== "null" && userWalletContext
                ? `${userWalletContext?.slice(
                    0,
                    5
                  )}...${userWalletContext?.slice(-5)}`
                : "Connect Wallet"}
            </li> */}
            <WalletMultiButton />
            {/* <button className="mainButton" onClick={handleConnect}>
              Connect
            </button> */}
            {/* <button className="mainButton" onClick={disconnectFunction}>
              Disconnect
            </button> */}
            {/* <div>
              {" "}
              {userWalletContext ? `${userWalletContext}` : "Connect Wallet"}
            </div> */}
          </div>
          <div
            className={`overlay ${isOpenNavbar ? "active" : ""}`}
            onClick={() => setIsOpenNavbar(false)}></div>

          <div
            className={`${
              isOpenNavbar ? "active " : "closing"
            } navbarMobile centered px-3`}>
            <li className={`${isOpenNavbar && "close"}`}>
              {!isOpenNavbar ? (
                <SVGNav
                  onClick={() => {
                    setIsOpenNavbar(true);
                  }}
                  className="cross-icon"
                />
              ) : (
                // <img

                //   width={30}
                //   height={30}
                //   src="/icons/close.png"
                // />

                <SVGCrossIcon
                  onClick={() => {
                    setIsOpenNavbar(false);
                  }}
                  className="cross-icon"
                />
              )}
            </li>

            {isOpenNavbar && (
              <>
                {/* {userWalletContext && userWalletContext !== "null" && (
                  <li
                    onClick={() => {
                      router.push("admin-page#create");
                      setIsOpenNavbar(false);
                    }}>
                    Management Panel
                  </li>
                )} */}

                <div className="d-flex flex-column justify-content-evenly align-items-center h-100">
                  <img
                    onClick={() => {
                      router.push("/");
                    }}
                    className="image-container c-pointer"
                    src={
                      theme == "light"
                        ? "/mons/logo-dark.svg"
                        : "/mons/logo-light.svg"
                    }
                    alt=""
                  />

                  <li className="bottomItem">
                    <label className="theme-switch-one mobile style__three style__one">
                      <input
                        type="checkbox"
                        id="slider"
                        className="check-status"
                        checked={theme === "dark" ? true : false}
                      />
                      <span
                        className="slider round"
                        onClick={() =>
                          handleChangeTheme(
                            theme === "light" ? "dark" : "light"
                          )
                        }></span>
                    </label>
                  </li>

                  <WalletMultiButton />
                  {activePath === "/how-to-buy-nft" ||
                  activePath === "/whitelist" ||
                  activePath === "/my-cnfts" ? (
                    <>
                      {" "}
                      <li
                        onClick={() => {
                          setIsOpenNavbar(false);
                          router.push("/");
                        }}
                        // className={` fs-6 ${`scrolled-text }`}`}
                        className={`  footer-links`}>
                        Home
                      </li>
                      <li
                        onClick={() => {
                          setIsOpenNavbar(false);
                          router.push("/my-cnfts");
                        }}
                        // className={` fs-6 ${`scrolled-text }`}`}
                        className={`  footer-links`}>
                        My cNFTs
                      </li>
                      <li
                        onClick={() => {
                          setIsOpenNavbar(false);
                          window.open("/whitepaper.pdf", "_blank");
                        }}
                        className={`footer-links `}>
                        Whitepaper
                      </li>
                    </>
                  ) : (
                    <>
                      {" "}
                      {/* <li
                        onClick={() => {
                          setIsOpenNavbar(false);
                          const nftsSection = document.getElementById("BuyNFT");
                          if (nftsSection) {
                            nftsSection.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="footer-links buy-text "
                      >
                        Buy NFT
                      </li>
                      <li
                        onClick={() => router.push("/how-to-buy-nft")}
                        className="footer-links buy-text "
                        // className={`footer-links`}
                      >
                        How To Buy NFT
                      </li> */}
                      <li
                        onClick={scrollToRoadMap}
                        className="footer-links buy-text "
                        // className={`footer-links`}
                      >
                        Road Map
                      </li>
                      <li
                        onClick={() => router.push("/my-cnfts")}
                        className="footer-links buy-text "
                        // className={`footer-links`}
                      >
                        My cNFTs
                      </li>
                      <li
                        onClick={() => {
                          setIsOpenNavbar(false);
                          window.open("/whitepaper.pdf", "_blank");
                        }}
                        className={`footer-links `}>
                        Whitepaper
                      </li>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </header>
      {activePath?.includes("admin-page") && (
        <header className="headerBottom px-5 thick16">
          <li
            onClick={() => {
              router.push("/admin-page#create");
            }}
            className={`${activeHash === "create" && "active"}`}>
            <div className="centered h-100">
              <img src="/icons/createPack.svg" alt="" />
              <span>Create Pack</span>
            </div>
          </li>
          <li
            onClick={() => {
              router.push("/admin-page#tokens");
            }}
            className={`${activeHash === "tokens" && "active"}`}>
            <div className="centered h-100">
              <img src="/icons/privileges.svg" alt="" />
              <span>Tokens</span>
            </div>
          </li>
          <li
            onClick={() => {
              router.push("/admin-page#claim");
            }}
            className={`${activeHash === "claim" && "active"}`}>
            <div className="centered h-100">
              <img src="/icons/claim.svg" alt="" />
              <span>Claim</span>
            </div>
          </li>
          <li
            onClick={() => {
              router.push("/admin-page#pack-list");
            }}
            className={`${activeHash === "pack-list" && "active"}`}>
            <div className="centered h-100">
              <img src="/icons/packList.svg" alt="" />
              <span>Pack List</span>
            </div>
          </li>
        </header>
      )}
    </>
  );
};

export default Header;
