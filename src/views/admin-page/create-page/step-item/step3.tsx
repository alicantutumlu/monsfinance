import React from "react";
import Pack from "../../../../components/Pack";
export const Step3 = ({ createFormik }: any) => {
  return (
    <>
      <p className="thick20 w300 primary mt-4 mb-4">Selected Tokens</p>
      <div className="row">
        {createFormik.values.selectToken.map((item: any, index: any) => (
          <div className="col-md-4">
            <div className="stepperRadioBox px-3">
              <div className="imageContainer w-100 d-flex gap-2 align-items-center">
                <img className="" src="/mock/radio.svg" alt="" />{" "}
                <span>
                  <p className="thick16 w300 trText">{item?.name}</p>
                </span>
              </div>
              <p className="thick16 w300 trText">{item?.amount}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="thick20 w300 primary mt-4 mb-4">Price</p>
      <div className="d-flex align-items-center gap-2">
        <img
          width={24}
          height={24}
          src="/icons/sol.png"
          className="currency-logo"
          alt=""
        />
        <h3 className="nonMargin">{createFormik.values.packPrice}</h3>
      </div>

      <p className="thick20 w300 primary mt-4 mb-4">Pack Information</p>
      <Pack
        packPrice={createFormik.values.packPrice}
        packName={createFormik.values.packName}
        packDescription={createFormik.values.packDescription}
        packImage={createFormik.values.packImage}
        isPreview={true}
      />
    </>
  );
};

export default Step3;
