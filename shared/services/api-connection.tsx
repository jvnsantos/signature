import axios from 'axios';
import { BE_AWS_PATH } from "../constants";
import logoutService from "./logout.service";

const axiosInstance = axios.create({
  baseURL: BE_AWS_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config?.url?.includes('/openid-connect/token/refresh')) {
      logoutService({ href: '/' });
      alert('Sua sessão expirou.')
      return
    }
    if (error.config?.url?.includes('/openid-connect/token')) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  formEncoded?: boolean;
  isFormData?: boolean;
  maxBodyLength?: 'Infinity',
  responseType?: string,
};

export const API_SERVICE = async (
  url: string,
  options: RequestOptions = {},
  completeResponse?: boolean,

): Promise<any> => {
  const headers: Record<string, string> = {
    ...(options.headers || {}),
    ...(options.isFormData
      ? {} // Não define Content-Type para FormData
      : options.formEncoded
        ? { 'Content-Type': 'application/x-www-form-urlencoded' }
        : { 'Content-Type': 'application/json' }),
  };

  const config: any = {
    url,
    method: options.method || 'GET',
    headers,
  };

  if (options.method && !['GET', 'HEAD'].includes(options.method.toUpperCase())) {
    config.data = options.isFormData
      ? options.body
      : options.formEncoded
        ? new URLSearchParams(options.body).toString()
        : options.body || null;
  }

  try {
    const response = await axiosInstance.request(config);

    if (completeResponse) {
      return response;
    }
    return response.data;
  } catch (error: any) {
    console.error(error)

    if (completeResponse) {
      return error;
    }
  }
};