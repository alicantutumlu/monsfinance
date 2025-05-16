import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { ApiRequest } from "../../../api";
import UserContext from "../../../context/UserContext";
import { BigNumber, Contract, ethers } from "ethers";
import { toast } from "react-toastify";
import {
  ABI_Lootbox,
  Binary_Lootbox,
} from "../../../contracts/LootBoxNftContract";
export const Claim = () => {
  const router = useRouter();
  const { userWalletContext, setUserWalletContext } = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };
  const [tableData, setTableData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    if (userWalletContext) {
      ApiRequest.getPackById(userWalletContext)
        .then((res) => {
          const sortedData = res.data.sort(
            (a: any, b: any) => b.buyedDate - a.buyedDate
          );
          setTableData(sortedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userWalletContext, trigger]);

  const openLootBox = async (contractAddress: any, boxId: any, id: any) => {
    try {
      const { ethereum } = window as any;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract: Contract = new ethers.Contract(
        contractAddress,
        ABI_Lootbox,
        signer
      );

      const openResponse = await contract.openLootBox(
        BigInt(Math.round(Number(boxId))).toString()
      );

      ApiRequest.claimPack({ packId: id })
        .then((res) => {
          setTrigger(!trigger);
          toast.success("Claim successful", {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            autoClose: 3000,
          });
        })
        .catch((err) => {
          toast.error("Claim fail", {
            position: "top-right",
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
            autoClose: 3000,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {tableData.map((item: any, index: any) => (
        <div key={index} className="claimBox">
          <img className="imageContainer" src={item?.packImage} alt="" />
          <div className="row w-100 px-4 py-2">
            <div className="area col-md-6">
              <p className="mid18 w500 title mb-3">{item?.packName}</p>
              <p className="thick16 w300 title mb-3">{item?.packDescription}</p>
              <div className="token d-flex gap-2 align-items-center">
                <img
                  width={24}
                  height={24}
                  src="/icons/sol.png"
                  className="currency-logo"
                  alt=""
                />
                <p className="thick16 w300 title">{item?.packPrice} Sol</p>
              </div>
            </div>
            <div className="area col-md-2">
              <p className="mid18 w500 title mb-3">My Allocation</p>
              <div style={{ maxHeight: "200px", overflow: "auto" }}>
                {item?.selectToken.map((itm: any, index: any) => (
                  <p className="thick16 w300 title mb-3">
                    {itm?.amount} {itm.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="col-md-4 claimBtnBox">
              {item?.isClaimed ? (
                <button className="transparentButton claim">Claimed</button>
              ) : (
                <button
                  onClick={() => {
                    openLootBox(item?.contractAddress, item?.boxId, item?.id);
                  }}
                  className="mainButton stepper">
                  Claim
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Claim;
