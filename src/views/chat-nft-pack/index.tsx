import React, { useEffect, useState } from "react";

import Chat from "../../components/test/Chat";
import { useTheme } from "../../context/ThemeContext";
import { headers } from "next/headers";
import ChatSidebar from "./chat-sidebar/ChatSidebar";
import TestHeader from "../../components/test/TestHeader";
import { ConfigProvider, theme } from "antd";

import ConfettiEffect from "../../components/Confetti";
import { useWallet } from "@solana/wallet-adapter-react";
import { ApiRequest } from "../../api";
import Loader from "../../components/Loader";
import { NFTCard } from "@ant-design/web3";
import { getTokenId } from "../../utils/helper";

const { defaultAlgorithm, darkAlgorithm } = theme;
const ChatPage = () => {
  const { theme } = useTheme();
  const [nftsData, setNftsData] = useState([]);
  const [isBuyed, setIsBuyed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { publicKey }: any = useWallet();
  const PUBLIC_KEY = publicKey?.toString();
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const agentData = {
    agentName: "Price Analyst",
    avatarSrc: "img/price-avatar.webp",
    capabilities:
      "Generate detailed crypto price performance reports with interactive charts, technical analysis, and short, medium, and long-term outlooks.",
    usageRecommendations:
      "Enter a cryptocurrency name or ticker symbol, and instantly download a professional-grade report",
    creditUsage: "10 credits per report (avg.)",
  };

  useEffect(() => {
    if (isBuyed) {
      try {
        setLoading(true);
        if (!PUBLIC_KEY) {
          setOwnedNFTs([]);
          setLoading(false);
        }
        if (PUBLIC_KEY)
          ApiRequest.getNFTByID({
            owner_address: PUBLIC_KEY,
          })
            .then((res) => {
              setOwnedNFTs(res.data?.data);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("err", err);
            });
      } catch (error) {
        console.log("err", error);
      }
    }
  }, [isBuyed]);
  console.log("owned nfts", ownedNFTs);

  return (
    <>
      <div
        style={
          theme === "dark"
            ? { minHeight: "100vh", background: "url('/mons/bodyBgDark.svg')" }
            : { minHeight: "100vh", background: "url('/mons/bodyBgLight.svg')" }
        }
      >
        <div className="row px-0 mx-0 d-flex align-items-stretch h-100">
          <div className="col-lg-4 mt-4 d-flex">
            <ChatSidebar />
          </div>
          <div className="col-lg-8 d-flex flex-column">
            <TestHeader />
            <div className="chat-container my-4 w-100 ">
              {!isBuyed && (
                <Chat
                  nftsData={nftsData}
                  setNftsData={setNftsData}
                  isBuyed={isBuyed}
                  setIsBuyed={setIsBuyed}
                />
              )}

              {isBuyed && (
                <>
                  <ConfettiEffect isBuyed={isBuyed} />
                  <ConfigProvider
                    theme={{
                      algorithm:
                        theme === "light" ? defaultAlgorithm : darkAlgorithm,
                    }}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <div
                        className={`${
                          ownedNFTs?.length > 0 && "grid-container"
                        }`}
                      >
                        {ownedNFTs?.length > 0 ? (
                          ownedNFTs
                            ?.filter(
                              (elm: any) =>
                                !elm?.content?.metadata?.name.startsWith(
                                  "AB Open"
                                )
                            )
                            .map((elm: any, key: number) => (
                              <div
                                key={key}
                                className="d-flex flex-column text-white"
                              >
                                {/* <span>{elm?.grouping[0]?.group_value}</span> */}

                                <NFTCard
                                  key={key}
                                  name={elm?.name}
                                  className={`${theme}`}
                                  tokenId={
                                    elm?.name.includes("#")
                                      ? getTokenId(elm?.name)
                                      : 0
                                  }
                                  // like={{
                                  //   totalLikes: 1600,
                                  // }}
                                  description={elm?.description}
                                  showAction
                                  onActionClick={() => {
                                    const url = `https://xray.helius.dev/address/${elm?.assetId}/history?cluster=devnet&page=1`;
                                    window.open(url, "_blank");
                                  }}
                                  actionText={"View on Explorer"}
                                  footer="Owned ☑️"
                                  image={elm?.image}
                                />
                              </div>
                            ))
                        ) : ownedNFTs?.length === 0 ? (
                          <div className="d-flex align-items-center justify-content-center">
                            <span className="text-18-700 lighted text-center mt-5">
                              {PUBLIC_KEY
                                ? "You don't have an cNFT"
                                : "Please connect wallet"}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </ConfigProvider>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
