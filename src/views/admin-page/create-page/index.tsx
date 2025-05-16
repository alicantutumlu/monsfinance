import React, { useState, useContext, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import stepList from "../../../assets/json/stepList.json";
import Step1 from "./step-item/step1";
import Step2 from "./step-item/step2";
import Step3 from "./step-item/step3";
import { useFormik } from "formik";
import { ApiRequest } from "../../../api";
import { toast } from "react-toastify";
import { BigNumber, Contract, ethers } from "ethers";
import {
  ABI_Lootbox,
  Binary_Lootbox,
} from "../../../contracts/LootBoxNftContract";
import { Abi_Token, Binary_Token } from "../../../contracts/TokenContract";
import { Abi_Supply } from "../../../contracts/SupplyTokenContract";

import UserContext from "../../../context/UserContext";
import { useRouter } from "next/router";
import Loader from "../../../components/Loader";
export const CreatePage = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [packAmount, setPackAmount] = useState();
  const [isLoader, setIsLoader] = useState(false);
  const activeElement = stepList[activeStep];
  const { userWalletContext, setUserWalletContext }: any = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };

  useEffect(() => {
    ApiRequest.getAllLootBox()
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const createFormik = useFormik({
    initialValues: {
      selectToken: [
        {
          name: "",
          tokenContractAddress: "",
          amount: "",
        },
      ],
      packName: "",
      packPrice: "",
      packDescription: "",
      packImage: "",
    },

    onSubmit: async (values: any) => {
      try {
        setIsLoader(true);
        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // const tokenAddress = '0x1B522b7f447411263A1ae6b18D3B0F55457A76D5'
        const ContractFactory = new ethers.ContractFactory(
          ABI_Lootbox,
          Binary_Lootbox,
          signer
        );

        const LootContract = await ContractFactory.deploy(
          "Mons Token",
          "Mons",
          "http://basetokenuri.com/"
        );

        const allTokenAddress: any = [];
        const allTokenPrice: any = [];
        values.selectToken.map(async (item: any, index: any) => {
          const contract: Contract = new ethers.Contract(
            item.tokenContractAddress,
            Abi_Supply,
            signer
          );
          allTokenAddress.push(item.tokenContractAddress);
          allTokenPrice.push(BigInt(Math.round(item.amount * 1e18)).toString());
          const approve = await contract.approve(
            LootContract.address,
            BigInt(Math.round(item.amount * 1e18)).toString()
          );
          // const allowance = await contract.increaseAllowance(
          //   LootContract.address,
          //   BigInt(Math.round(item.amount * 1e18)).toString()
          // );
        });

        const lootboxResponse = await LootContract.createLootBox(
          userWalletContext,
          [],
          [],
          [],
          [],
          [],
          allTokenAddress,
          allTokenPrice
        );
        console.log("lootbox respone", lootboxResponse);
        const createLootBoxReqBody = {
          selectToken: values.selectToken,
          packName: values.packName,
          packPrice: values.packPrice,
          packDescription: values.packDescription,
          packImage: values.packImage,
          ownerWalletAddress: userWalletContext,
          contractAddress: LootContract.address,
          boxId: "0",
        };
        await ApiRequest.createLootBox(createLootBoxReqBody)
          .then((res) => {
            toast.success("Create success", {
              position: "top-right",
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
              autoClose: 3000,
            });
            setIsLoader(false);
            router.push("/admin-page#pack-list");
          })
          .catch((err) => {
            setIsLoader(false);
            toast.error("Create fail", {
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
      } catch (e) {
        console.log(e);
        setIsLoader(false);
        toast.error("Create Error", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          autoClose: 3000,
        });
      }
    },
  });

  return (
    <div className="row">
      <div className="col-lg-3">
        <Stepper
          steps={stepList}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>
      <div className="col-lg-9 ">
        {isLoader ? (
          <Loader></Loader>
        ) : (
          <>
            <h2>{activeElement?.step}</h2>
            <p className="thick20 primary mb-3">{activeElement?.name}</p>
            <h3>{activeElement?.desc}</h3>

            {activeStep === 0 && <Step1 createFormik={createFormik}></Step1>}
            {activeStep === 1 && (
              <Step2
                packAmount={packAmount}
                setPackAmount={setPackAmount}
                createFormik={createFormik}></Step2>
            )}
            {activeStep === 2 && <Step3 createFormik={createFormik}></Step3>}

            <div className="mt-5 w-100 d-flex justify-content-end align-items-center gap-5">
              {activeStep !== 0 && (
                <p
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                  className="thick20 purple c-pointer">
                  Back
                </p>
              )}
              {activeStep === stepList.length - 1 ? (
                <button
                  onClick={() => {
                    createFormik.handleSubmit();
                  }}
                  className="mainButton stepper">
                  Finish
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                  className="mainButton stepper">
                  Next Step
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
