import React, { useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import NoWallet from "./parts/nowallet";
import EmailPart from "./parts/email";
import WalletSecret from "./parts/walletsecret";
import CheckSecret from "./parts/checksecret";
import CreateDone from "./parts/createdone";
export const WalletPage = () => {
  const [activePage, setActivePage] = useState("nowallet");
  return (
    <DashboardLayout title={"wallet"}>
      {activePage == "nowallet" && <NoWallet setActivePage={setActivePage} />}
      {activePage == "email" && <EmailPart setActivePage={setActivePage} />}
      {activePage == "walletsecret" && (
        <WalletSecret setActivePage={setActivePage} />
      )}
      {activePage == "checksecret" && (
        <CheckSecret setActivePage={setActivePage} />
      )}
      {activePage == "createdone" && (
        <CreateDone setActivePage={setActivePage} />
      )}
    </DashboardLayout>
  );
};

export default WalletPage;
