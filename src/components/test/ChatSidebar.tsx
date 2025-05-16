import React from "react";

const ChatSidebar = ({
  agentName,
  avatarSrc,
  capabilities,
  usageRecommendations,
  creditUsage,
}: any) => {
  return (
    <div className="p-4 text-white flex flex-col justify-between sidebar opened">
      <div>
        <div className="flex w-full justify-between items-center">
          <a href="https://app.griffinai.io">
            <img
              className="mr-2 w-28 sm:w-[150px]"
              alt="logo"
              src="/img/griffin-logo.svg"
            />
          </a>
          <div className="flex">
            <button className="w-11 h-11 shrink-0 flex justify-center items-center transition-all duration-300 bg-mask-4 font-normal text-white rounded-lg hover:text-pink-500">
              <img alt="refresh" src="/img/icons/edit.svg" />
            </button>
            <div
              data-tooltip-id="my-tooltip"
              className="_points_z2cw4_1 ml-2 text-white bg-mask-4 light-dark">
              Credits: 50.00 <img alt="info" src="/img/icons/info.svg" />
            </div>
          </div>
        </div>
        <div className="mt-2"></div>
      </div>
      <div className="sidebar-info sm:overflow-y-auto max-h-[calc(100%-56px)]">
        <div className="p-5 sm:p-10 rounded-lg w-full flex flex-col justify-center items-center bg-mask-4">
          <div className="relative w-full text-center _reward-container_1b74o_1">
            <h3 className="text-white text-2xl">+ XP earned🔥</h3>
            <div className="text-white-80 text-sm">
              You've completed your daily challenge with Agents.
            </div>
          </div>
          <div className="w-full flex flex-row items-center sm:items-start justify-between sm:flex-col">
            <div className="flex">
              <img
                className="_avatarimg_nt2v6_1 sm:mb-5 transition-all"
                src={avatarSrc}
                alt={agentName}
              />
              <div
                id="voice-block"
                className="h-[120px] w-[calc(100%-120px)]"></div>
            </div>
            <h2 className="text-white text-[24px] sm:text-[36px] text-center sm:text-left font-semibold">
              {agentName}
            </h2>
            <button className="sm:hidden flex items-center top-1 right-1">
              <img className="w-4" src="/img/icons/up.svg" alt="show-hide" />
            </button>
          </div>
          <div className="transition-all w-full overflow-hidden h-0 sm:h-auto">
            <div className="mt-5">
              <p className="text-white text-sm uppercase">Capabilities</p>
              <p className="text-white-80 text-sm">{capabilities}</p>
            </div>
            <div className="mt-5">
              <p className="text-white text-sm uppercase">
                Usage Recommendations
              </p>
              <p className="text-white-80 text-sm">{usageRecommendations}</p>
            </div>
            <div className="mt-5">
              <p className="text-white text-sm uppercase">Credit Usage:</p>
              <p className="text-white-80 text-sm">{creditUsage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
