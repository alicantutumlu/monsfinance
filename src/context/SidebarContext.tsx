"use client";
import React, { createContext, FC, ReactNode, useMemo, useState } from "react";

import PropTypes from "prop-types";

export interface IAuthContextProps {
  sidebarOpen?: any;
  setSidebarOpen?: any;
}
const SidebarContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);
interface IAuthContextProviderProps {
  children: ReactNode;
}
export const SidebarContextProvider: FC<IAuthContextProviderProps> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
    }),
    [sidebarOpen]
  );
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
SidebarContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarContext;
