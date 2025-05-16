import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { ApiRequest } from "../../api";
import UserContext from "../../context/UserContext";
import { NFTCard } from "@ant-design/web3";
import { ConfigProvider, Space, theme } from "antd";
import { useTheme } from "../../context/ThemeContext";

const { defaultAlgorithm, darkAlgorithm } = theme;
export const Pack = ({
  isPreview = false,
  packName = "",
  packPrice = 0,
  packImage = "",
  packDescription = "",
  ownerWalletAddress = "",
  id = "",
  trigger,
  setTrigger,
}: any) => {
  const { userWalletContext, setUserWalletContext } = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };

  const { theme } = useTheme();
  const handleBuy = async () => {
    const { ethereum } = window as any;

    if (!ethereum || !ethereum.isConnected()) {
      toast.error("MetaMask not installed or not connected.", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        autoClose: 3000,
      });
      return;
    }

    const networkId = await ethereum.request({ method: "net_version" });

    if (networkId !== "43113") {
      toast.error("Your current network must be Avalanche.", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        autoClose: 3000,
      });
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const toAddress = ownerWalletAddress
      ? ownerWalletAddress
      : "0x97705C10bA51B3F28C83c5C8ecD462A3fCA8f5B5";
    const sendAmount = packPrice;
    const amount = ethers.utils.parseEther(sendAmount.toString());
    const signer = provider.getSigner();
    const transaction = {
      to: toAddress,
      value: amount,
    };
    signer
      .sendTransaction(transaction)
      .then((tx) => {
        ApiRequest.createBuy({ buyerAddress: userWalletContext, packId: id })
          .then((res) => {
            toast.success("Purchase successful", {
              position: "top-right",
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
              autoClose: 3000,
            });
            setTrigger(!trigger);
          })
          .catch((err) => {
            toast.error("Purchase fail", {
              position: "top-right",
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
              autoClose: 3000,
            });
          });
      })
      .catch((error) => {
        console.error("İşlem gönderme hatası:", error);
      });
  };

  const priceInWei = BigInt(Math.round(packPrice * 1e18));
  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
      }}>
      <div className="">
        <NFTCard
          className={`${theme}`}
          name={"MonsFinance Bundle NFT"}
          tokenId={1}
          price={{
            value: BigInt("2000000000000000000"),
            symbol: "SOL",
            icon: <img src="/icons/sol.png" className="currency-logo" />,
          }}
          description={"MonsFinance featured NFT collection."}
          showAction={isPreview ? false : true}
          //   footer="This is footer"
          // onActionClick={handleBuy}
          actionText="Coming Soon"
          image={"/mock/nft-4.jpeg"}
        />
      </div>
    </ConfigProvider>
  );
};
export default Pack;
