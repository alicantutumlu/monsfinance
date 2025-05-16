"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const CustomTabComponent = ({ tabs, selectedTab, setSelectedTab }: any) => {
  const handleTabClick = (item: any) => {
    setSelectedTab(item.title);
  };

  console.log("selected", selectedTab);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 custom-mobile-gap mobile-scroll mb-3">
        {tabs?.map((tab: any) => {
          const isActive = selectedTab === tab.title;

          return (
            <div
              className={`d-flex justify-content-center w-100  align-items-center pb-2 gap-2 pointer text-center `}
              onClick={() => handleTabClick(tab)}
              style={{
                borderBottom: isActive
                  ? "1px solid #7103d9"
                  : "1px solid #EEF2F6",
              }}
            >
              <div className="d-flex align-items-center gap-2 flex-column">
                <div>
                  <img
                    src={isActive ? tab.activeIcon : tab.passiveIcon}
                    alt=""
                  />
                </div>
                <span
                  className={`${
                    isActive ? "active-tab-style" : "passive-tab-style"
                  }  `}
                >
                  {tab?.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CustomTabComponent;
