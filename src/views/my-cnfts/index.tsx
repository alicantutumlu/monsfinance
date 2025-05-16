import React from "react";
import Header from "../../components/Layout/header";
import HowToBuyNft from "../../components/HowToBuyNft";
import MyNFTsComponent from "../../components/MyNFTsComponent";

const MyCNftsPage = () => {
  return (
    <>
      <Header scrollToRoadMap={() => false} />
      <MyNFTsComponent />
    </>
  );
};

export default MyCNftsPage;
