import React, { useContext, useEffect, useRef, useState } from "react";
import Pack from "../../components/Pack";
import UserContext from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import Header from "../../components/Layout/header";
import { toast } from "react-toastify";
import HowToBuyNft from "../../components/HowToBuyNft";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";
import bs58 from "bs58";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Helius } from "helius-sdk";
import CustomToast from "../../components/CustomToast";
export const main = () => {
  const recipientWallet = "AP2QxiWbQhER8moaSbGSWnr9EXaxNXtsnLGwwWdBKQUV";
  const helius = new Helius("3381d88a-0c68-4444-9daa-31a94ae3906d");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [apiUrl, setApiUrl] = React.useState<string>("");
  const [nft, setNft] = React.useState<string>("");
  const [nftImage, setNftImage] = React.useState<string>("");
  const roadMapRef = useRef<HTMLDivElement>(null);
  const scrollToRoadMap = () => {
    roadMapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const secretKeyArray = [
    5, 87, 151, 107, 236, 209, 190, 161, 240, 208, 25, 174, 125, 246, 122, 207,
    10, 141, 168, 108, 75, 187, 128, 100, 129, 246, 234, 13, 178, 9, 217, 175,
    110, 121, 38, 11, 193, 100, 198, 3, 87, 203, 200, 61, 100, 113, 249, 66, 69,
    183, 182, 145, 90, 162, 146, 65, 76, 8, 71, 58, 245, 102, 126, 200,
  ];

  const privateKeyBase58 = bs58.encode(secretKeyArray);

  const fetchMetadata = async () => {
    const response = await fetch("/metadata.json");
    const metadata = await response.json();
    return metadata[Math.floor(Math.random() * metadata.length)];
  };
  const sendSolToRecipient = async () => {
    if (!publicKey || !connection) {
      toast.error("Cüzdan bağlı değil veya bağlantı yok");
      return;
    }

    try {
      const recipientPubKey = new PublicKey(recipientWallet);

      // Transaction için 0.1 SOL gönderme
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: 2 * 1e9, // 1 SOL = 10^9 Lamports
        })
      );

      // İşlemi gönder
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
      toast.success("0.1 SOL başarıyla gönderildi");
    } catch (error) {
      console.error("Hata oluştu:", error);
      toast.error("SOL gönderiminde hata oluştu");
      throw error;
    }
  };

  const mintCompressedNft = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      // 2 SOL gönder

      // await sendSolToRecipient();

      const metadata = await fetchMetadata();
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "helius-fe-course",
          method: "mintCompressedNft",
          params: {
            collection: "GAkPK9cLd3cth5goreRhDSivoAa7kT5Tky4SHYsAaRRz",
            name: metadata.name,
            symbol: metadata.symbol,
            owner: publicKey,
            description: metadata.description,
            attributes: metadata.attributes,
            imageUrl: metadata.imageUrl,
            externalUrl: metadata.externalUrl,
            sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
          },
        }),
      });

      const { result } = await response.json();

      if (!result) {
        CustomToast("error", "An error occurred while minting the NFT");

        throw "Mint işlemi başarısız oldu";
      }

      setNft(result.assetId);

      setTimeout(() => {
        fetchNFT(result.assetId, event);
      }, 3000);
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  const fetchNFT = async (
    assetId: string,
    event: { preventDefault: () => void }
  ) => {
    // prevent app from reloading
    event.preventDefault();

    // api call to fetch nft
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "applicaiton/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "my-id",
        method: "getAsset",
        params: {
          id: assetId,
        },
      }),
    });

    // extrapolate api response
    const { result } = await response.json();

    setNftImage(result.content.links.image);

    // return api result
    return { result };
  };

  // display function outputs to ui
  const outputs = [
    {
      title: "Asset ID...",
      dependency: nft,
      href: `https://xray.helius.xyz/token/${nft}?network=devnet`,
    },
  ];

  // set api url onload
  // React.useEffect(() => {
  //   setApiUrl(
  //     connection.rpcEndpoint.includes("devnet")
  //       ? "https://devnet.helius-rpc.com/?api-key=3381d88a-0c68-4444-9daa-31a94ae3906d"
  //       : "https://devnet.helius-rpc.com/?api-key=3381d88a-0c68-4444-9daa-31a94ae3906d"
  //   );
  // }, [connection]);

  React.useEffect(() => {
    setApiUrl(
      "https://devnet.helius-rpc.com/?api-key=3381d88a-0c68-4444-9daa-31a94ae3906d"
    );
  }, [connection]);
  return (
    <>
      <Header scrollToRoadMap={scrollToRoadMap} />
      <div className="pt-5 mt-5">
        <main className="dev-container">
          <form onSubmit={(event) => mintCompressedNft(event)} className="form">
            <div className="form-header">
              <h2 className="title">cNFT Minter 🖼️</h2>
              <button
                type="submit"
                className="submit-button"
                disabled={!publicKey || !connection}>
                Mint
              </button>
            </div>

            <div className="outputs">
              <ul className="outputs-list">
                {outputs.map(({ title, dependency, href }, index) => (
                  <li
                    key={title}
                    className={`output-item ${
                      index !== 0 ? "output-item-spacing" : ""
                    }`}>
                    <p className="output-title">{title}</p>
                    {dependency && (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="output-link">
                        {dependency.toString().slice(0, 25)}... ICON
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nft-preview">
              {nftImage ? (
                <img
                  width={300}
                  height={300}
                  src={nftImage}
                  className="nft-image"
                />
              ) : (
                <p className="nft-placeholder">NFT Image Goes Here</p>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default main;
