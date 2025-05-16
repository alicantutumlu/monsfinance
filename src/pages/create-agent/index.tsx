import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const CreateAgentPage = dynamic(() => import("../../views/create-agent"), {
  ssr: false,
});

const CreateAgent = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <CreateAgentPage />
    </Suspense>
  );
};

export default CreateAgent;
