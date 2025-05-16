import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CreatePage } from "./create-page";
import PackList from "./pack-list";
import Claim from "./claim";
import Privileges from "./privileges";
export const deneme = () => {
  const router = useRouter();
  const activeHash = router.asPath.split("#")[1];

  return (
    <div className="transaction transactionContainer">
      {activeHash === "create" && <h1>Crete New Pack</h1>}
      {activeHash === "pack-list" && <h1>Pack List</h1>}
      {activeHash === "claim" && <h1>Claim Your Token</h1>}
      {activeHash === "tokens" && <h1>Tokens</h1>}
      <section>
        {activeHash === "create" && <CreatePage></CreatePage>}
        {activeHash === "pack-list" && <PackList></PackList>}
        {activeHash === "claim" && <Claim></Claim>}
        {activeHash === "tokens" && <Privileges></Privileges>}
      </section>
    </div>
  );
};

export default deneme;
