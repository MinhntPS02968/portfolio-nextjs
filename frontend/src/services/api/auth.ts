import { BaseApiClient } from "../base-api";
export { ApiError } from "../base-api";

export class AuthApi extends BaseApiClient {
  async loginDApp(signature: string) {
    return this.post("/auth/login-dapp", { signature });
  }
  async loginById(id: string) {
    return this.post("/auth/login-by-id", { id });
  }
}

export const authApi = new AuthApi();
