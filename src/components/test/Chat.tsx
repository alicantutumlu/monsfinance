import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ApiRequest } from "../../api";
import { useRouter } from "next/navigation";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ConfigProvider, theme } from "antd";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../Loader";
import ConfettiEffect from "../Confetti";
import { NFTCard } from "@ant-design/web3";

const { defaultAlgorithm, darkAlgorithm } = theme;

const Chat = ({ nftsData, setNftsData, isBuyed, setIsBuyed }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const messageInputRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [loadingText, setLoadingText] = useState("Response is being generated");
  const userData: any = "";
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const { theme } = useTheme();

  const name = "MonsFinance Bundle NFT";
  const description = "MonsFinance featured NFT collection.";

  // **Animasyonlu "Yanıt oluşturuluyor" metni**
  useEffect(() => {
    let interval: number | undefined;
    if (generatingAnswer) {
      interval = setInterval(() => {
        setLoadingText((prev) => {
          if (prev === "Response is being generated...")
            return "Response is being generated";
          return prev + ".";
        });
      }, 500); // Her 500ms'de bir "." ekle
    } else {
      setLoadingText("Response is being generated");
    }
    return () => clearInterval(interval);
  }, [generatingAnswer]);

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // **Mesaj gönderme fonksiyonu**
  const sendMessage = () => {
    const message: any = question.trim();
    if (message) {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { type: "replies", content: message },
        { type: "sent", content: loadingText, isLoading: true }, // Geçici mesaj
      ]);
      setQuestion("");
      setGeneratingAnswer(true);
      setTimeout(() => generateAnswer(message), 2000); // 2 saniye bekle
    }
  };

  // **Statik yanıt oluşturma fonksiyonu**
  const generateAnswer = (message: any) => {
    // Geçici mesajı kaldır
    setMessages((prevMessages: any) =>
      prevMessages.filter((msg: any) => !msg.isLoading)
    );

    if (message.toLowerCase().includes("nft")) {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          type: "sent",
          content:
            "You can purchase one of the unique NFT bundle packs offered by MonsFinance. Here's a special opportunity just for you!",
        },
        {
          type: "nft",
          component: (
            <MockNftCard
              isBuyed={isBuyed}
              setIsBuyed={setIsBuyed}
              theme={theme}
              name={name}
              description={description}
              publicKey={publicKey}
              connection={connection}
              sendTransaction={sendTransaction}
              router={router}
              onNotification={handleNotification}
            />
          ),
        },
      ]);
    } else {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        {
          type: "sent",
          content: "Please enter a message related to the topic.",
        },
      ]);
    }
    setGeneratingAnswer(false);
  };

  const handleNotification = (type: any, message: any) => {
    setMessages((prevMessages: any) => [
      ...prevMessages,
      { type: "notification", content: message },
    ]);
  };

  // **NFT Kartı Bileşeni**
  const MockNftCard = ({
    theme,
    name,
    description,
    publicKey,
    isBuyed,
    setIsBuyed,
    connection,
    sendTransaction,
    router,
    onNotification,
  }: any) => {
    const [loading, setLoading] = useState(false);

    // **SOL gönderme işlemi**
    const sendSolToRecipient = async () => {
      setLoading(true);
      onNotification(
        "success",
        "The process has started, please do not refresh the page, there may sometimes be delays due to network congestion."
      );
      if (!publicKey || !connection) {
        setLoading(false);
        onNotification(
          "error",
          "Please connect your wallet to the left using the button at the top right."
        );
        return;
      }

      try {
        const balanceLamports = await connection.getBalance(publicKey);
        const balanceSol = balanceLamports / 1e9;
        if (balanceSol < 0.01) {
          setLoading(false);
          onNotification(
            "error",
            "Insufficient balance. You need at least 0.01 SOL."
          );
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
        onNotification(
          "success",
          "The transaction is being signed, please do not refresh the page."
        );

        const isFinalized = await startPolling(signature, connection);
        onNotification(
          "success",
          "The transaction has been successfully signed. Your NFT is being transferred to your wallet. Please do not refresh the page."
        );

        if (isFinalized) {
          await ApiRequest.mintNFT({
            mint_address: publicKey,
            transaction_id: signature,
          }).then((res) => {
            setIsBuyed(true);
            onNotification("success", "Purchase completed successfully");
            setLoading(false);
            setNftsData(res.data);
          });
        }
      } catch (error) {
        setLoading(false);
        if (
          error instanceof Error &&
          error.message.includes("User rejected the request")
        ) {
          onNotification(
            "error",
            "The purchase transaction has been canceled."
          );
        } else {
          onNotification("error", "An unexpected error occurred.");
        }
      }
    };

    // **NFT satın alma işlemi**
    const handleBuyNFT = async () => {
      await ApiRequest.check().then((res) => {
        if (res.data.check === 1) {
          sendSolToRecipient();
        } else {
          onNotification("error", "Sorry, all NFTs have been sold");
        }
      });
    };

    return (
      <div className="">
        <ConfigProvider
          theme={{
            algorithm: theme === "light" ? defaultAlgorithm : darkAlgorithm,
          }}>
          <ConfettiEffect isBuyed={isBuyed} />
          <div className="position-relative chat">
            <NFTCard
              name={name}
              className={theme}
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
                  onNotification(
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
      </div>
    );
  };

  // **İşlem durumunu kontrol etme**
  const checkTransactionStatus = async (signature: any, connection: any) => {
    try {
      const { value } = await connection.getSignatureStatuses([signature]);
      if (value && value[0] && value[0].confirmationStatus === "finalized") {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return false;
    }
  };

  // **Polling ile işlem durumunu takip etme**
  const startPolling = async (signature: any, connection: any) => {
    let isFinalized = false;
    while (!isFinalized) {
      isFinalized = await checkTransactionStatus(signature, connection);
      if (!isFinalized) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    return true;
  };

  // **JSX Render**
  return (
    <div className="bootstrap-container mt-5">
      <div id="frame">
        <div className="content">
          {messages.length > 0 ? (
            ""
          ) : (
            <>
              <div className="d-flex align-items-center justify-content-center h-100">
                <span className="text-center w-100 page-main-title text-white">
                  What can I help with?
                </span>
              </div>
            </>
          )}
          <div className="messages">
            <ul>
              {messages.map((message: any, index: any) => (
                <li key={index} className={message.type}>
                  {message.type === "replies" && (
                    <>
                      {userData?.user_logo_image ? (
                        <img
                          src={userData.user_logo_image}
                          alt=""
                          className="me"
                        />
                      ) : (
                        <img
                          src="/images/null-user.png"
                          alt=""
                          className="me"
                        />
                      )}
                      <p>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </p>
                    </>
                  )}
                  {message.type === "sent" && (
                    <>
                      <img src="/icons/ai-chat-icon.svg" alt="" />
                      <p>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </p>
                    </>
                  )}
                  {message.type === "notification" && (
                    <p className="notification text-white">{message.content}</p>
                  )}
                  {message.type === "nft" && <div>{message.component}</div>}
                </li>
              ))}
            </ul>
          </div>
          <div className="message-input">
            <div className="wrap">
              <div>
                <input
                  className="custom-input boxShadow-v3"
                  type="text"
                  disabled={generatingAnswer}
                  ref={messageInputRef}
                  placeholder="Send a message"
                  onKeyPress={handleKeyPress}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  className="position-absolute"
                  style={{ top: 10, right: 10 }}
                  onClick={sendMessage}>
                  <img src="/icons/send-ic.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
