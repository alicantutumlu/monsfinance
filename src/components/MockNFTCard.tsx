import React, { useEffect, useState } from "react";
import { NFTCard } from "@ant-design/web3";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "../context/ThemeContext";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ApiRequest } from "../api";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import CustomToast from "./CustomToast";
import ConfettiEffect from "./Confetti";

const { defaultAlgorithm, darkAlgorithm } = theme;
const MockNftCard = ({ index = 0 }) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [isBuyed, setIsBuyed] = useState<boolean>(false);
  const router = useRouter();
  let name: string;

  switch (index) {
    case 0:
      name = "MonsFinance Bundle NFT";
      break;
    case 1:
      name = "MonsFinance Bundle NFT";
      break;
    case 2:
      name = "MonsFinance Bundle NFT";
      break;
    default:
      name = "";
  }
  let description: string;

  switch (index) {
    case 0:
      description = "MonsFinance featured NFT collection.";
      break;
    case 1:
      description = "MonsFinance featured NFT collection.";
      break;
    case 2:
      description = "MonsFinance featured NFT collection.";
      break;
    default:
      description = "";
  }

  const targetDate: any = new Date("2025-01-27T18:00:00Z");
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now: any = new Date();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);
  const checkTransactionStatus = async (signature: any, connection: any) => {
    try {
      const { value } = await connection.getSignatureStatuses([signature]);

      if (value && value[0]) {
        const status = value[0];

        // Eğer işlem finalize olmuşsa, durumu döndür
        if (status.confirmationStatus === "finalized") {
          console.log("Transaction has been finalized!");
          return true; // İşlem finalize oldu
        } else if (status.confirmationStatus === "confirmed") {
          console.log("Transaction is confirmed but not finalized.");
        }
      }

      // İşlem finalize olmamışsa false döndür
      console.log("Transaction is not finalized yet.");
      return false;
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return false;
    }
  };

  // Polling işlemi
  const startPolling = async (signature: any, connection: any) => {
    let isFinalized = false;

    while (!isFinalized) {
      isFinalized = await checkTransactionStatus(signature, connection);
      if (!isFinalized) {
        // Bir süre bekle ve tekrar kontrol et
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 5 saniye bekleme
      } else return true;
    }
    console.log("Finalized transaction:", signature);
  };
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const sendSolToRecipient = async () => {
    setLoading(true);
    CustomToast(
      "success",
      "The process has started, please do not refresh the page, there may sometimes be delays due to network congestion."
    );
    if (!publicKey || !connection) {
      setLoading(false);
      CustomToast(
        "error",
        "Please connect your wallet to the left using the button at the top right."
      );

      return;
    }

    try {
      const balanceLamports = await connection.getBalance(publicKey);
      const balanceSol = balanceLamports / 1e9;
      console.log("balance sol", balanceSol);
      if (balanceSol < 0.0001) {
        setLoading(false);
        CustomToast("error", "Insufficient balance. You need at least 2 SOL.");
        return;
      }
      const recipientPubKey = new PublicKey(
        "6XNCSarmLsB4rz4BDwJ2PTCQwF5Jc99LL13f67ozWUuo"
      );
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: 2 * 1e9,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      CustomToast(
        "success",
        "The transaction is being signed, please do not refresh the page."
      );

      const isFinalized = await startPolling(signature, connection);

      CustomToast(
        "success",
        "The transaction has been successfully signed. Your NFT is being transferred to your wallet. Please do not refresh the page."
      );
      if (isFinalized) {
        await ApiRequest.mintNFT({
          mint_address: publicKey,
          transaction_id: signature,
        }).then((res) => {
          setIsBuyed(true);
          CustomToast("success", "Purchase completed successfully");
          setLoading(false);
          setTimeout(() => {
            router.push("/my-cnfts");
          }, 15000);
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (
        error instanceof Error &&
        error.message.includes("User rejected the request")
      ) {
        CustomToast("error", "The purchase transaction has been canceled.");
      } else {
        CustomToast("error", "An unexpected error occurred.");
      }
    }
  };

  const handleBuyNFT = async () => {
    await ApiRequest.check().then((res: any) => {
      console.log("res", res);
      if (res.data.check === 1) {
        sendSolToRecipient();
      } else {
        CustomToast("error", "Sorry, all NFTs have been sold");
      }
    });
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
      }}>
      <ConfettiEffect isBuyed={isBuyed} />
      <div className="position-relative">
        <NFTCard
          name={name}
          className={`${theme}`}
          tokenId={1}
          price={{
            value: BigInt("2000000000000000000"),
            symbol: "SOL",
            icon: <img src="/icons/sol.png" className="currency-logo" />,
          }}
          description={description}
          showAction
          actionText={"BUY"}
          onActionClick={() => {
            if (publicKey) {
              handleBuyNFT();
            } else {
              CustomToast(
                "error",
                "Please connect your wallet to the left using the button at the top right."
              );
            }
          }}
          image={"/nfts.gif"}
        />
        {loading && <Loader />}
      </div>
    </ConfigProvider>
  );
};

export default MockNftCard;
