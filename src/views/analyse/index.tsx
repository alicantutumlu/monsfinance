import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import "react-flow-renderer/dist/style.css";
import TestHeader from "../../components/test/TestHeader";
import ReactFlow, {
  Controls,
  Position,
  Handle,
  addEdge,
} from "react-flow-renderer";
import ChatSidebar from "../chat-nft-pack/chat-sidebar/ChatSidebar";
import { useFormik } from "formik";
import { AiProducts } from "../../components/toolkitCards/AiProducts";
import { DocumentUpload } from "../../components/toolkitCards/DocumentUpload";
import { AnalyzeDocument } from "../../components/toolkitCards/AnalyzeDocument";
import { StartBacktest } from "../../components/toolkitCards/StartBacktest";
import { Trade } from "../../components/toolkitCards/Trade";

const AnalysePage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const handleRunStop = () => {
    setIsRunning((prev) => !prev);
  };

  // CustomNode Bileşeni
  const CustomNode = ({ data, id }: any) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);

    let cardComponent;
    switch (data.cardType) {
      case "aiProducts":
        cardComponent = <AiProducts />;
        break;
      case "documentUpload":
        cardComponent = <DocumentUpload />;
        break;
      case "analyzeDocument":
        cardComponent = <AnalyzeDocument isCompleted={data.isRunning} />;
        break;
      case "startBacktest":
        cardComponent = <StartBacktest isCompleted={data.isRunning} />;
        break;
      case "trade":
        cardComponent = <Trade isCompleted={data.isRunning} />;
        break;
      default:
        cardComponent = null;
    }

    return (
      <>
        <Handle
          type="target"
          position={Position.Left}
          style={{
            background: "#17e1aa",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
          }}
        />
        {cardComponent}
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: "#17e1aa", width: "12px", height: "12px" }}
        />
      </>
    );
  };

  // Durum ve Hook'lar
  const [flowChartData, setFlowChartData] = useState<any>([]);
  const [edges, setEdges] = useState<any>([]);
  const { theme } = useTheme();

  const deleteStep = useCallback((id: any) => {
    setFlowChartData((prev: any) => prev.filter((node: any) => node.id !== id));
    setEdges((prev: any) =>
      prev.filter((edge: any) => edge.source !== id && edge.target !== id)
    );
  }, []);

  const editStep = useCallback((id: any, stepData: any) => {
    setFlowChartData((prev: any) =>
      prev.map((node: any) =>
        node.id === id ? { ...node, data: { ...node.data, ...stepData } } : node
      )
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      nodeType: "",
      aiProducts: "",
      documentUpload: "",
      analyzeDocument: "",
      trade: "",
      apiKey: "",
      startBacktest: "",
    } as any,
    onSubmit: (values) => {
      const maxX = flowChartData.reduce(
        (max: any, node: any) => Math.max(max, node.position.x),
        0
      );
      const newX = maxX + 400;
      const newNode = {
        id: `${flowChartData.length + 1}`,
        type: "customNode",
        position: { x: newX, y: 100 },
        data: {
          step_name: `Step ${flowChartData.length + 1}`,
          step_details: `Details for Step ${flowChartData.length + 1}`,
          step_number: flowChartData.length + 1,
          cardType: values.nodeType,
          isRunning, // Yeni node'a isRunning durumunu ekliyoruz
        },
      };
      setFlowChartData((prev: any) => [...prev, newNode]);
      formik.resetForm();
    },
  });

  // Node'ları oluşturma ve güncelleme
  useEffect(() => {
    const nodeTypes = [
      { key: "aiProducts", cardType: "aiProducts" },
      { key: "documentUpload", cardType: "documentUpload" },
      { key: "analyzeDocument", cardType: "analyzeDocument" },
      { key: "startBacktest", cardType: "startBacktest" },
      { key: "trade", cardType: "trade" },
    ];

    const nodes: any = [];
    let x = 0;
    const y = 100;
    const step = 400;
    let stepNumber = 1;

    nodeTypes.forEach(({ key, cardType }) => {
      if (formik.values[key]) {
        nodes.push({
          id: `${stepNumber}`,
          type: "customNode",
          position: { x, y },
          data: {
            step_name: `Step ${stepNumber}`,
            step_details: `Details for Step ${stepNumber}`,
            step_number: stepNumber,
            cardType,
            config: formik.values[key],
            isRunning, // Her node'a isRunning durumunu ekliyoruz
          },
        });
        x += step;
        stepNumber++;
      }
    });

    setFlowChartData(nodes);

    // Ardışık node'lar arasına bağlantı (edge) ekleme
    const newEdges = [];
    for (let i = 1; i < nodes.length; i++) {
      newEdges.push({
        id: `e${nodes[i - 1].id}-${nodes[i].id}`,
        source: nodes[i - 1].id,
        target: nodes[i].id,
        style: { stroke: "#17e1aa" },
      });
    }
    setEdges(newEdges);
  }, [formik.values]);

  // isRunning değiştiğinde mevcut node'ları güncelle
  useEffect(() => {
    setFlowChartData((prev: any) =>
      prev.map((node: any) => ({
        ...node,
        data: { ...node.data, isRunning },
      }))
    );
  }, [isRunning]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            style: { stroke: "#17e1aa" },
            labelStyle: { fill: "blue", fontWeight: "bold" },
            labelBgStyle: { fill: "#17e1aa" },
          },
          eds
        )
      ),
    [setEdges]
  );

  const flowChartDataWithDeleteAndEdit = useMemo(
    () =>
      flowChartData.map((node: any) => ({
        ...node,
        data: { ...node.data, deleteStep, editStep },
      })),
    [flowChartData, deleteStep, editStep]
  );

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const proOptions = { hideAttribution: true };

  return (
    <div
      style={
        theme === "dark"
          ? { height: "100vh", background: "url('/mons/bodyBgDark.svg')" }
          : { height: "100vh", background: "url('/mons/bodyBgLight.svg')" }
      }>
      <div className="row px-0 mx-0 d-flex align-items-stretch h-100">
        <div className="col-lg-2 mt-4 d-flex">
          <ChatSidebar isAnalyse={true} formik={formik}></ChatSidebar>
        </div>
        <div className="col-lg-10 d-flex flex-column h-100">
          <TestHeader />
          <ReactFlow
            style={{
              height: "100%",
              position: "relative",
              zIndex: 99,
              maxHeight: 780,
              background: "transparent",
            }}
            nodes={flowChartDataWithDeleteAndEdit}
            edges={edges}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView>
            <Controls />
          </ReactFlow>
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}>
            <button
              onClick={handleRunStop}
              style={{
                backgroundColor: isRunning ? "red" : "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}>
              {isRunning ? "Stop" : "Run"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysePage;
