import React from "react";

const CardComponent = () => {
  return (
    <>
      <div
        id="whitepaper"
        className="d-flex align-items-center justify-content-between flex-wrap mobile-gap"
      >
        <div className="cta-card cta-first">
          <div className="cta-content">
            <p className="cta-heading">AI-Powered Asset Bundling</p>
            <p className="cta-para">
              Smart AI agents curate NFT & token bundles in real time, adapting
              to market trends and user behavior for optimized investments.
            </p>
          </div>
        </div>
        <div className="cta-card">
          <div className="cta-content">
            <p className="cta-heading">
              Automated Staking & Yield Optimization
            </p>
            <p className="cta-para">
              AI-powered agents manage staking and liquidity positions, adapting
              to market trends to maximize yield with minimal risk.
            </p>
          </div>
        </div>
        <div className="cta-card cta-third">
          <div className="cta-content">
            <p className="cta-heading">Deployable AI Trading Agents</p>
            <p className="cta-para">
              Customize AI-driven agents to automate trading, staking, and
              bundling strategies, adapting to market shifts in real time.
            </p>
          </div>
        </div>
        <div className="cta-card">
          <div className="cta-content">
            <p className="cta-heading">AI-Powered Developer Economy</p>
            <p className="cta-para">
              Build and monetize custom AI agents with unique trading logic,
              staking models, and predictive analytics in a self-sustaining DeFi
              ecosystem.
            </p>
          </div>
        </div>
        <div className="cta-card cta-first">
          <div className="cta-content">
            <p className="cta-heading">
              Seamless & Intelligent DeFi Experience
            </p>
            <p className="cta-para">
              AI-powered automation simplifies DeFi, offering personalized
              insights, automated actions, and optimized financial decisions in
              real time.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
