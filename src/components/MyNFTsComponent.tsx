import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Footer from "./Layout/Footer";
import { ApiRequest } from "../api";
import { ConfigProvider, theme } from "antd";
import { NFTCard } from "@ant-design/web3";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "./Loader";
import { getTokenId } from "../utils/helper";

const { defaultAlgorithm, darkAlgorithm } = theme;
const MyNFTsComponent = () => {
  const { publicKey }: any = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const { theme } = useTheme();
  const PUBLIC_KEY = publicKey?.toString();
  const bottomRef: any = useRef(null);
  const [isLoadMoreClicked, setIsLoadMoreClicked] = useState(false);

  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [lazyLoad, setLazyLoad] = useState<any>({
    pageIndex: 1,
    limit: 3,
  });

  const [totalValue, setTotalValue] = useState<any>();
  useEffect(() => {
    try {
      setLoading(true);
      if (!PUBLIC_KEY) {
        setOwnedNFTs([]);
        setLoading(false);
      }
      if (PUBLIC_KEY)
        ApiRequest.getOwnedNFTs({
          owner_address: PUBLIC_KEY,
          page_index: lazyLoad.pageIndex,
          limit: lazyLoad.limit,
        })
          .then((res) => {
            setTotalValue(res.data?.totalCount);
            setOwnedNFTs(res.data?.data);
            setLoading(false);
            if (isLoadMoreClicked) {
              setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
              }, 300);
              setIsLoadMoreClicked(false);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log("err", err);
          });
    } catch (error) {
      console.log("err", error);
    }
  }, [PUBLIC_KEY, lazyLoad]);

  useEffect(() => {
    setLazyLoad({
      pageIndex: 1,
      limit: 3,
    });
  }, [PUBLIC_KEY]);

  return (
    <>
      <div className="container mt-5 pt-5" style={{ minHeight: 500 }}>
        <div className="mobileContainer">
          <div className="middleHead  mt-5 mb-5">Your Owned Bundle NFTs</div>

          <span className="text-18-700">
            <strong style={{ marginRight: "5px" }}>1.</strong>
            If your NFTs are not showing up in your Phantom wallet, don’t worry—
            the NFTs displayed on this page are entirely yours. The issue of
            cNFTs not appearing in the wallet is due to hot wallets having
            indexing problems with cNFTs.
          </span>
          <div className="row align-items-center mt-5">
            <ConfigProvider
              theme={{
                algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
              }}>
              {loading ? (
                <Loader />
              ) : (
                <div className={`${ownedNFTs?.length > 0 && "grid-container"}`}>
                  {ownedNFTs?.length > 0 ? (
                    ownedNFTs
                      ?.filter(
                        (elm: any) =>
                          !elm?.content?.metadata?.name.startsWith("AB Open")
                      )
                      .map((elm: any, key: number) => (
                        <div
                          key={key}
                          className="d-flex flex-column text-white">
                          {/* <span>{elm?.grouping[0]?.group_value}</span> */}
                          <div ref={bottomRef}></div>
                          <NFTCard
                            key={key}
                            name={elm?.content?.metadata?.name}
                            className={`${theme}`}
                            tokenId={
                              elm?.content?.metadata?.name.includes("#")
                                ? getTokenId(elm?.content?.metadata?.name)
                                : 0
                            }
                            price={{
                              value: BigInt("2000000000000000000"),
                              symbol: "SOL",
                              icon: (
                                <img
                                  src="/icons/sol.png"
                                  className="currency-logo"
                                />
                              ),
                            }}
                            // like={{
                            //   totalLikes: 1600,
                            // }}
                            description={elm?.content?.metadata?.description}
                            showAction
                            onActionClick={() => {
                              const url = `https://xray.helius.dev/address/${elm?.id}/history?cluster=devnet&page=1`;
                              window.open(url, "_blank");
                            }}
                            actionText={"View on Explorer"}
                            footer="Owned ☑️"
                            image={elm?.content?.files[0].uri}
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
          </div>
          {ownedNFTs?.length > 0 &&
            !loading &&
            totalValue >= lazyLoad.limit && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setLazyLoad({
                      pageIndex: lazyLoad.pageIndex,
                      limit: lazyLoad.limit + 3,
                    });
                    setIsLoadMoreClicked(true);
                  }}
                  className="text-button ">
                  <span> {"Load More"}</span>
                </button>
              </div>
            )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyNFTsComponent;
