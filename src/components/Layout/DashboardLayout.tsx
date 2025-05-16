"use client";

import { useContext, useEffect, useState } from "react";
import SidebarContext from "../../context/SidebarContext";
import Sidebar from "../sidebar/Sidebar";
import { LayoutContext } from "../../context/LayoutContext";
import Header from "../header/Header";

export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: any;
}) {
  const [isMobileHeaderOpen, setIsMobileHeaderOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  return (
    <LayoutContext.Provider value={{ isSidebarOpen: sidebarOpen }}>
      <div className="layout">
        <Sidebar />
        <div
          className={`main-area ${
            !isMobile && sidebarOpen ? "open" : "closed"
          }`}
        >
          <Header
            title={title}
            isMobile={isMobile}
            isMobileHeaderOpen={isMobileHeaderOpen}
            setIsMobileHeaderOpen={setIsMobileHeaderOpen}
          />
          <main className={`content`}>{children}</main>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}
