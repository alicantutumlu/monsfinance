import React, { useContext, useEffect, useState } from "react";
import { useWallet, type Wallet } from "@solana/wallet-adapter-react";
import { useTheme } from "../context/ThemeContext";
import Footer from "./Layout/Footer";
import UserContext from "../context/UserContext";
import MonsToast from "../Toast/MonsToast";
import { getTextFieldStyles, ThemedTextField } from "../utils/helper";
import { ApiRequest } from "../api";

const WhiteList = () => {
  const [email, setEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const { publicKey } = useWallet();
  const base58 = publicKey?.toBase58();
  useEffect(() => {
    if (base58) setWalletAddress(base58);
  }, [publicKey]);
  const { theme } = useTheme();

  const handleWhiteList = async () => {
    if (!email.trim()) {
      MonsToast("error", "Error: Email cannot be empty.", theme);
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      MonsToast("error", "Error: Invalid email format.", theme);
      return;
    }

    if (!walletAddress.trim()) {
      MonsToast("error", "Error: Wallet address cannot be empty.", theme);
      return;
    }
    const createWhiteList = {
      email: email,
      wallet_id: walletAddress,
    };
    await ApiRequest.walletCreate(createWhiteList)
      .then((res: any) => {
        MonsToast("success", "Whitelist form submitted successfully!", theme);
        setEmail("");
      })
      .catch((err: any) => {
        console.log(err);
        MonsToast(
          "error",
          err?.response.data.message
            ? err?.response.data.message
            : "Server Error: Please try again later.",
          theme
        );
      });
  };

  return (
    <div className="container">
      <div className="mobileContainer">
        <div className="page-container mt-5">
          <div
            className={` ${"detail-container mx-md-0 mx-3 "} d-flex align-items-center flex-column px-5 py-3`}
          >
            <div className="middleHead">Add to Whitelist</div>
            <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
              <div
                className="image-container2"
                style={{ position: "relative" }}
              >
                <img
                  src={`/nfts.gif`}
                  alt="Uploaded"
                  style={{
                    borderRadius: "8px",
                    transition: "opacity 0.3s ease",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div className="mt-4 w-100 d-flex flex-column justify-content-center align-items-center gap-4">
                {" "}
                <ThemedTextField
                  sx={getTextFieldStyles(theme)}
                  type="email"
                  label="Email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <ThemedTextField
                  sx={getTextFieldStyles(theme)}
                  type="text"
                  label="SOL Wallet Address"
                  placeholder="Enter your wallet address"
                  value={walletAddress}
                  onChange={(e: any) => {
                    if (!base58) {
                      setWalletAddress(e.target.value);
                    }
                  }}
                />
              </div>

              <div className="d-flex w-100 gap-3">
                <div className="mt-4 w-100">
                  <button
                    onClick={() => handleWhiteList()}
                    style={{
                      fontWeight: 500,
                      color: "#f4f4f4",
                      border: "none",
                      height: "49px",
                      borderRadius: "8px",
                    }}
                    className="w-100 wallet-adapter-button-trigger"
                  >
                    Add to Whitelist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WhiteList;
