import React, { useEffect, useState, useMemo } from "react";

import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.scss";
import "../styles/Home.scss";
import "../styles/HeaderNew.scss";
import "../styles/SidebarNew.scss";
import "../styles/Agent.scss";
import "../styles/wallet.scss";
import "../styles/News.scss";
import "../styles/CreateAgent.scss";
import "../styles/Text.scss";
import "../styles/Button.scss";
import "../styles/Pack.scss";
import "../styles/Transaction.scss";
import "../styles/components/index.scss";
import "../styles/footer.scss";
import "../styles/Devmin.scss";
import "../styles/ownedPage.scss";
import "../styles/components/Card.scss";
import "../styles/components/FullPageLoader.scss";
import "../styles/test.scss";
import "../styles/chat-sidebar.scss";
import "../styles/chat.scss";
import "../styles/toolbar.scss";
import "tailwindcss";
import "../styles/font/dene.scss";
import "../styles/custom-agent.scss";
import "../styles/checkbox.scss";
import "../styles/reactflowstyles/flow.scss";
import "../styles/reactflowstyles/xyflowtheme.scss";
import { WagmiConfig } from "wagmi";
import { arbitrum, mainnet } from "viem/chains";
import Layout from "../components/Layout";
import { ThemeContextProvider } from "../context/ThemeContext";
import { WalletAddressProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import "react-toastify/dist/ReactToastify.css";
import { clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  CoinbaseWalletAdapter,
  // GlowWalletAdapter,
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { SidebarContextProvider } from "../context/SidebarContext";
import { NetworkConfigurationProvider } from "../context/NetworkConfigurationProvider";
const projectId = "ca9dd763c4b2e807c27d9459d5cbabe0";
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const chains = [mainnet, arbitrum];

function MyApp({ Component, pageProps }: any) {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(
    () =>
      "https://solana-devnet.g.alchemy.com/v2/Dxz9WJm-HL8dBoyM2AlQm__KqJk57DkL",
    []
  );
  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      // new GlowWalletAdapter(),
      // new SlopeWalletAdapter(),

      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  useEffect(() => {
    console.log("Current network:", network);
    console.log("Wallets:", wallets);
  }, [network]);
  return (
    <>
      <NetworkConfigurationProvider>
        <WalletAddressProvider>
          <ThemeContextProvider>
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                  <SidebarContextProvider>
                    <Layout>
                      <ParallaxProvider>
                        <Component {...pageProps} />
                      </ParallaxProvider>
                    </Layout>
                  </SidebarContextProvider>
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          </ThemeContextProvider>
        </WalletAddressProvider>
      </NetworkConfigurationProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
