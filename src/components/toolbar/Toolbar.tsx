import { useState } from "react";

const Toolbar = ({ formik }: any) => {
  const [openBlocks, setOpenBlocks] = useState(false);
  const [selected, setSelected] = useState("All");
  const category = [
    "All",
    "Agent",
    "AI",
    "Basic",
    "Data",
    "Developer Tools",
    "Input",
    "Logic",
    "Output",

    "Trade",
    "Search",
    "Social",
    "Text",
    "Create Backtest Code",
    "Backtest Timer",
    "Create New Tool",
  ];

  const categoryColors: any = {
    All: "rgb(218, 218, 218)",
    Agent: "green",
    AI: "orange",
    Basic: "blue",
    Data: "red",
    "Developer Tools": "pink",
    Input: "cyan",
    Logic: "teal",
    Output: "purple",
    Search: "brown",
    Social: "violet",
    Analyse: "teal",
    Text: "lime",
    Backtest: "yellow",
  };

  const deepseekClick = () => {
    formik.setFieldValue("aiProducts", "deepseek");
  };
  const uploadClick = () => {
    console.log("giriyom");
    formik.setFieldValue("documentUpload", "true");
  };

  return (
    <div className="d-flex gap-1 mt-5">
      <div
        className="toolbar-border d-flex justify-content-center py-3 flex-column align-items-center gap-3  shadow"
        style={{ background: "transparent" }}>
        <button
          onClick={() => setOpenBlocks(!openBlocks)}
          style={{ filter: "invert(1) brightness(0.6)" }}
          className="toolbar-btn">
          <img src="/agent/bag1.png" alt="Bag" />
        </button>

        <div className="border-ct" />

        <button className="toolbar-btn">
          <img
            src="/agent/return.png"
            alt="Return"
            style={{ filter: "invert(1) brightness(0.6)" }}
          />
        </button>

        <button className="toolbar-btn">
          <img
            src="/agent/return.png"
            alt="Return"
            style={{ filter: "invert(1) brightness(0.6)" }}
          />
        </button>

        <div className="border-ct" />

        <button className="toolbar-btn">
          <img
            src="/agent/diskette.png"
            alt="Save"
            style={{ filter: "invert(1) brightness(0.6)" }}
          />
        </button>
      </div>

      {openBlocks && (
        <div
          className="block-border"
          style={{ position: "fixed", maxWidth: 500, left: 90, zIndex: 9999 }}>
          <p className="block-title">Blocks</p>
          <div className="d-flex flex-wrap gap-2 mt-3">
            {category.map((item, index) => (
              <p
                key={item}
                onClick={() => {
                  setSelected(item);

                  if (item === "Create Backtest Code") {
                    formik.setFieldValue("analyzeDocument", "true");
                  } else if (item === "Backtest") {
                    formik.setFieldValue("startBacktest", "true");
                  } else if (item === "Backtest Timer") {
                    formik.setFieldValue("startBacktest", "true");
                  } else if (item === "Trade") {
                    formik.setFieldValue("trade", "true");
                  }
                }}
                className={`block-category-border ${
                  selected === item ? "block-category-border-active" : ""
                }`}
                style={{
                  backgroundColor:
                    selected === item ? categoryColors[item] : "transparent", // Seçilen kategoriye göre arka plan rengi
                }}>
                {item}
              </p>
            ))}
          </div>
          <div className="border-ct my-3" />

          {selected === "All" && (
            <>
              <div className="overflow-card">
                <div className="d-flex justify-content-between gap-3 align-items-center ai-border">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Add To Dictionary</p>
                    <p className="mx-2">
                      Adds a new key-value pair to a dictionary. If no
                      dictionary is provided, a new one is created.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{
                        height: "25px",
                        width: "30px",
                        filter: "invert(1) brightness(0.5)",
                      }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center mt-4 ai-border">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Add To List</p>
                    <p className="mx-2">
                      Adds a new entry to a list. The entry can be of any type.
                      If no list is provided, a new is created.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "30px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Deepsek</p>
                    <p className="mx-2">
                      It is an AI research company that develops large-scale
                      artificial intelligence models. It works on natural
                      language processing (NLP), deep learning, and artificial
                      intelligence, creating advanced language models.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "65px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center mt-4 ai-border">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">OpenAI</p>
                    <p className="mx-2">
                      It is a company that conducts artificial intelligence (AI)
                      research and develops advanced AI models. It works in the
                      fields of natural language processing (NLP), machine
                      learning, and deep learning, creating popular AI-based
                      products such as ChatGPT and DALL·E. Its goal is to
                      develop AI in a safe and ethical manner to benefit
                      humanity.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "100px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Input</p>
                    <p className="mx-2">
                      This block is used to provide input to the graph.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "20px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center mt-4 ai-border">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Upload</p>
                    <p className="mx-2">
                      This block allows you to upload files or data to the
                      system for processing or analysis by AI models.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "35px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>
                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>

                <div className="d-flex justify-content-between gap-3 align-items-center ai-border mt-4">
                  <div className="d-flex flex-col gap-3 ">
                    <p className="ai-title mx-2">Agent Backtest</p>
                    <p className="mx-2">
                      A backtest agent tests trading strategies using historical
                      data to evaluate their performance before real-time use.
                      It helps optimize strategies based on past market
                      conditions.
                    </p>
                  </div>
                  <button className="plus-icon-bg">
                    <img
                      style={{ height: "25px", width: "50px" }}
                      src="/agent/plus.png"
                    />
                  </button>
                </div>
              </div>
            </>
          )}

          {selected === "AI" && (
            <>
              <div className="d-flex justify-content-between gap-3 align-items-center ai-border">
                <div className="d-flex flex-col gap-3 " onClick={deepseekClick}>
                  <p className="ai-title mx-2">Deepsek</p>
                  <p className="mx-2">
                    It is an AI research company that develops large-scale
                    artificial intelligence models. It works on natural language
                    processing (NLP), deep learning, and artificial
                    intelligence, creating advanced language models.
                  </p>
                </div>
                <button className="plus-icon-bg">
                  <img
                    style={{ height: "25px", width: "65px" }}
                    src="/agent/plus.png"
                  />
                </button>
              </div>

              <div className="d-flex justify-content-between gap-3 align-items-center mt-4 ai-border">
                <div className="d-flex flex-col gap-3 ">
                  <p className="ai-title mx-2">OpenAI</p>
                  <p className="mx-2">
                    It is a company that conducts artificial intelligence (AI)
                    research and develops advanced AI models. It works in the
                    fields of natural language processing (NLP), machine
                    learning, and deep learning, creating popular AI-based
                    products such as ChatGPT and DALL·E. Its goal is to develop
                    AI in a safe and ethical manner to benefit humanity.
                  </p>
                </div>
                <button className="plus-icon-bg">
                  <img
                    style={{ height: "25px", width: "100px" }}
                    src="/agent/plus.png"
                  />
                </button>
              </div>
            </>
          )}

          {selected === "Input" && (
            <>
              <div className="d-flex justify-content-between gap-3 align-items-center ai-border">
                <div className="d-flex flex-col gap-3 ">
                  <p className="ai-title mx-2">Agent Input</p>
                  <p className="mx-2">
                    This block is used to provide input to the graph.
                  </p>
                </div>
                <button className="plus-icon-bg">
                  <img
                    style={{ height: "25px", width: "20px" }}
                    src="/agent/plus.png"
                  />
                </button>
              </div>

              <div className="d-flex justify-content-between gap-3 align-items-center mt-4 ai-border">
                <div className="d-flex flex-col gap-3 " onClick={uploadClick}>
                  <p className="ai-title mx-2">Agent Upload</p>
                  <p className="mx-2">
                    This block allows you to upload files or data to the system
                    for processing or analysis by AI models.
                  </p>
                </div>
                <button className="plus-icon-bg">
                  <img
                    style={{ height: "25px", width: "35px" }}
                    src="/agent/plus.png"
                  />
                </button>
              </div>
            </>
          )}

          {selected === "Backtest" && (
            <>
              <div className="d-flex justify-content-between gap-3 align-items-center ai-border">
                <div className="d-flex flex-col gap-3 ">
                  <p className="ai-title mx-2">Agent Backtest</p>
                  <p className="mx-2">
                    A backtest agent tests trading strategies using historical
                    data to evaluate their performance before real-time use. It
                    helps optimize strategies based on past market conditions.
                  </p>
                </div>
                <button className="plus-icon-bg">
                  <img
                    style={{ height: "25px", width: "50px" }}
                    src="/agent/plus.png"
                  />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
