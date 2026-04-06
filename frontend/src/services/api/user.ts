import { BaseApiClient } from "../base-api";
export { ApiError } from "../base-api";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export class UserApi extends BaseApiClient {
  async getHistory(dto: any): Promise<ApiResponse<any>> {
    return this.post("/user/history", dto);
  }
  async withdrawBsc(body: any): Promise<ApiResponse<any>> {
    return this.post("/user/withdraw-bsc", body);
  }
  async me(): Promise<ApiResponse<any>> {
    return this.get("/user/me");
  }
  async balance(): Promise<ApiResponse<any>> {
    return this.get("/user/balance");
  }
  async referrals(dto: any): Promise<ApiResponse<any>> {
    return this.get("/user/referrals", { params: dto });
  }
}

export const userApi = new UserApi();
