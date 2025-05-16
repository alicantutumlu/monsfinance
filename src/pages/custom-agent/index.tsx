import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const CustomAgentPageView = dynamic(
  () => import("../../views/custom-agent/index"),
  {
    ssr: false,
  }
);

const CustomAgentPage = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <CustomAgentPageView />
    </Suspense>
  );
};

export default CustomAgentPage;
