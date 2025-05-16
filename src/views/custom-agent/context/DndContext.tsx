import { createContext, useContext, useState, ReactNode } from "react";

// Varsayılan değeri tanımlıyoruz
const DndContext = createContext<[string | null, (type: string) => void]>([
  null,
  () => {},
]);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DndContext.Provider value={[type, setType]}>
      {children}
    </DndContext.Provider>
  );
};

export const useDnD = () => {
  return useContext(DndContext);
};
