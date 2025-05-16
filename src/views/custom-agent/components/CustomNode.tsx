import React, { useCallback, useRef, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import TokenDeploy from "../../../components/SolanaTools/TokenDeploy";
import { useSetNodes } from "../../../context/NodesContext";

const CustomNode = ({ id, data }: any) => {
  const setNodes: any = useSetNodes();

  const [csvData, setCsvData] = useState(null);
  const [inputValue, setInputValue] = useState(""); // Input Node için state
  const fileInputRef: any = useRef(null);
  const updateNodeData = useCallback(
    (createFn: any) => {
      setNodes((nds: any) =>
        nds.map((node: any) =>
          node.id === id
            ? { ...node, data: { ...node.data, create: createFn } }
            : node
        )
      );
    },
    [id, setNodes]
  );
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: any) => {
    const file: any = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        setCsvData(content);
        data.csvContent = content;
      };
      reader.readAsText(file);
    }
  };

  const handleInputChange = (e: any) => {
    if (data.onInputChange) {
      data.onInputChange(e.target.value);
    }
  };

  const isOhlcNode = data.label.includes("Create OHLC Data Node");
  const isBacktestModule = data.label.includes("Backtest Module");
  const backtestFilePart = isBacktestModule ? data.label.split(" - ")[1] : null;

  const urlPart = isOhlcNode ? data.label.split(" - ")[1] : null;
  const labelPart = isOhlcNode ? data.label.split(" - ")[0] : null;
  const backtestLabelPart = isBacktestModule
    ? data.label.split(" - ")[0]
    : null;
  const handleDownload = () => {
    const url = urlPart;
    window.open(url, "_blank");
  };
  const handleBacktestFileDownload = () => {
    const url = backtestFilePart;
    window.open(url, "_blank");
  };
  console.log("isOhlcs", data.label.split(" - ")[0]);

  return (
    <div className="custom-node">
      {data.onDelete && (
        <button className="delete-node-btn" onClick={data.onDelete}>
          X
        </button>
      )}

      <div>
        <div>
          {isBacktestModule || isOhlcNode
            ? data.label.split(" - ")[0]
            : data.label}
        </div>
        {!isBacktestModule && !isOhlcNode && data.output && (
          <div>Output: {data.output}</div>
        )}{" "}
      </div>

      {data.label === "Upload CSV Node" && (
        <div>
          <button className="upload-btn" onClick={handleUploadClick}>
            Upload CSV
          </button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="w-100"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {csvData && <p className="info-text">CSV uploaded</p>}
        </div>
      )}

      {data.label === "Token Deploy Node" && (
        <TokenDeploy onCreateReady={updateNodeData} />
      )}

      {data.label === "Input Node" && (
        <input
          type="text"
          placeholder="Enter value"
          value={data.inputValue || ""}
          onChange={handleInputChange}
          style={{
            marginTop: 5,
            padding: 3,
            width: "100%",
            border: "none",
            outline: "none",
          }}
        />
      )}

      {isOhlcNode && urlPart && (
        <div>
          <button className="download-btn" onClick={handleDownload}>
            Open JSON File
          </button>
        </div>
      )}

      {isBacktestModule && backtestFilePart && (
        <div>
          <button className="download-btn" onClick={handleBacktestFileDownload}>
            Download File
          </button>
        </div>
      )}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
