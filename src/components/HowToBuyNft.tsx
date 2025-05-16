import React from "react";
import { useTheme } from "../context/ThemeContext";
import Footer from "./Layout/Footer";

const HowToBuyNft = () => {
  const { theme } = useTheme();
  return (
    <div className="container mt-5 pt-5">
      <div className="mobileContainer">
        <div className="middleHead  mt-5">How To Buy NFT</div>
      </div>
      <div className="row align-items-center pb-5  flex-column">
        <div className="d-flex flex-column gap-2 mt-5">
          <span className="text-18-700 ">
            <strong style={{ marginRight: "5px" }}>1.</strong>
            First, you need to purchase SOL from Binance, Mexc, or another
            cryptocurrency exchange. To transfer the SOL in your wallet to a
            Solana-supported wallet like Phantom, you should perform a
            withdrawal.
          </span>
          <img
            className="animated-border"
            src="/images/howtobuynft/image1-binancetophantom.png"
            alt="How to Buy NFT"
          />
        </div>
        <div className="d-flex flex-column gap-2 mt-4">
          <span className="text-18-700">
            <strong style={{ marginRight: "5px" }}>2.</strong>
            Visit{" "}
            <a
              href="https://phantom.com/download"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}>
              https://phantom.com/download
            </a>{" "}
            to download the Phantom Wallet extension for your browser.
          </span>
        </div>
        <div className="d-flex flex-column gap-2 mt-5">
          <span className="text-18-700 ">
            <strong style={{ marginRight: "5px" }}>3.</strong>
            Once the download is complete, copy your Solana address from within
            the Phantom Wallet.
          </span>
          <img
            style={{
              borderRadius: "20px",
              maxHeight: "440px",
              width: "auto",
              objectFit: "contain",
            }}
            className="animated-border"
            src="/images/howtobuynft/image2-binancetophantom.png"
            alt="How to Buy NFT"
          />
        </div>
        <div className="d-flex flex-column gap-2 mt-5">
          <span className="text-18-700 ">
            <strong style={{ marginRight: "5px" }}>4.</strong>
            Paste the copied address into the wallet address field on the Solana
            withdrawal page of Binance or a similar cryptocurrency market, and
            complete the transfer process.
          </span>
          <img
            style={{
              borderRadius: "20px",
              maxHeight: "440px",
              width: "auto",
              objectFit: "contain",
            }}
            className="animated-border"
            src="/images/howtobuynft/image3-binancetophantom.png"
            alt="How to Buy NFT"
          />
        </div>
        <div className="d-flex flex-column gap-2 mt-4">
          <span className="text-18-700">
            <strong style={{ marginRight: "5px" }}>5.</strong>
            Go to{" "}
            <a
              href="https://mons.finance"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}>
              https://mons.finance
            </a>{" "}
            and click the <strong>Select Wallet</strong> button in the top right
            corner to connect your Phantom wallet.
          </span>
          <img
            style={{
              borderRadius: "20px",
              maxHeight: "440px",
              width: "auto",
              objectFit: "contain",
            }}
            className="animated-border"
            src="/images/howtobuynft/image4-binancetophantom.png"
            alt="How to Buy NFT"
          />
        </div>
        <div className="d-flex flex-column gap-2 mt-4 mb-5">
          <span className="text-18-700">
            <strong style={{ marginRight: "5px" }}>6.</strong>
            Click the <strong>BUY</strong> button to step into the magical world
            of MonsFinance.
          </span>
          <img
            style={{
              borderRadius: "20px",
              maxHeight: "480px",
              width: "auto",
              objectFit: "contain",
            }}
            className="animated-border"
            src="/images/howtobuynft/image5-binancetophantom.png"
            alt="How to Buy NFT"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HowToBuyNft;
