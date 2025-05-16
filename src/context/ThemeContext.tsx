import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import PropTypes from "prop-types";
import { darkTheme, lightTheme } from "../assets/defaultThemes";
interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  handleChangeTheme: Function;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<any>();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    } else {
      setTheme("dark");
    }
  }, []);

  const handleChangeTheme = (status: any) => {
    setTheme(status);
    localStorage.setItem("theme", status);
  };

  const value = useMemo(
    () => ({ theme, setTheme, handleChangeTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider!");
  }
  return context;
};
