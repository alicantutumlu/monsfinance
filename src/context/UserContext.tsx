/* @jsxImportSource react */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
const WalletAddressContext = createContext<{
  userWalletContext: any;
  setUserWalletContext: any;
} | null>(null);

export const WalletAddressProvider = ({ children }: any) => {
  const [userWalletContext, setUserWalletContext] = useState<any>();

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await provider.listAccounts();
        return accounts;
      } catch (error) {
        console.error("Error loading wallet data:", error);

        return [];
      }
    };

    const fetchData = async () => {
      const accounts = await loadWalletData();
      if (accounts[0] == undefined) {
        localStorage.setItem("userWallet", "");
      } else {
        setUserWalletContext(localStorage.getItem("userWallet"));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userWalletContext !== undefined) {
      localStorage.setItem("userWallet", userWalletContext);
    }
  }, [userWalletContext]);

  return (
    <WalletAddressContext.Provider
      value={{
        userWalletContext,
        setUserWalletContext,
      }}
    >
      {children}
    </WalletAddressContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletAddressContext);
};

export default WalletAddressContext;
