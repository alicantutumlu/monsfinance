import React, { useEffect, useState } from "react";

import DashboardLayout from "../../components/Layout/DashboardLayout";
import { useTheme } from "../../context/ThemeContext";
import { ApiRequest } from "../../api";

import News from "./sections/News";
import SelectedNews from "./sections/SelectedNews";
import CategoryButtons from "./sections/CategoryButtons";

const TestPage = () => {
  const { theme } = useTheme();
  const [allAgentList, setAllAgentList] = useState([]);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
    null
  );
  const handleSelect = (index: number) => {
    setSelectedDataIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleAllAgent = async () => {
    try {
      // const res = await ApiRequest.getAllAgent();
      // setAllAgentList(res.data?.agencies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleAllAgent();
  }, []);
  const [selectCategory, setSelectCategory] = useState("All");
  const NewsData = [
    {
      id: 1,
      image: "/images/newsPhoto.png",
      title:
        "Market Sentiment AI Agent Launches with Real-Time Crypto Insights",
      description:
        "The latest AI-powered agent has officially launched to track and analyze news sentiment across major cryptocurrency platforms. Leveraging advanced NLP techniques and real-time data scraping, the agent interprets positive, negative, and neutral signals from over 300 trusted sources. Early testers report significantly improved decision-making during volatile market shifts. This agent is set to become a staple for traders looking to stay ahead of news-driven market swings.",
      date: "May 13, 2025",
      category: ["Artificial Intelligence", "Cryptocurrency"],
    },
    {
      id: 2,
      image: "/images/newsPhoto.png",
      title:
        "AI Assistant Empowers Retail Investors with Personalized Market Alerts",
      description:
        "In a breakthrough for retail investing, a new AI agent has been introduced to help individual investors make more informed decisions. It offers personalized push notifications based on your portfolio and sentiment analysis from global news. Investors can now receive early warnings on sector downturns or asset-specific rallies before social media catches up. The agent uses GPT-like models fine-tuned on financial data for enhanced accuracy.",
      date: "May 12, 2025",
      category: ["Artificial Intelligence", "Finance", "Retail Investing"],
    },
    {
      id: 3,
      image: "/images/newsPhoto.png",
      title: "Machine Learning Agent Predicts Stock Reactions to Economic News",
      description:
        "A cutting-edge ML agent is now capable of predicting short-term market reactions based on central bank announcements and economic indicators like inflation and employment reports. Backtested on 10 years of financial news and price data, the model showed a 74% success rate in predicting stock market movements within a 2-hour window. This tool is expected to be integrated into hedge fund workflows by Q3 2025.",
      date: "May 10, 2025",
      category: ["Machine Learning", "Economy", "Stock Market"],
    },
  ];

  return (
    <DashboardLayout title={"News Feed"}>
      <div className="row d-flex justify-content-center gy-4">
        <div className="col-12">
          {" "}
          <CategoryButtons
            selectCategory={selectCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
        <div className={selectedDataIndex !== null ? "col-xl-8" : "col-xl-12"}>
          <News data={NewsData} onSelect={handleSelect} />
        </div>
        {selectedDataIndex !== null && (
          <div className="col-xl-4">
            <SelectedNews data={NewsData[selectedDataIndex]} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TestPage;
