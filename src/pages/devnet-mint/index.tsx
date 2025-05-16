import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import AppLoader from "../../components/Loader";

const DeckPageView = dynamic(() => import("../../views/devnet-mint"), {
  ssr: false,
});

const AdminPage = () => {
  return (
    <Suspense fallback={<AppLoader />}>
      <DeckPageView />
    </Suspense>
  );
};

export default AdminPage;
