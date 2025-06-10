import { getAuthToken, removeAuthToken } from "@/utils/localStorage.ts";
import { HttpError } from "@/errors/http.ts";
import router from "@/router";

type HttpClientInit = Omit<RequestInit, "method">;

type HttpMethodConfig = {
  init?: HttpClientInit;
  isAuth?: boolean;
};

const GET = async <T>(url: string, config: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit(config, "GET")));
};

const POST = async <T>(url: string, config: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit(config, "POST")));
};

const PUT = async <T>(url: string, config: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit(config, "PUT")));
};

const PATCH = async <T>(url: string, config: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit(config, "PATCH")));
};

const DELETE = async <T>(url: string, config: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit(config, "DELETE")));
};

const handleErrorResponse = async <T>(promiseResponse: Promise<Response>): Promise<T> => {
  const res = await promiseResponse;
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      removeAuthToken();
      await router.push({ name: "auth" });

      return data;
    }

    throw new HttpError(data.message, data.status);
  }

  return data;
};

const setupRequestInit = (config: HttpMethodConfig, method: string): RequestInit => {
  const token = getAuthToken();
  const init: RequestInit = {
    ...(config.init ?? {}),
    method,
    headers: {
      ...(config.init?.headers ?? {}),
      "Content-Type": "application/json",
    },
  };

  if (config.isAuth) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return init;
};

export default {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
};
