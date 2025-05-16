import React, { useEffect, useState } from "react";

import TestHeader from "../../components/test/TestHeader";
import Main from "../../components/test/Main";
import { useTheme } from "../../context/ThemeContext";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardLayout from "../../components/Layout/DashboardLayout";
import AgentCardNew from "./sections/AgentCardNew";
import { ApiRequest } from "../../api";
import CategoryButtons from "./sections/CategoryButtons";
import StepInto from "./sections/StepInto";
import PopularAndOpportunities from "./sections/PopularAndOpportunities";

const TestPage = () => {
  const { theme } = useTheme();

  const [allAgentList, setAllAgentList] = useState([]);

  const handleAllAgent = async () => {
    try {
      const res = await ApiRequest.getAllAgent({
        test: [],
      });
      setAllAgentList(res.data?.agencies);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleAllAgent();
  }, []);

  console.log("allAgentList", allAgentList);

  const popularCardData = [
    {
      id: 1,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
    },
    {
      id: 2,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
    },
    {
      id: 3,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
    },
  ];

  const opportunitiesCardData = [
    {
      id: 1,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
      sale: "20",
    },
    {
      id: 2,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
      sale: "30",
    },
    {
      id: 3,
      image: "/agent/popular-card-image.svg",
      title: "News Sentiment Agent",
      description:
        "Stay ahead of the market with real-time sentiment analysis on crypto news. This agent scans headlines, filters noise, and delivers actionable insights—so you know what really moves the market.",
      sale: "15",
    },
  ];

  return (
    <DashboardLayout title={"Agent Playground"}>
      <div className="row d-flex justify-content-between gy-4">
        <div className="col-xl-4 d-flex">
          <StepInto />
        </div>
        <div className="col-xl-4 d-flex">
          <PopularAndOpportunities
            data={popularCardData}
            title={"Most Popular"}
          />
        </div>
        <div className="col-xl-4 d-flex">
          <PopularAndOpportunities
            data={opportunitiesCardData}
            title={"Opportunities"}
          />
        </div>
      </div>

      {/* <div className="agent-divider my-5" />
      <div className="row">
        <CategoryButtons />
        {allAgentList.map((item, index) => (
          <div key={index} className="col-xl-4 gap-4">
            <AgentCardNew data={item} />
          </div>
        ))}
      </div> */}

      <Main />
    </DashboardLayout>
  );
};

export default TestPage;
