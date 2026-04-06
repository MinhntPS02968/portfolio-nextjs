import { BaseApiClient } from "../base-api";

export interface SwapRateResponse {
  USDT_TO_OTC: number;
  OTC_TO_USDT: number;
}

export interface SwapSignatureResponse {
  tokenIn: string;
  tokenOut: string;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: number;
  amountInWei: string;
  rate: string;
  deadline: number;
  signature: string;
}

export interface SwapHistoryItem {
  _id: string;
  transaction_hash?: string;
  token_in: string;
  token_out: string;
  amount_in: number;
  amount_out: number;
  rate: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SwapHistoryResponse {
  docs: SwapHistoryItem[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
}

export class SwapApi extends BaseApiClient {
  async getRate(): Promise<SwapRateResponse> {
    return this.get("/swap/rate");
  }

  async getSwapSignature(data: {
    tokenIn: string;
    tokenOut: string;
    amountIn: number;
  }): Promise<SwapSignatureResponse> {
    return this.post("/swap/get-signature", data);
  }

  async getHistory(data: {
    page: number;
    limit: number;
  }): Promise<SwapHistoryResponse> {
    return this.post("/swap/history", data);
  }
}

export const swapApi = new SwapApi();
