import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const WalletPage = dynamic(() => import("../../views/wallet"), {
  ssr: false,
});

const Wallet = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <WalletPage />
    </Suspense>
  );
};

export default Wallet;
