import React from "react";
import Input from "../../../components/Input";
export const EmailPart = ({ setActivePage }: any) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 gap-4">
      <div
        className="d-flex flex-column  align-items-center  gap-4"
        style={{ maxWidth: "600px" }}
      >
        <img
          style={{ marginTop: "-130px" }}
          src="/images/wallet/mid.svg"
          alt=""
        />
        <p style={{ marginTop: "-100px" }} className="gradient-huge-text">
          Enter Your Email Address
        </p>
        <p className="agent-mid-text text-center">
          Please provide the email address associated with your account.
        </p>
        <div className="w-100">
          <p className="mb-2 text-left agent-mid-text">E-mail</p>
          <input type="text" className="custom-input" />
        </div>

        <button
          onClick={() => {
            setActivePage("walletsecret");
          }}
          className="create-button"
        >
          Send Verification Code
        </button>
      </div>
    </div>
  );
};
export default EmailPart;
