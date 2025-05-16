import { useContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import SidebarContext from "../../context/SidebarContext";

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
    name: "Launchpad",
    icon: "/agent/launchpad-icon.svg",
    href: "/launchpad",
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
    name: "Wallet",
    icon: "/agent/agent-history-icon.svg",
    href: "/wallet",
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

export default function Sidebar() {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);
  console.log("sidebarOpen", sidebarOpen);

  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;

  const pathname = usePathname();

  return (
    <div className={`sidebar ${sidebarOpen && !isMobile ? "open" : "closed"}`}>
      <div className=" d-flex justify-content-center"></div>
      <div
        className={`mt-4 text-20-700 px-3 d-flex ${
          sidebarOpen && !isMobile
            ? "justify-content-between"
            : "justify-content-center"
        } align-items-center`}
      >
        {sidebarOpen && !isMobile && (
          <img
            onClick={() => router.push("/")}
            className="pointer"
            style={{ width: "75%", height: "max-content" }}
            src="/agent/mons-finance-new-logo.svg"
          />
        )}

        <div
          className={`toggle-icon pointer ${
            sidebarOpen && !isMobile ? "open" : "closed"
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <img
            src={`/agent/${
              sidebarOpen && !isMobile
                ? "sidebar-open.png"
                : "sidebar-closed.png"
            }`}
            alt="Toggle"
            className="toggle-image"
          />
        </div>
      </div>
      <div className="sidebar-divider " />

      <div className="d-flex flex-column justify-content-between h-100">
        <div>
          <div
            className={`profile-border mx-3  ${
              sidebarOpen && !isMobile ? "open" : "closed"
            }`}
          >
            <div className="d-flex align-items-center flex-column">
              <img className="profile-photo" src="/agent/profile-image.svg" />
              <p className="text-12 mt-2">Ayşe Yılmaz</p>
              <p className="text-10">ayse_yilmaz</p>
            </div>

            <div className="d-flex justify-content-between gap-2 mt-3 ">
              <div className="d-flex button-border align-items-center gap-1 pointer">
                <img src="/agent/info-icon.svg" />
                <p className="text-8" style={{ marginTop: "2px" }}>
                  50.000 Credits
                </p>
              </div>
              <div className="d-flex button-border align-items-center gap-1 pointer">
                <img src="/agent/connect-icon.svg" />
                <p className="text-8" style={{ marginTop: "2px" }}>
                  Connect options
                </p>
              </div>
            </div>
          </div>

          <ul className="menu mt-1">
            {menuItems.map((item, index) => (
              <div key={index}>
                <li
                  onClick={() => router.push(item.href)}
                  className={`menu-item ${
                    pathname.startsWith(item.href) ? "active" : ""
                  }`}
                >
                  <img src={item.icon} className="icon" />
                  {sidebarOpen && !isMobile && (
                    <span
                      className={`text-14-400 w600 ${
                        pathname.startsWith(item.href) && "white"
                      }  mx-2`}
                    >
                      {item.name}
                    </span>
                  )}
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div
          className={`build-team mx-3 mb-3 ${
            sidebarOpen && !isMobile ? "open" : "closed"
          }`}
        >
          <p className="text-center text-16-600 white">Build Your AI Team</p>
          <p className="text-center text-10 dark-gray">
            Design smart agents that take your ideas from concept to execution.
          </p>

          <button className="button-purple text-12">Create My Agent</button>
        </div>
      </div>
    </div>
  );
}
