import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const AnalysePage = dynamic(() => import("../../views/analyse"), {
  ssr: false,
});

const Analyse = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <AnalysePage />
    </Suspense>
  );
};

export default Analyse;
