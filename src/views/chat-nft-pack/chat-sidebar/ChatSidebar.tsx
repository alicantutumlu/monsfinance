import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import Toolbar from "../../../components/toolbar/Toolbar";

interface IIsanalyseProps {
  isAnalyse?: any;
  formik?: any;
}
const ChatSidebar: React.FC<IIsanalyseProps> = ({ isAnalyse, formik }: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const agentId = searchParams.get("title");

  // const agents = [
  //   {
  //     id: "Transaction Execution Agent",
  //     image: "/nfts.gif",
  //     title: "Buy Bundle MonsNFT Pack Agent",
  //     description:
  //       "The Agent simplifies NFT transactions, allowing you to effortlessly acquire Mons Bundle NFTs through chat. Just type your request, and the agent will handle the purchase for you.",
  //     href: "/chat?title=transaction-execution-agent",
  //   },
  //   {
  //     id: "Price Analyst",
  //     image: "/images/hip.png",
  //     title: "Image Generator Agent",
  //     description:
  //       "The Image Generator Agent is an AI-powered tool that transforms brief user prompts into diverse visuals.",
  //     href: "/chat?title=image-generator-agent",
  //   },
  //   {
  //     id: "Price Analyst",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/researcher.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250314%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T115240Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=358345d01098dc06694eb155817ff661a985efaa447af87a7b3cc39340a6231e",
  //     title: "Analyse Agent",
  //     description:
  //       "This agent allows you to perform detailed analysis using AI.",
  //     href: "/analyse",
  //   },
  //   {
  //     id: "Transaction Execution Agent",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/avatar.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250314%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T115240Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=9eefe3ab3da1ed4059b95948c21cfcfa1d42589a85a070ed0539ef27a546ae94",
  //     title: "Transaction Execution Agent",
  //     description:
  //       "The Agent makes blockchain operations simple through chat. Type your request—whether it's sending or swapping —and the agent will handle it for you.",
  //     href: "/chat?title=transaction-execution-agent",
  //   },
  //   {
  //     id: "Price Analyst",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/90c6b451-c92f-4730-9205-ac9be41aa174.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250313%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250313T072321Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c9f217edd7ad24ba1b88b3a3e55fc0a6cc25a236c7d2094f9c79fc05f4946dbf",
  //     title: "Price Analyst",
  //     description:
  //       "Prepare for the bull run with in-depth crypto price analysis powered by our specialized AI agent. Uncover crypto opportunities—all in just seconds!",
  //     href: "/chat-nft-pack",
  //   },
  //   {
  //     id: "Transaction Execution Agent",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/DeepSeek.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250314%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T115240Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=17a1104a73bf0128765ba0024dc6a388dc6937ddb91835fd8ee82c1250d503b8",
  //     title: "DeepSeek R1 Agent",
  //     description:
  //       "DeepSeek R1 Agent is designed to assist with advanced reasoning, coding, solving mathematical problems and translating text across multiple languages.",
  //     href: "/chat-nft-pack",
  //   },
  //   {
  //     id: "Price Analyst",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/news.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250313%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250313T072041Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5f1a2f8fad3b307fcb1524a28271faf539342bd53296a7b8d25874a6b30abd8d",
  //     title: "Crypto News Agent",
  //     description:
  //       "Get concise WEB3 news directly from our News Agent — better than Google results.",
  //     href: "/chat-nft-pack",
  //   },
  //   {
  //     id: "Transaction Execution Agent",
  //     image:
  //       "https://contributor-program-be-s3.s3.amazonaws.com/media/image_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3FLDZHNDKZNBLWIX%2F20250314%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250314T115240Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ad007bebbe7fade6069f11deb96567155a2e54012b6cbdbd51f050deff3c60e7",
  //     title: "Wild Llama Agent",
  //     description:
  //       "Chat with an unrestricted AI agent on any controversial topic and get answers you won’t find anywhere else. For adults only.",
  //     href: "/chat-nft-pack",
  //   },

  //   // Diğer ajanlar burada eklenebilir
  // ];
  // const matchedAgent: any = agents.find(
  //   (agent) => agent.href === `${pathname}?title=${agentId}`
  // );

  return (
    <div className="my-2">
      {isAnalyse && <Toolbar formik={formik} />}
      {!isAnalyse && (
        <>
          <img className="mx-2 mt-2" src="/mons/logo-mons.svg" />
          <div style={{ marginTop: "60px" }} className="chat-sidebar-bg mx-4">
            {/* <div className="flex flex-col gap-3">
              <img className="image-size" src={matchedAgent?.image} />
              <p className="title-text">{matchedAgent?.title}</p>
              <div className="mt-4">
                <p className="subtitle-text">CAPABILITIES</p>
                <p className="normal-text">{matchedAgent?.description}</p>
              </div>
              <div>
                <p className="subtitle-text">Usage Recommendations</p>
                <p className="normal-text">
                  For accurate results, specify the currency, names, events, and
                  time frames you're interested in.
                </p>
              </div>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatSidebar;
