import { BaseApiClient } from "../base-api";
export { ApiError } from "../base-api";

export interface PackageItem {
  ProductID: string;
  BOT: string;
  Type: string;
  MinPrice: string;
  MaxPrice: string;
  Profit: string;
  Fee_rent: string;
  Fee_withdraw: string;
  period: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface ApiResponseWithPagination<T = any> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
}

export class PackageApi extends BaseApiClient {
  async investmentBot(body: any) {
    return this.post("/staking/investment-bot", body);
  }
  async checkBeforeInvest(body: any) {
    return this.post("/staking/check-before-invest", body);
  }
  async getList(): Promise<ApiResponse<PackageItem[]>> {
    return this.get("/staking/list");
  }
  async myBots(): Promise<ApiResponse<any[]>> {
    return this.get("/staking/my-bots");
  }
  async buyPackage(data: any) {
    return this.post("/staking/buy-package", data);
  }
  async claimProfit(data: { id: number }): Promise<ApiResponse<any>> {
    return this.post("/staking/claim-profit", data);
  }
  async historyStaking(data?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponseWithPagination<any>> {
    return this.post("/staking/history-staking", data || {});
  }
}

export const packageApi = new PackageApi();
