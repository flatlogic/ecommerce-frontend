import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { z } from "zod";

const baseURL =
  typeof window === "undefined"
    ? (process.env.API_BASE_URL ?? "http://localhost:8080/api")
    : (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api");

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((request) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<TSchema extends z.ZodType>(
  schema: TSchema,
  config: AxiosRequestConfig,
): Promise<z.infer<TSchema>> {
  try {
    const response = await api.request<unknown>(config);
    return schema.parse(response.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new ApiError(
        error.message,
        error.response?.status,
        error.response?.data,
      );
    }
    throw error;
  }
}
