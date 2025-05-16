import React, { useEffect, useState } from "react";
import { useTheme } from "../../../context/ThemeContext";
import MockNftCard from "../../MockNFTCard";
import Pack from "../../Pack";
import { ApiRequest } from "../../../api";
import CtaSection from "../CtaSection/CtaSection";
import Footer from "../../Layout/Footer";
import CardSection from "../../CardSection";
import RoadMapSection from "../../RoadMapSection";

import { toast } from "react-toastify";

const NTFSection = ({
  roadMapRef,
}: {
  roadMapRef: React.RefObject<HTMLDivElement>;
}) => {
  const { theme } = useTheme();
  const [allLoootBox, setAllLootBox] = useState([]);
  const [trigger, setTrigger] = useState(false);
  // useEffect(() => {
  //   ApiRequest.getAllLootBox()
  //     .then((res) => {
  //       setAllLootBox(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [trigger]);

  return (
    <div
      style={
        theme === "dark"
          ? { background: "url('/mons/bodyBgDark.svg')" }
          : { background: "url('/mons/bodyBgLight.svg')" }
      }
      className="bodyBackground"
    >
      <div className="homeContainer">
        <CardSection />
        <RoadMapSection roadMapRef={roadMapRef} />
        <div id="BuyNFT" className="row d-flex mt-5">
          {/* <div className="mobileContainer">
            <div className="middleHead mb-5">
              NFT Collection Launches on{" "}
              <span style={{ color: "#f2b12e" }}> January 27th!</span>
            </div>
          </div>

          <div className="col-lg-12 d-flex marginResponsive justify-content-center">
            <MockNftCard index={1} />
          </div> */}

          <div className="homeContainer " style={{ paddingTop: "0px" }}>
            <CtaSection />
          </div>
        </div>
        {/* <div style={{ marginTop: "150px" }}>
          <div className="mobileContainer middleHead mb-2">
            MonsFinance Featured <span className="colorfull">NFT</span>{" "}
            Collection
          </div>
          <div className="mt-5 row d-flex justify-content-center">
            {allLoootBox?.map((item: any, index: number) => {
              if (item?.buyerWalletAddress === "") {
                return (
                  <div
                    key={index}
                    className="col-lg-4 mb-4 d-flex justify-content-center">
                    <Pack
                      packName={item?.packName}
                      packPrice={item?.packPrice}
                      packImage={item?.packImage}
                      packDescription={item?.packDescription}
                      ownerWalletAddress={item?.ownerWalletAddress}
                      id={item?.id}
                      trigger={trigger}
                      setTrigger={setTrigger}></Pack>
                  </div>
                );
              }
            })}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="moreButton">Load More</button>
          </div>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default NTFSection;
