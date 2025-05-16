import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const WhiteList = dynamic(() => import("../../views/whitelist"), {
  ssr: false,
});

const WhiteListPage = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <WhiteList />
    </Suspense>
  );
};

export default WhiteListPage;
