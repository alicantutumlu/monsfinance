import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const TestPage = dynamic(() => import("../../views/test"), {
  ssr: false,
});

const Test = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <TestPage />
    </Suspense>
  );
};

export default Test;
