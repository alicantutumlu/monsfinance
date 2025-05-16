import React, { useRef, useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "./components/Sidebar";
import { DnDProvider } from "./context/DndContext";
import { useTheme } from "../../context/ThemeContext";
import { ApiRequest } from "../../api";
import TestHeader from "../../components/test/TestHeader";
import CreateAgentsModal from "../../components/CreateAgentsModal";
import { useWallet } from "@solana/wallet-adapter-react";
import { NodesProvider } from "../../context/NodesContext";

const initialNodes: any = [];

const DnDFlow = () => {
  const { publicKey } = useWallet();
  const [isOpenSaveModal, setIsOpenSaveModal] = useState(false);
  const [nodeTypes, setNodeTypes] = useState<any>();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();
  const { theme } = useTheme();

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );
  const handleCloseModal = () => {
    setIsOpenSaveModal(false);
  };
  console.log("nodes nedir", nodes);
  const handleSave = () => {
    setIsOpenSaveModal(true);
  };
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // const onDrop = useCallback(
  //   (event: any) => {
  //     event.preventDefault();
  //     const data = JSON.parse(
  //       event.dataTransfer.getData("application/reactflow")
  //     );
  //     const { toolkitId, nodeType } = data;

  //     if (!nodeType) return;

  //     const position = screenToFlowPosition({
  //       x: event.clientX,
  //       y: event.clientY,
  //     });

  //     const newNode: any = {
  //       id: toolkitId, // API'den gelen _id kullanılıyor
  //       type: nodeType,
  //       position,
  //       data: {
  //         label: `${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)} Node`,
  //         status: "idle",
  //         // fn: nodeFunctions[nodeType], // Backend'de çalışacaksa bu alan kaldırılabilir
  //       },
  //       style: { border: "2px solid gray" },
  //     };

  //     setNodes((nds) => nds.concat(newNode));
  //   },
  //   [screenToFlowPosition]
  // );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );

      if (data.type === "agent") {
        const { nodes: agentNodes, edges: agentEdges } = data;

        const dropPosition = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        if (!agentNodes.length) return;
        const referenceNode = agentNodes[0];
        const referenceOriginalPosition = referenceNode.position;

        const deltaX = dropPosition.x - referenceOriginalPosition.x;
        const deltaY = dropPosition.y - referenceOriginalPosition.y;

        const idMapping: any = {};
        const newNodes = agentNodes.map((node: any) => {
          const newId = `${node.id}`;
          idMapping[node.id] = newId;
          return {
            ...node,
            id: newId,
            position: {
              x: node.position.x + deltaX,
              y: node.position.y + deltaY,
            },
          };
        });

        const newEdges = agentEdges.map((edge: any) => ({
          ...edge,
          id: `${edge.id}-${Date.now()}`,
          source: idMapping[edge.source],
          target: idMapping[edge.target],
        }));

        setNodes((nds) => nds.concat(newNodes));
        setEdges((eds) => eds.concat(newEdges));
      } else {
        const { toolkitId, nodeType } = data;
        if (!nodeType) return;

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: any = {
          id: toolkitId,
          type: nodeType,
          position,
          data: {
            label: `${
              nodeType.charAt(0).toUpperCase() + nodeType.slice(1)
            } Node`,
            status: "idle",
          },
          style: { border: "2px solid gray" },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [screenToFlowPosition, setNodes, setEdges]
  );

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };
  console.log("nodes nedir", nodes);

  const getTopologicalOrder = (nodes: any, edges: any) => {
    const graph: any = {};
    const indegree: any = {};

    nodes.forEach((node: any) => {
      graph[node.id] = [];
      indegree[node.id] = 0;
    });
    edges.forEach((edge: any) => {
      graph[edge.source].push(edge.target);
      indegree[edge.target] = (indegree[edge.target] || 0) + 1;
    });

    const queue = nodes
      .filter((node: any) => indegree[node.id] === 0)
      .map((node: any) => node.id);
    const order = [];

    while (queue.length > 0) {
      const nodeId = queue.shift();
      order.push(nodeId);
      graph[nodeId].forEach((neighbor: any) => {
        indegree[neighbor]--;
        if (indegree[neighbor] === 0) {
          queue.push(neighbor);
        }
      });
    }

    if (order.length === nodes.length) {
      return order;
    } else {
      throw new Error("Graph has a cycle");
    }
  };

  const executePipeline = async () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, status: "idle", output: null },
        style: { border: "2px solid gray" },
      }))
    );

    const order = getTopologicalOrder(nodes, edges);
    const nodeOutputs: any = {};
    console.log("order", order);

    for (const nodeId of order) {
      const currentNode: any = nodes.find((node) => node.id === nodeId);

      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, status: "running" },
                style: { border: "2px solid orange" },
              }
            : node
        )
      );

      const incomingEdges = edges.filter((edge) => edge.target === nodeId);
      const input =
        incomingEdges.length > 0 ? nodeOutputs[incomingEdges[0].source] : null;

      try {
        if (currentNode.data.label === "Input Node") {
          const result = currentNode.data.inputValue || "No input provided";
          nodeOutputs[nodeId] = result;

          setNodes((nds) =>
            nds.map((node: any) =>
              node.id === nodeId
                ? {
                    ...node,
                    data: {
                      ...node.data,
                      status: "completed",
                      output: result,
                      label: `${node.data.label.split(" - ")[0]} - ${result}`,
                    },
                    style: { border: "1px solid #24d5a0" },
                  }
                : node
            )
          );
        } else if (currentNode.data.label === "Token Deploy Node") {
          // burada token deploy fonksiyonları çalıştırılmalıdır.

          if (currentNode.data.create) {
            await currentNode.data.create(); // create fonksiyonunu çalıştır
            const result = "Token deployed successfully";
            nodeOutputs[nodeId] = result;

            setNodes((nds) =>
              nds.map((node: any) =>
                node.id === nodeId
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        status: "completed",
                        output: result,
                      },
                      style: { border: "1px solid #24d5a0" },
                    }
                  : node
              )
            );
          } else {
            throw new Error("Create function not found for Token Deploy Node");
          }
        } else {
          // Diğer node'lar için API isteği
          const response = await ApiRequest.executePipeline({
            id: nodeId,
            params: input,
          });

          const result = response.data;
          nodeOutputs[nodeId] = result;

          if (response.status === "error") {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === nodeId
                  ? {
                      ...node,
                      data: { ...node.data, status: "error" },
                      style: { border: "1px solid #f23645" },
                    }
                  : node
              )
            );
          } else {
            setNodes((nds) =>
              nds.map((node: any) =>
                node.id === nodeId
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        status: "completed",
                        output: result,
                        label: `${node.data.label.split(" - ")[0]} - ${result}`,
                      },
                      style: { border: "1px solid #24d5a0" },
                    }
                  : node
              )
            );
          }
        }
      } catch (error) {
        console.error(`Node ${nodeId} çalıştırılırken hata oluştu:`, error);
        setNodes((nds) =>
          nds.map((node) =>
            node.id === nodeId
              ? {
                  ...node,
                  data: { ...node.data, status: "error" },
                  style: { border: "1px solid #f23645" },
                }
              : node
          )
        );
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };
  const handleRun = () => {
    executePipeline();
  };

  const [trigger, setTrigger] = useState<boolean>(false);
  return (
    <div
      className="dndflow position-relative"
      style={
        theme === "dark"
          ? { height: "100vh", background: "url('/mons/bodyBgDark.svg')" }
          : { height: "100vh", background: "url('/mons/bodyBgLight.svg')" }
      }>
      <button onClick={handleRun} className="run-button">
        Run
      </button>
      <button onClick={handleSave} className="save-button">
        Save
      </button>

      <Sidebar
        setNodeTypes={setNodeTypes}
        trigger={trigger}
        setTrigger={setTrigger}
      />

      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <NodesProvider setNodes={setNodes}>
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: {
                ...node.data,
                onDelete: () => handleDeleteNode(node.id),
                onInputChange: (value: any) => {
                  setNodes((nds) =>
                    nds.map((n) =>
                      n.id === node.id
                        ? { ...n, data: { ...n.data, inputValue: value } }
                        : n
                    )
                  );
                },
              },
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}>
            <Controls />
            <Background />
          </ReactFlow>
        </NodesProvider>
      </div>
      <CreateAgentsModal
        publicKey={publicKey}
        trigger={trigger}
        setTrigger={setTrigger}
        isOpen={isOpenSaveModal}
        handleCloseModal={handleCloseModal}
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
};

const CustomAgent = () => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className="_root_fyet9_19"
        style={
          theme === "dark"
            ? { background: "url('/mons/bodyBgDark.svg')" }
            : { background: "url('/mons/bodyBgLight.svg')" }
        }>
        <div className="_column_fyet9_43 true">
          <TestHeader />
          <div className="flow-wrapper">
            <ReactFlowProvider>
              <DnDProvider>
                <DnDFlow />
              </DnDProvider>
            </ReactFlowProvider>
          </div>
        </div>
      </div>
    </>
  );
};
export default CustomAgent;
