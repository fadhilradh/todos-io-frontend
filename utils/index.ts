import axios, { AxiosPromise, AxiosRequestConfig, Method } from "axios";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getTokenData, removeTokenData } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function api<T>(
  method: Method,
  path: string,
  options: AxiosRequestConfig = {},
): Promise<T> {
  function request(): AxiosPromise<T> {
    const url = `${baseURL}${path}`;
    const requestHeaders = {
      Authorization: `Bearer ${getTokenData()}`,
      ...(options.headers ?? defaultHeaders),
    };

    return axios({
      ...options,
      headers: requestHeaders,
      method: method ?? "GET",
      url,
      data: options.data,
    });
  }

  try {
    const response = await request();
    return response.data;
  } catch (e) {
    if (
      e.response?.status === 401 &&
      e.response?.data?.error === "Token has expired"
    ) {
      removeTokenData();
      window.location.href = "/login?expired=true";
    }
    throw e;
  }
}
