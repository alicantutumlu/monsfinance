import React from "react";
import Input from "../../../components/Input";
export const CreateDone = ({ setActivePage }: any) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 gap-4">
      <div
        className="d-flex flex-column  align-items-center  gap-4"
        style={{ maxWidth: "600px" }}
      >
        <img
          style={{ marginTop: "-130px" }}
          src="/images/wallet/done.png"
          alt=""
        />
        <p
          style={{ marginTop: "-100px" }}
          className="gradient-huge-text text-center"
        >
          Your Wallet Has Been Successfully Created!
        </p>
        <p className="agent-mid-text text-center">
          Your Solana wallet is now ready to use. Keep your recovery phrase safe
          — it's the only way to restore access.
        </p>

        <button
          onClick={() => {
            setActivePage("walletsecret");
          }}
          className="create-button"
        >
          Let’s get started!
        </button>
      </div>
    </div>
  );
};
export default CreateDone;
