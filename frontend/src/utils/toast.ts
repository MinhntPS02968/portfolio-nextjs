"use client";

import { toast } from "react-toastify";

export class useToast {
  private static config: any = {
    autoClose: 5000,
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  static success(message: string, options?: any) {
    toast.success(message, { ...this.config, ...options });
  }

  static error(message: string, options?: any) {
    toast.error(message, { ...this.config, ...options });
  }

  static info(message: string, options?: any) {
    toast.info(message, { ...this.config, ...options });
  }

  static warning(message: string, options?: any) {
    toast.warning(message, { ...this.config, ...options });
  }
}
