import React from "react";

export const NoWallet = ({ setActivePage }: any) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5 gap-4">
      <div className="wallet-container d-flex flex-column  align-items-center  gap-4">
        <img src="/images/wallet/no-wallet.png" alt="" />
        <p className="gradient-huge-text">No Wallet Found</p>
        <p className="agent-mid-text text-center">
          To use the various agents on our platform, you need to create <br /> a
          Solana wallet.
        </p>
        <div className="text-left d-flex flex-column gap-4">
          <p className="agent-mid-text">This Wallet : </p>
          <div className="d-flex align-items-center gap-3">
            <img src="/images//wallet/topic.png" alt="" />
            <p className="agent-mid-text">
              Can be transferred to any Solana-compatible wallet.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <img src="/images//wallet/topic.png" alt="" />
            <p className="agent-mid-text">
              Keeps your data private and secure.
            </p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <img src="/images//wallet/topic.png" alt="" />
            <p className="agent-mid-text">
              Stores your key information locally on your device.
            </p>
          </div>
        </div>
        <div className="agent-custom-line test" />
        <p className="text-center agent-mid-text">
          Creating your wallet only takes a few minutes. <br /> If you're ready,
          let's get started.
        </p>
        <button
          onClick={() => {
            setActivePage("email");
          }}
          className="create-button"
        >
          Crate Solana Wallet
        </button>
      </div>
    </div>
  );
};

export default NoWallet;
