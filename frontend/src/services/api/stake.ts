import { BaseApiClient } from "../base-api";
export { ApiError } from "../base-api";

export class StakeApi extends BaseApiClient {
  async withdrawPackage(body: any) {
    return this.post("/staking/withdraw-package", body);
  }
  async doStakePackage(body: any) {
    return this.post("/staking/do-stake-package", body);
  }
}

export const stakeApi = new StakeApi();
