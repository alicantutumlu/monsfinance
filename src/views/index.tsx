import React, { useContext, useEffect, useRef, useState } from "react";
import Pack from "../components/Pack";
import UserContext from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import Header from "../components/Layout/header";
import { useWallet } from "@solana/wallet-adapter-react";
import HeroSection from "../components/sections/HeroSection/HeroSection";

export const main = () => {
  const { publicKey } = useWallet();
  const { userWalletContext, setUserWalletContext } = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };
  const { theme } = useTheme();

  const [loading, setLoading] = useState(true);
  const opacityRef: any = useRef(null);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    let loadedImagesCount = 0;

    if (images.length === 0) {
      setLoading(false);
      return;
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedImagesCount++;
        if (loadedImagesCount > 6) {
          setLoading(false);
        }
      } else {
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount > 6) {
            setLoading(false);
          }
        };
        img.onerror = () => {
          loadedImagesCount++;
          if (loadedImagesCount > 6) {
            setLoading(false);
          }
        };
      }
    });
  }, []);
  const roadMapRef = useRef<HTMLDivElement>(null);

  const scrollToRoadMap = () => {
    roadMapRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {loading && (
        <div className="loader-modal-open loader-modal" ref={opacityRef}>
          <div className="modal-loader"></div>
        </div>
      )}
      <Header scrollToRoadMap={scrollToRoadMap} />
      <HeroSection roadMapRef={roadMapRef} />
    </>
  );
};

export default main;
