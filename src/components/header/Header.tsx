"use client";

import { FaBars } from "react-icons/fa";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import ThemaSwitch from "../ThemaSwitch";
import { darkTheme, lightTheme } from "../../assets/defaultThemes";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Header({
  isMobile,
  isMobileHeaderOpen,
  setIsMobileHeaderOpen,
  title,
}: {
  isMobile: boolean;
  isMobileHeaderOpen: boolean;
  setIsMobileHeaderOpen: (v: boolean) => void;
  title: any;
}) {
  // const { t, i18n } = useTranslation();
  const { theme, handleChangeTheme } = useTheme();
  const router = useRouter();

  const [count, setCount]: any = useState([]);

  useEffect(() => {
    if (window.document) {
      const root = window.document.documentElement;
      const selectedTheme: any = theme === "dark" ? darkTheme : lightTheme;
      Object.keys(selectedTheme.colors).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = selectedTheme.colors[key];
        root.style.setProperty(cssKey, cssValue);
      });
    }
  }, [theme]);

  // const handleLanguageChange = () => {
  //   const selectedLanguage = i18n.language === "en-US" ? "tr-TR" : "en-US";
  //   localStorage.setItem("i18nextLng", selectedLanguage);
  //   i18n.changeLanguage(selectedLanguage);
  // };
  // useEffect(() => {
  //   if (i18n.language === "tr") {
  //     const selectedLanguage = "tr-TR";
  //     i18n.changeLanguage(selectedLanguage);
  //     localStorage.setItem("i18nextLng", selectedLanguage);
  //   } else if (i18n.language === "en") {
  //     const selectedLanguage = "en-US";
  //     i18n.changeLanguage(selectedLanguage);
  //     localStorage.setItem("i18nextLng", selectedLanguage);
  //   }
  // }, []);

  const menuItems = [
    {
      name: "Create Agent",
      icon: "/agent/create-agent-icon.svg",
      href: "/create-agent",
    },
    {
      name: "Agent Playground",
      icon: "/agent/news-feed-icon.svg",
      href: "/agent",
    },
    {
      name: "News Feed",
      icon: "/agent/agent-playground-icon.svg",
      href: "/news-feed",
    },
    {
      name: "Agent History",
      icon: "/agent/agent-history-icon.svg",
      href: "/agent-history",
    },
    {
      name: "Settings",
      icon: "/agent/settings-icon.svg",
      href: "/settings",
    },
    {
      name: "Log out",
      icon: "/agent/logout-icon.svg",
      href: "/logout",
    },
  ];
  return (
    <header
      className={`new-header ${isMobile ? "mobile" : ""} ${
        isMobileHeaderOpen ? "open" : ""
      }`}
    >
      {isMobile && (
        <div
          className="mobile-header-toggle d-flex justify-content-between align-items-center w-100"
          onClick={() => setIsMobileHeaderOpen(!isMobileHeaderOpen)}
        >
          <p className="text-20-700 m-0">{title}</p>
          <FaBars size={20} color={`${theme === "dark" ? "white" : "black"}`} />
        </div>
      )}

      <div className="mobile-menu">
        <p className="text-20-600 mb-0 mobile-hidden">{title}</p>
        <div className="d-flex flex-wrap gap-3 position-right align-items-center">
          <WalletMultiButton />

          <li>
            <label className="theme-switch-one style__three style__one">
              <input
                type="checkbox"
                id="slider"
                className="check-status"
                checked={theme === "dark" ? true : false}
              />
              <span
                className="slider round"
                onClick={() =>
                  handleChangeTheme(theme === "light" ? "dark" : "light")
                }
              ></span>
            </label>
          </li>
          <img className="header-icon" src="/agent/notification-icon.svg" />
          <img className="header-icon" src="/agent/language-icon.svg" />
        </div>

        <div className="mobile-divider mt-2" />
        <div className="header-route ">
          {menuItems.map((item, index) => (
            <p
              onClick={() => router.push(item.href)}
              className="menu-item mt-2"
              key={index}
            >
              <span className=" text-14-400 pointer">{item.name}</span>
            </p>
          ))}
        </div>
      </div>
    </header>
  );
}
