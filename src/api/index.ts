import axios, { AxiosError, AxiosResponse } from "axios";
import { createHmac } from "crypto";

const secretKey: any = process.env.NEXT_PUBLIC_SECRET_KEY;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1200000,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
export const nftServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1200000,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

export const agentServiceInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1200000,
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});

agentServiceInstance.interceptors.request.use(
  (config) => {
    const timestamp = Date.now().toString();
    const hash = createHmac("sha256", secretKey)
      .update(timestamp)
      .digest("hex");
    config.headers["type"] = process.env.NEXT_PUBLIC_CLUSTER;
    config.headers["timestamp"] = timestamp;
    config.headers["signature_key"] = hash;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const instanceFile = axios.create({
  baseURL: "https://tradesight-reload.mindmons.com",
  timeout: 1200000,
  headers: {
    "Content-Type": "application/json",
  },
});

nftServiceInstance.interceptors.request.use(
  (config) => {
    const timestamp = Date.now().toString();
    const hash = createHmac("sha256", secretKey)
      .update(timestamp)
      .digest("hex");
    config.headers["type"] = process.env.NEXT_PUBLIC_CLUSTER;
    config.headers["timestamp"] = timestamp;
    config.headers["signature_key"] = hash;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  postFormData: async (url: string, body: any) => {
    return instanceFile
      .post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(responseBody);
  },
};

const nftServiceRequests = {
  get: (url: string) => nftServiceInstance.get(url).then(responseBody),
  post: (url: string, body: {}) =>
    nftServiceInstance.post(url, body).then(responseBody),
};

export const ApiRequest = {
  createLootBox: (payload: any) => request.post("/api/pack/create", payload),
  getAllLootBox: () => request.get("/api/pack/getAll"),
  createBuy: (payload: any) => request.post("/api/pack/buy", payload),
  claimPack: (payload: any) => request.post("/api/pack/claim", payload),
  getPackById: (id: any): Promise<any> =>
    request.get(`/api/pack/getByBuyerAddress/${id}`),
  getAllTokens: () => request.get("/api/token/getAll"),
  tokenCreate: (payload: any) => request.post("/api/token/create", payload),
  tokenDelete: (payload: any) => request.post("/api/token/delete", payload),
  walletCreate: (payload: any) => request.post("/api/wallets/create", payload),
  getOwnedNFTs: (payload: any) =>
    nftServiceInstance.post("/api/getAssetByOwner", payload),
  getNFTByID: (payload: any) =>
    nftServiceInstance.post("/api/getLastMinuteCnftByUser", payload),
  mintNFT: (payload: any) =>
    nftServiceInstance.post("/api/mintNftPack", payload),

  getAllToolkits: () => request.get("/api/toolkits/getAll"),
  getAllPurchaseToolkit: (payload: any) =>
    nftServiceInstance.post("/api/toolkits/getAllPurchased", payload),
  executePipeline: (payload: any) => request.post("/api/toolkits/exe", payload),

  check: () => nftServiceInstance.get("/api/check"),
  createToolkit: (payload: any) =>
    nftServiceInstance.post("/api/toolkits/create", payload),
  purchase: (payload: any) =>
    nftServiceInstance.post("/api/toolkits/purchase", payload),
  getAllCategories: () => request.get("/api/toolkits/getAllCategories"),
  createAgent: (payload: any) =>
    nftServiceInstance.post("/api/agents/create", payload),
  getAgentByOwnerWallet: (payload: any) =>
    nftServiceInstance.post("/api/agents/getByWallet", payload),

  //-----------------------------------------------

  getAllAgent: (payload: any) =>
    agentServiceInstance.post("/api/agency", payload),
  createAgency: (payload: any) =>
    agentServiceInstance.post("/api/agency/create", payload),
  createCategory: (payload: any) =>
    agentServiceInstance.post("/api/agency/create", payload),

  upload: (payload: any) => request.postFormData("/upload", payload),
};
