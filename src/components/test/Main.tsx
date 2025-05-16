import { useState, useEffect, useRef } from "react";
import AgentCard from "./AgentCard";
import CustomTabComponent from "../CustomTabs";
import { ApiRequest } from "../../api";
import { useWallet } from "@solana/wallet-adapter-react";
import { FaSearch, FaFilter } from "react-icons/fa";
import AgentCardNew from "../../views/agent/sections/AgentCardNew";
import { useTheme } from "../../context/ThemeContext";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allToolkits, setAllToolkits] = useState([]);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const [selectedTab, setSelectedTab] = useState("Available AI Agents");
  const [myAgents, setMyAgents] = useState([]);
  const { publicKey } = useWallet();

  const searchRef: any = useRef(null);
  const filterRef: any = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (publicKey) {
      ApiRequest.getAgentByOwnerWallet({ ownerWallet: publicKey })
        .then((res) => {
          const editArray: any = [];
          res?.data?.data?.forEach((item: any) => {
            const hold = {
              id: item.id,
              image: item.image,
              title: item.name,
              description: item.description,
              href: "/custom-agent",
            };
            editArray.push(hold);
          });
          setMyAgents(editArray);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [publicKey]);

  useEffect(() => {
    if (publicKey) {
      ApiRequest.getAllCategories().then((res) => {
        setAllCategories(res.data);
        ApiRequest.getAllPurchaseToolkit({ wallet: publicKey }).then((res) => {
          setAllToolkits(res.data.data);
        });
      });
    }
  }, [publicKey]);

  const filteredToolkits = allToolkits.filter((toolkit: any) => {
    const categoryMatch = selectedCategory
      ? toolkit.categoryName === selectedCategory
      : true;

    const nameMatch = toolkit.toolkitName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descMatch = toolkit.toolkitDescription
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return categoryMatch && (!searchQuery || nameMatch || descMatch);
  });

  const priorityNames = [
    "Buy Bundle MonsNFT Pack Agent",
    "Custom Agent",
    "Image Generator Agent",
    "Analyse Agent",
    "DeepSeek R1 Agent",
    "Whale Activity Tracker",
  ];

  const priorityToolkits = filteredToolkits.filter((toolkit: any) =>
    priorityNames.includes(toolkit.toolkitName)
  );
  const nonPriorityToolkits = filteredToolkits.filter(
    (toolkit: any) => !priorityNames.includes(toolkit.toolkitName)
  );

  const orderedPriorityToolkits = priorityNames
    .map((name: any) =>
      priorityToolkits.find((toolkit: any) => toolkit.toolkitName === name)
    )
    .filter((item) => item);

  function shuffleArray(array: any) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const shuffledNonPriorityToolkits = shuffleArray([...nonPriorityToolkits]);

  const finalToolkits = [
    ...orderedPriorityToolkits,
    ...shuffledNonPriorityToolkits,
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchExpanded(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <div className="_root_k5z19_1">
        <div className="_container_k5z19_33">
          <CustomTabComponent
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={
              publicKey
                ? [{ title: "Available AI Agents" }, { title: "My Agents" }]
                : [{ title: "Available AI Agents" }]
            }
          />
        </div>

        {selectedTab === "Available AI Agents" && (
          <>
            <div className="d-flex align-items-center w-100 justify-around px-4 text-white">
              {/* SEARCH CONTAINER */}
              <div
                ref={searchRef}
                className="search-container d-flex align-items-center"
                onMouseEnter={() => setIsSearchExpanded(true)}
                style={{ position: "relative" }}
              >
                <FaSearch style={{ cursor: "pointer", color: "#7103D9" }} />
                <input
                  type="text"
                  placeholder="Search actions..."
                  value={searchQuery}
                  className="search-input m-0"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchExpanded(true)}
                  style={{
                    width: isSearchExpanded ? "200px" : "0px",
                    opacity: isSearchExpanded ? 1 : 0,
                    transition:
                      "width 0.5s ease-in-out, opacity 0.3s ease-in-out",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "white",
                  }}
                />
              </div>

              <div
                ref={filterRef}
                className="filter-container d-flex align-items-center"
                onMouseEnter={() => setIsFilterExpanded(true)}
                style={{ position: "relative" }}
              >
                <FaFilter style={{ cursor: "pointer", color: "#7103D9" }} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  onFocus={() => setIsFilterExpanded(true)}
                  style={{
                    width: isFilterExpanded ? "300px" : "0px",
                    opacity: isFilterExpanded ? 1 : 0,
                    transition:
                      "width 0.5s ease-in-out, opacity 0.3s ease-in-out",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "none",
                    height: "40px",
                    background: theme === "dark" ? "#181818" : "#DADADA",
                    color: theme === "dark" ? "white" : "#212121",
                    outline: "none",
                  }}
                >
                  <option value="">All Categories</option>
                  {allCategories.map((cat: any) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row">
              {finalToolkits.map((agent, index) => (
                <div key={index} className="col-xl-4 col-lg-6 gap-4">
                  <AgentCardNew data={agent} />
                </div>
              ))}
            </div>
          </>
        )}

        {selectedTab === "My Agents" && (
          <div className="row">
            {myAgents.map((agent: any, index) => (
              <div key={index} className="col-xl-4 col-lg-6 gap-4">
                <AgentCardNew data={agent} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Main;
