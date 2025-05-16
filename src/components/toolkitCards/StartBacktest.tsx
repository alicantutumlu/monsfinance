import React, { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";

const languages = [
  {
    name: "1 Min",
  },
  {
    name: "15 Min",
  },
  {
    name: "1 Hour",
  },
  {
    name: "5 Hour",
  },
];

export const StartBacktest = ({ isCompleted }: any) => {
  const [show, setShow] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [activeLanguage, setActiveLanguage] = useState<any>("");
  const handleShow = (lang: any) => {
    setSelectedLang(lang);
    setShow(true);
  };
  const downloandExcel = () => {
    const link = document.createElement("a");
    link.href = "/backtest_conclusion.xlsx"; // Public klasöründeki dosyaya erişim
    link.download = "backtest_conclusion.xlsx"; // Dosyanın indirilmesi için
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="toolkit-card code">
      <p className="toolkit-main-title">Start Backtest</p>
      <hr className="custom-line mb-4" />
      <p className="toolkit-main-text mb-3">Select Range</p>
      <div className="d-flex  gap-3">
        {languages.map((lang) => (
          <div
            className={`${
              activeLanguage === lang && "code-active-card"
            } c-pointer border border-white p-2 rounded drag-drop-area`}
            onClick={() => setActiveLanguage(lang)}
            key={lang.name}
          >
            <p className="toolkit-main-text">{lang.name}</p>
          </div>
        ))}
      </div>
      {isCompleted && (
        <div className="d-flex justify-content-center">
          <button
            onClick={() => {
              downloandExcel();
            }}
            className="btn mainButton px-3 py-2 mt-4"
          >
            <p className="toolkit-main-text">Download Backtest Conclusion</p>
          </button>
        </div>
      )}
    </div>
  );
};
