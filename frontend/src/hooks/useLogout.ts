"use client";

import { useAuthStore } from "@/stores/auth";
import { deleteCookie } from "@/utils/cookie";
import { useDisconnect } from "@reown/appkit/react";
import { useAccountStore } from "@/stores/account";

export function useLogout() {
  const reset = useAuthStore((state) => state.reset);
  const resetAccount = useAccountStore((state) => state.reset);
  const { disconnect } = useDisconnect();

  const logout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    // Xóa cookie client_token
    deleteCookie("client_token");

    try {
      // Reset auth store
      resetAccount();
      reset();

      // Disconnect wallet (nếu đang kết nối web3)
      await disconnect();
    } catch (error) {
      console.error("Error when logging out:", error);
    }
  };

  return logout;
}
