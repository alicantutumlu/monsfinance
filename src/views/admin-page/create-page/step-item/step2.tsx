import React from "react";
import Select from "../../../../components/Select";
import Input from "../../../../components/Input";
import Dropbox from "../../../../components/Dropbox";
export const Step2 = ({ createFormik, packAmount, setPackAmount }: any) => {
  return (
    <>
      <div className="row">
        <div className="col-md-6 mt-4">
          <Input
            inputValue={createFormik.values.packName}
            formik={createFormik}
            value="packName"
            title={"Pack Name"}></Input>
        </div>
        <div className="col-md-3 mt-4">
          <Input
            inputValue={createFormik.values.packPrice}
            formik={createFormik}
            value="packPrice"
            isNumber={true}
            title={"Pack Price (Sol)"}></Input>
        </div>
        <div className="col-md-3 mt-4">
          <p className="thick16 w300 trText py-2">Pack Amount</p>
          <input
            type="number"
            className="form-control"
            value={packAmount}
            onChange={(e) => {
              setPackAmount(e.target.value);
            }}
          />
        </div>
        <div className="col-md-12 mt-4">
          <Input
            inputValue={createFormik.values.packDescription}
            formik={createFormik}
            value="packDescription"
            isTextArea={true}
            title={"Pack Description"}></Input>
        </div>
        <div className="col-md-12 mt-4">
          <Dropbox
            inputValue={createFormik.values.packImage}
            formik={createFormik}
            value="packImage"
            title={"Pack Image"}></Dropbox>
        </div>
      </div>
    </>
  );
};

export default Step2;
