import React, { useContext, useEffect, useRef, useState } from "react";
import Pack from "../../components/Pack";
import UserContext from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/Layout/header";
import { useWallet } from "@solana/wallet-adapter-react";
import WhiteList from "../../components/WhiteList";

export const main = () => {
  const { publicKey } = useWallet();
  const { userWalletContext, setUserWalletContext } = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };
  const { theme } = useTheme();

  const roadMapRef = useRef<HTMLDivElement>(null);

  const scrollToRoadMap = () => {
    roadMapRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header scrollToRoadMap={scrollToRoadMap} />
      <WhiteList />
    </>
  );
};

export default main;
