import React, { useEffect, useState } from "react";
import Select from "../../../../components/Select";
import Input from "../../../../components/Input";
import { ApiRequest } from "../../../../api";
export const Step1 = ({ createFormik }: any) => {
  const [options, setOptions] = useState<any>();
  useEffect(() => {
    ApiRequest.getAllTokens()
      .then((res) => {
        const keep: any = [];
        res?.data?.map((item: any, index: any) => {
          if (item.tokenContractAddress) {
            keep.push({
              value: item.tokenContractAddress,
              text: item.tokenName,
            });
          }
        });
        setOptions(keep);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddToken = () => {
    const keep = [...createFormik.values.selectToken];
    keep.push({
      name: "",
      tokenContractAddress: "",
      amount: "",
    });
    createFormik.setFieldValue("selectToken", keep);
  };

  const handleDeleteToken = (index: any) => {
    const keep = [...createFormik.values.selectToken];
    keep.splice(index, 1);
    createFormik.setFieldValue("selectToken", keep);
  };

  return (
    <>
      {createFormik?.values?.selectToken?.map((item: any, index: any) => (
        <div className="d-flex gap-2 mb-3">
          <div className="col-md-9">
            <p className="thick16 w300 trText py-2">Select Token</p>

            <select
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                const selectedOption: any = options[selectedIndex - 1];

                createFormik.setFieldValue(
                  `selectToken[${index}].tokenContractAddress`,
                  e.target.value
                );
                createFormik.setFieldValue(
                  `selectToken[${index}].name`,
                  selectedOption ? selectedOption.text : ""
                );
              }}
              value={
                createFormik.values.selectToken[index].tokenContractAddress
              }
              className="form-select"
              aria-label="Default select example">
              <option selected>Select</option>
              {options?.map((item: any, index: Number) => (
                <option value={item.value}>{item.text}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <Input
              formik={createFormik}
              inputValue={createFormik.values.selectToken[index].amount}
              value={`selectToken[${index}].amount`}
              title={"Token Amount"}
              isNumber={true}></Input>
          </div>
          {index !== 0 && (
            <div className="col-md-1 mt-4 centered">
              <img
                onClick={() => {
                  handleDeleteToken(index);
                }}
                className="blackWhiteFilter c-pointer"
                src="/icons/bus.svg"
                alt=""
              />
            </div>
          )}
        </div>
      ))}

      {/* <div className="row mt-4">
                <div className="col-md-4">
                    <div className="stepperRadioBox px-3">
                        <div className="imageContainer w-100 d-flex gap-2 align-items-center">
                            <img className="" src="/mock/radio.svg" alt="" /> <span><p className="thick16 w300 trText">tokenName</p></span>
                        </div>


                        <div className="radio">
                            <div className="inRadio active"></div>
                        </div>
                    </div>

                </div>

                <div className="col-md-4">
                    <div className="stepperRadioBox px-3">
                        <div className="imageContainer w-100 d-flex gap-2 align-items-center">
                            <img className="" src="/mock/radio.svg" alt="" /> <span><p className="thick16 w300 trText">tokenName</p></span>
                        </div>


                        <div className="radio">
                            <div className="inRadio"></div>
                        </div>
                    </div>

                </div>
                <div className="col-md-4">
                    <div className="stepperRadioBox px-3">
                        <div className="imageContainer w-100 d-flex gap-2 align-items-center">
                            <img className="" src="/mock/radio.svg" alt="" /> <span><p className="thick16 w300 trText">tokenName</p></span>
                        </div>


                        <div className="radio">
                            <div className="inRadio"></div>
                        </div>
                    </div>

                </div>
            </div> */}
      <div className="d-flex">
        <button
          onClick={() => {
            handleAddToken();
          }}
          className="transparentButton stepper centered gap-2 mt-4">
          <img src="/icons/plus.svg" alt="" />
          <p>Added Token</p>
        </button>
      </div>
    </>
  );
};

export default Step1;
