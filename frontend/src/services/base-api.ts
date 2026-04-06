import { useAuthStore } from "@/stores/auth";
import { useCookie, useLocalStorage } from "@/utils/storage";
import axios, { AxiosInstance, AxiosError } from "axios";
import https from "https";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:2053";

export class ApiError extends Error {
  constructor(message: string, public status: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

export abstract class BaseApiClient {
  protected client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        // Add auth token if available
        const token = this.getAuthToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const message =
          (error.response?.data as any)?.message ||
          (error.response?.data as any)?.error ||
          error.message;
        const status = error.response?.status || 0;

        // Handle 401 Unauthorized
        if (status === 401) {
          this.handleUnauthorized();
        }

        throw new ApiError(message, status, error.response?.data);
      }
    );
  }

  // Protected methods for subclasses to override
  protected getAuthToken(): string | null {
    try {
      const state = useAuthStore.getState();
      const token = state?.token;

      // Debug: Log để kiểm tra token
      if (!token) {
        console.warn("Auth token is null or undefined in store");
      }

      return token || null;
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  }

  protected async handleUnauthorized(): Promise<void> {
    // Cookies.remove("client_token");
    // localStorage.clear();
    // sessionStorage.clear();
    // window.location.href = "/login-web3";
  }

  // Common HTTP methods
  protected async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  protected async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  protected async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  protected async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
