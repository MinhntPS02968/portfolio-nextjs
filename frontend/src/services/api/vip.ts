import { BaseApiClient } from "../base-api";
export { ApiError } from "../base-api";

export class VipBoosterApi extends BaseApiClient {
  async unlockVipBoost() {
    return this.post("/vip-boost/unlock-vip-boost");
  }
  async getMyVipBoost() {
    return this.get("/vip-boost/my-vip-boost");
  }
  async getList() {
    return this.get("/vip-boost/list");
  }
  async upgradeVip(body: any) {
    return this.post("/vip-boost/upgrade-vip", body);
  }
}

export const vipBoosterApi = new VipBoosterApi();
