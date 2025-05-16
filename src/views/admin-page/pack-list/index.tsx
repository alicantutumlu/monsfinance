import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { ApiRequest } from "../../../api";
import UserContext from "../../../context/UserContext";
export const PackList = () => {
  const router = useRouter();
  const { userWalletContext, setUserWalletContext } = useContext(
    UserContext
  ) || {
    userWalletContext: null,
    setUserWalletContext: null,
  };
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (userWalletContext) {
      ApiRequest.getAllLootBox()
        .then((res) => {
          const sortedData = res.data.sort(
            (a: any, b: any) => b.createdDate - a.createdDate
          );
          setTableData(sortedData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userWalletContext]);
  return (
    <>
      <div className="mb-4 responsiveFlex justify-content-between align-items-center">
        <div>
          <p className="mid18">
            You can manage all packages in the system on the Package Listing
            page.
          </p>
        </div>

        <div className="d-flex">
          <button
            onClick={() => {
              router.push("/admin-page#create");
            }}
            className="primaryButton packList">
            <span>
              <img src="/icons/plus-white.svg" alt="" />
            </span>{" "}
            Create New
          </button>
        </div>
      </div>

      <div style={{ overflow: "auto" }}>
        <table className="table">
          <thead className="mydeneme">
            <tr>
              <th scope="col">Contract Address</th>
              <th scope="col">Label</th>
              <th scope="col">Price</th>
              <th scope="col">Added Date</th>
              <th scope="col">Status</th>
              {/* <th scope="col"></th> */}
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item: any, index: any) => (
              <tr className="mid18 trConst">
                <td>{item?.contractAddress}</td>
                <td>{item?.packName}</td>
                <td>{item?.packPrice} Sol</td>
                <td>
                  {new Date(item?.createdDate * 1000).toLocaleDateString()}
                </td>
                <td>{item?.buyerWalletAddress ? "Sold" : "On Sale"}</td>
                {/* <td className="d-flex align-items-center gap-2 justify-content-end">
                  <img
                    className="blackWhiteFilter c-pointer"
                    src="/icons/edit.svg"
                    alt=""
                  />
                  <img
                    className="danger c-pointer"
                    src="/icons/bus.svg"
                    alt=""
                  />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PackList;
