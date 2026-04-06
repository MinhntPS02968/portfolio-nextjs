"use client";

import axios from "axios";
import { useCookie, useLocalStorage } from "@/utils/storage";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface IResponseCustom {
  data: any | undefined;
  status: number | undefined;
  message: string | undefined;
  code: number | undefined;
  success: boolean | undefined;
}

export async function PostApi(
  path: string,
  body: any = {},
  headers: any = {}
): Promise<IResponseCustom> {
  const token = useCookie.get(
    process.env.NEXT_PUBLIC_TOKEN_NAME ?? "client_token"
  );
  return new Promise((resolve, reject) => {
    return instance
      .post(path, body, {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response?.data || error);
      });
  });
}

export async function GetApi(
  path: string,
  body: any = {},
  headers: any = {}
): Promise<IResponseCustom> {
  const token = useCookie.get(
    process.env.NEXT_PUBLIC_TOKEN_NAME ?? "client_token"
  );
  return new Promise((resolve, reject) => {
    return instance
      .get(path, {
        params: body,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response?.data || error);
      });
  });
}
