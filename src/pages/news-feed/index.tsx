import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const NewsPage = dynamic(() => import("../../views/news-feed"), {
  ssr: false,
});

const Test = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <NewsPage />
    </Suspense>
  );
};

export default Test;
