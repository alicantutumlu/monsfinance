import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const ChatPageView = dynamic(() => import("../../views/chat-nft-pack"), {
  ssr: false,
});

const ChatPage = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <ChatPageView />
    </Suspense>
  );
};

export default ChatPage;
