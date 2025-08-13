import axios from "axios";
import { BE_AWS_PATH } from "../constants";
import logoutService from "./logout.service";

const axiosInstance = axios.create({
  baseURL: BE_AWS_PATH,
  // Não define Content-Type global para evitar conflito com FormData
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config?.url?.includes("/openid-connect/token/refresh")) {
      logoutService({ href: "/" });
      alert("Sua sessão expirou.");
      return;
    }
    if (error.config?.url?.includes("/openid-connect/token")) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  formEncoded?: boolean;
  isFormData?: boolean;
  maxBodyLength?: number;
  responseType?: string;
};

export const API_SERVICE = async (
  url: string,
  options: RequestOptions = {},
  completeResponse?: boolean
): Promise<any> => {
  const headers: Record<string, string> = { ...(options.headers || {}) };

  // Define Content-Type apenas se não for FormData
  if (options.isFormData) {
    delete headers["Content-Type"];
  } else if (options.formEncoded) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  } else {
    headers["Content-Type"] = "application/json";
  }

  const config: any = {
    url,
    method: options.method || "GET",
    headers,
  };

  if (
    config.method &&
    !["GET", "HEAD"].includes(config.method.toUpperCase())
  ) {
    config.data = options.isFormData
      ? options.body // Envia FormData direto
      : options.formEncoded
      ? new URLSearchParams(options.body).toString()
      : options.body ?? null;
  }

  if (options.maxBodyLength !== undefined) {
    config.maxBodyLength = options.maxBodyLength;
  }

  if (options.responseType) {
    config.responseType = options.responseType;
  }

  try {
    const response = await axiosInstance.request(config);
    return completeResponse ? response : response.data;
  } catch (error: any) {
    console.error(error);
    if (completeResponse) {
      return error;
    }
    throw error;
  }
};
