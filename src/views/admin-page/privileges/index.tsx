import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-bootstrap";
import Input from "../../../components/Input";
import { ApiRequest } from "../../../api";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BigNumber, Contract, ethers } from "ethers";
import {
  Abi_Supply,
  Binary_Supply,
} from "../../../contracts/SupplyTokenContract";
import UserContext from "../../../context/UserContext";
export const Privileges = () => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { userWalletContext, setUserWalletContext }: any = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };
  const createFormik = useFormik({
    initialValues: {
      tokenName: "",
      tokenSymbol: "",
      tokenAmount: 0,
    },

    onSubmit: async (values: any) => {
      try {
        const { ethereum } = window as any;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ContractFactory = new ethers.ContractFactory(
          Abi_Supply,
          Binary_Supply,
          signer
        );

        const TokenContract = await ContractFactory.deploy(
          userWalletContext,
          values.tokenName,
          values.tokenSymbol,
          BigInt(Math.round(Number(values.tokenAmount) * 1e18))
        );

        const createTokenReqBody = {
          tokenName: values.tokenName,
          tokenSymbol: values.tokenSymbol,
          tokenContractAddress: TokenContract.address,
          tokenAmount: values.tokenAmount,
        };
        await ApiRequest.tokenCreate(createTokenReqBody)
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
            setTrigger(!trigger);
            handleCloseModal();
          })
          .catch((err) => {
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
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleDeleteToken = (id: any) => {
    ApiRequest.tokenDelete({ id: id })
      .then((res) => {
        toast.success("Token delete success", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          autoClose: 3000,
        });
        setTrigger(!trigger);
      })
      .catch((err) => {
        toast.error("Token delete error", {
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
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const fetchData = async () => {
    try {
      const res = await ApiRequest.getAllTokens();
      const { ethereum } = window as any;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const hold: any = [...res.data];
      for (let i = 0; i < hold.length; i++) {
        try {
          const contract: Contract = new ethers.Contract(
            hold[i].tokenContractAddress,
            Abi_Supply,
            signer
          );

          const response = await contract.balanceOf(userWalletContext);
          const decimalData = parseInt(response._hex, 16);

          const result = decimalData / Math.pow(10, 18);

          hold[i].remainingToken = `${result} ${hold[i].tokenSymbol}`;
        } catch (e) {}
      }

      setTableData(hold);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [trigger]);

  const deneme = async (contractAddress: any) => {
    const { ethereum } = window as any;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract: Contract = new ethers.Contract(
      contractAddress,
      Abi_Supply,
      signer
    );

    const response = await contract.balanceOf(userWalletContext);
    const decimalData = parseInt(response._hex, 16);

    const result = decimalData / Math.pow(10, 18);
    return result;
  };
  return (
    <>
      {/* <button onClick={() => { deneme() }}>emre</button> */}
      <div className="mb-4 responsiveFlex justify-content-between align-items-center">
        <div>
          <p className="mid18">
            Create and manage new tokens on the Token page
          </p>
        </div>

        <div className="d-flex">
          <button
            onClick={() => {
              handleOpenModal();
            }}
            className="primaryButton packList">
            <span>
              <img src="/icons/plus-white.svg" alt="" />
            </span>{" "}
            Add New Token
          </button>
        </div>
      </div>

      <div style={{ overflow: "auto" }}>
        <table className="table">
          <thead className="mydeneme">
            <tr>
              <th scope="col">Token Name</th>
              <th scope="col">Token Symbol</th>
              <th scope="col">Contract Address</th>
              <th scope="col">Remaining</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any, index) => (
              <tr className="mid18 trConst">
                <td>{item?.tokenName}</td>
                <td>{item?.tokenSymbol}</td>
                <td>{item?.tokenContractAddress}</td>
                <td>
                  {item?.remainingToken ? item.remainingToken : "Loading..."}
                </td>
                <td className="d-flex align-items-center gap-2 justify-content-end">
                  <img
                    onClick={() => {
                      handleDeleteToken(item?.id);
                    }}
                    className="danger c-pointer"
                    src="/icons/bus.svg"
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={isOpenModal} onHide={handleCloseModal} centered>
        <Modal.Body className="myModal">
          <p className="headerText">Create Token</p>
          <Input
            inputValue={createFormik.values.tokenName}
            formik={createFormik}
            value="tokenName"
            title={"Token Name"}></Input>
          <div className="mt-2">
            <Input
              inputValue={createFormik.values.tokenSymbol}
              formik={createFormik}
              value="tokenSymbol"
              title={"Token Symbol"}></Input>
          </div>

          <div className="mt-2">
            <Input
              inputValue={createFormik.values.tokenAmount}
              formik={createFormik}
              value="tokenAmount"
              isNumber={true}
              title={"Token Supply Amount"}></Input>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={() => {
                createFormik.handleSubmit();
              }}
              className="primaryButton packList w-100 ">
              Create
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Privileges;
