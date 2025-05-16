import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const NFTSPage = dynamic(() => import("../../views/my-cnfts"), {
  ssr: false,
});

const MycNFTs = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <NFTSPage />
    </Suspense>
  );
};

export default MycNFTs;
