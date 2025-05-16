import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

export default function ThemaSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <div onClick={handleChange} className="toggleContainer">
        <div className={`toggleIconWrapper ${!isDark ? "active" : "inactive"}`}>
          <Image
            src={
              !isDark
                ? "/assets/icons/switch-light.svg"
                : "/assets/icons/switch-light.svg"
            }
            alt="Light"
            width={20}
            height={20}
          />
        </div>

        <div className={`toggleIconWrapper ${!isDark ? "inactive" : "active"}`}>
          <Image
            src={
              !isDark
                ? "/assets/icons/switch-dark.svg"
                : "/assets/icons/switch-dark.svg"
            }
            alt="Dark"
            width={20}
            height={20}
          />
        </div>
      </div>
    </>
  );
}
