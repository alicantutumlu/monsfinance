import React from "react";

export const Input = ({
  title,
  isTextArea,
  formik,
  value,
  inputValue,
  isNumber = false,
  isRightCard = false,
}: any) => {
  return (
    <>
      {title && <p className="thick16 w300 trText py-2">{title}</p>}
      <div className="d-flex items-center gap-2">
        {!isTextArea ? (
          <input
            value={inputValue !== 0 && inputValue}
            onChange={(e) => {
              isNumber
                ? formik.setFieldValue(value, Number(e.target.value))
                : formik.setFieldValue(value, e.target.value);
            }}
            type={isNumber ? "number" : "text"}
            className={`form-control ${isRightCard && "isRight"}`}
          />
        ) : (
          <textarea
            value={inputValue}
            onChange={(e) => {
              formik.setFieldValue(value, e.target.value);
            }}
            className="form-control"
          />
        )}
        {isRightCard && (
          <div className="div">
            <span className="" id="basic-addon2">
              <img width={40} height={40} src="/images/solana.png" alt="" />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Input;
