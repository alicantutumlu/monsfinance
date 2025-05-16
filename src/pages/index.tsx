import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../components/Loader";

const MainView = dynamic(() => import("../views/index"), {
  ssr: false,
});

const Main = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <MainView />
    </Suspense>
  );
};

export default Main;
