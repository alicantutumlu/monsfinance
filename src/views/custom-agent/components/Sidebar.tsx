import React, { useEffect, useState } from "react";
import { useDnD } from "../context/DndContext";
import { ApiRequest } from "../../../api";
import CustomNode from "./CustomNode";
import { getRandomColor } from "../../../utils/helper";
import CreateToolkitsModal from "../../../components/CreateToolkitsModal";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import CustomToast from "../../../components/CustomToast";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import Loader from "../../../components/Loader";
import CustomTabComponent from "../../../components/CustomTabs";

export default ({ setNodeTypes, trigger, setTrigger }: any) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [allCategories, setAllCategories] = useState([]);

  const [allToolkits, setAllToolkits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<any>("Actions");
  const [allAgents, setAllAgents] = useState<any>([]);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [_, setType] = useDnD();

  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const onDragStart = (event: any, toolkitId: string, nodeType: string) => {
    const dragData = JSON.stringify({ toolkitId, nodeType });
    console.log("Drag data being set:", dragData); // Debugging için
    event.dataTransfer.setData("application/reactflow", dragData);
    event.dataTransfer.effectAllowed = "move";
  };

  const checkTransactionStatus = async (signature: any, connection: any) => {
    try {
      const { value } = await connection.getSignatureStatuses([signature]);
      if (value && value[0] && value[0].confirmationStatus === "finalized") {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error checking transaction status:", error);
      return false;
    }
  };

  const startPolling = async (signature: any, connection: any) => {
    let isFinalized = false;
    while (!isFinalized) {
      isFinalized = await checkTransactionStatus(signature, connection);
      if (!isFinalized) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    return true;
  };

  const sendSolToRecipient = async (
    toolkitId: any,
    toolkitPrice: any,
    receiverWallet: any
  ) => {
    setLoading(true);
    if (!publicKey || !connection) {
      setLoading(false);
      return;
    }

    try {
      const balanceLamports = await connection.getBalance(publicKey);
      const balanceSol = balanceLamports / 1e9;
      if (balanceSol < toolkitPrice) {
        setLoading(false);
        return;
      }

      const recipientPubKey = new PublicKey(receiverWallet);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: toolkitPrice * 1e9,
        })
      );

      const signature = await sendTransaction(transaction, connection);

      const isFinalized = await startPolling(signature, connection);

      if (isFinalized) {
        ApiRequest.purchase({
          wallet: publicKey,
          toolkitId: toolkitId,
          price: toolkitPrice,
        })
          .then((res) => {
            CustomToast("success", "Action purchased successfully");
            setLoading(false);
            setTrigger(!trigger);
          })
          .catch((err) => {
            CustomToast("error", "Toolkit purchased fail");
            setLoading(false);
          });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (publicKey) {
      ApiRequest.getAllCategories().then((res) => {
        setAllCategories(res.data);
      });

      ApiRequest.getAllPurchaseToolkit({ wallet: publicKey }).then((res) => {
        setAllToolkits(res.data.data);

        const dynamicNodeTypes: any = {};
        res.data.data.forEach((toolkit: any) => {
          dynamicNodeTypes[toolkit.toolkitName] = CustomNode;
        });
        setNodeTypes({
          ...dynamicNodeTypes,
          input: CustomNode,
          output: CustomNode,
        });
      });
    }
  }, [setNodeTypes, trigger, publicKey]);
  useEffect(() => {
    if (publicKey) {
      ApiRequest.getAgentByOwnerWallet({ ownerWallet: publicKey })
        .then((res) => {
          setAllAgents(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [trigger, publicKey]);
  console.log("all agente bak", allAgents);
  // Statik düğümleri tanımlıyoruz (Input/Output)
  const staticNodes = [
    { id: "1", name: "Input", nodeType: "input" },
    { id: "2", name: "Output", nodeType: "output" },
  ];

  // Statik düğümleri search sorgusuna göre filtreliyoruz
  const filteredBasicNodes = staticNodes.filter((node) =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Kategori açma/kapama işlemi
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  console.log("all tools", allToolkits);
  return (
    <aside className={``}>
      {loading && <Loader />}

      <div className="d-flex flex-column items-start w-100 p-3">
        <div className="description w-100">
          You can drag these{" "}
          {`${selectedTab === "Actions" ? "actions" : "agents"}`} to the pane on
          the right.
        </div>

        <CustomTabComponent
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabs={[{ title: "Actions" }, { title: "Saved Agents" }]}
        />

        {selectedTab === "Actions" && (
          <>
            <input
              type="text"
              placeholder="Search actions..."
              value={searchQuery}
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Basic kategorisi (Input/Output) */}
            <div key="basic" className="dropdown-container">
              <div
                className="dropdown-header"
                onClick={() => toggleCategory("basic")}>
                <span>Basic</span>
                {expandedCategories["basic"] ? (
                  <img
                    src="/icons/dropdown-close.svg"
                    className="img-transition"
                    alt=""
                  />
                ) : (
                  <img
                    src="/icons/dropdown-open.svg"
                    className="img-transition"
                    alt=""
                  />
                )}
              </div>

              {expandedCategories["basic"] && (
                <div
                  className={`px-2 py-2 d-flex flex-wrap gap-2  ${
                    expandedCategories["basic"] ? "expanded" : ""
                  }`}>
                  {filteredBasicNodes.map((node) => (
                    <div
                      key={node.id}
                      className={`  actions position-relative`}
                      onDragStart={(event) =>
                        onDragStart(event, node.id, node.nodeType)
                      }
                      draggable>
                      {node.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {allCategories.map((cat: any) => {
              const categoryToolkits = allToolkits.filter((toolkit: any) => {
                const matchSearch = toolkit.toolkitName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
                const matchCategory = toolkit.categoryName === cat.name;
                return matchSearch && matchCategory;
              });

              if (!categoryToolkits.length) return null;

              return (
                <div key={cat._id} className="dropdown-container">
                  <div
                    className="dropdown-header"
                    onClick={() => toggleCategory(cat._id)}>
                    <span>{cat.name}</span>
                    {expandedCategories[cat._id] ? (
                      <img
                        src="/icons/dropdown-close.svg"
                        className="img-transition"
                        alt=""
                      />
                    ) : (
                      <img
                        src="/icons/dropdown-open.svg"
                        alt=""
                        className="img-transition"
                      />
                    )}
                  </div>

                  {expandedCategories[cat._id] && (
                    <div
                      className={`dropdown-content px-2 py-2 d-flex flex-wrap gap-2 ${
                        expandedCategories[cat._id] ? "expanded" : ""
                      }`}>
                      {categoryToolkits.map((toolkit: any) => (
                        <div
                          key={toolkit._id}
                          className=" actions position-relative"
                          onClick={() => {
                            if (toolkit.price > 0 && !toolkit.isBuy) {
                              sendSolToRecipient(
                                toolkit._id,
                                toolkit.price,
                                toolkit.ownerWallet
                              );
                            }
                          }}
                          onDragStart={(event) => {
                            if (toolkit.price === 0 || toolkit.isBuy) {
                              onDragStart(
                                event,
                                toolkit._id,
                                toolkit.toolkitName
                              );
                            }
                          }}
                          draggable={toolkit.price === 0 || toolkit.isBuy}>
                          {toolkit.price === 0 || toolkit.isBuy ? (
                            ""
                          ) : (
                            <img
                              src="/icons/diamond.png"
                              className="diamond"
                              alt="diamond"
                              style={{ zIndex: 99999999 }}
                            />
                          )}

                          {toolkit.toolkitName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="d-flex items-center justify-center w-100">
              <div
                onClick={handleOpenModal}
                className="mainButton d-flex items-center justify-center py-3 px-3"
                style={{ marginTop: "10px" }}>
                Create New Action
              </div>
            </div>
          </>
        )}
        {selectedTab === "Saved Agents" && (
          <>
            <div className="d-flex align-items-center flex-wrap gap-2">
              {allAgents.map((item: any, index: any) => (
                <div
                  key={item._id}
                  className="actions"
                  draggable
                  onDragStart={(event) => {
                    const agentData = JSON.stringify({
                      type: "agent",
                      nodes: item.nodes,
                      edges: item.edges,
                    });
                    event.dataTransfer.setData(
                      "application/reactflow",
                      agentData
                    );
                    event.dataTransfer.effectAllowed = "move";
                  }}>
                  {item.name}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <CreateToolkitsModal
        publicKey={publicKey}
        trigger={trigger}
        setTrigger={setTrigger}
        isOpen={isOpenModal}
        handleCloseModal={handleCloseModal}
        allCategories={allCategories}
      />
    </aside>
  );
};
