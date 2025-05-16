// NodesContext.js
import { createContext, useContext } from "react";

const NodesContext = createContext(null);

export const NodesProvider = ({ children, setNodes }: any) => {
  return (
    <NodesContext.Provider value={setNodes}>{children}</NodesContext.Provider>
  );
};

export const useSetNodes = () => {
  const setNodes = useContext(NodesContext);
  if (!setNodes) {
    throw new Error("useSetNodes must be used within a NodesProvider");
  }
  return setNodes;
};
