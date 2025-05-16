import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const AgentPage = dynamic(() => import("../../views/agent"), {
  ssr: false,
});

const Agent = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <AgentPage />
    </Suspense>
  );
};

export default Agent;
