import React, { createContext, useContext } from "react";

export const LayoutContext = createContext({ isSidebarOpen: true });

export const useLayout = () => useContext(LayoutContext);
