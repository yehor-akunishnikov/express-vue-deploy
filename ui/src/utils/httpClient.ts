import { getAuthToken, hasAuthToken, removeAuthToken } from "@/utils/localStorage.ts";
import { HttpError } from "@/errors/http.ts";
import router from "@/router";

type HttpClientInit = Omit<RequestInit, "method">;

type HttpMethodConfig = {
  init?: HttpClientInit;
};

const GET = async <T>(url: string, config?: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("GET", config)));
};

const POST = async <T>(url: string, config?: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("POST", config)));
};

const PUT = async <T>(url: string, config?: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("PUT", config)));
};

const PATCH = async <T>(url: string, config?: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("PATCH", config)));
};

const DELETE = async <T>(url: string, config?: HttpMethodConfig): Promise<T> => {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("DELETE", config)));
};

const handleErrorResponse = async <T>(promiseResponse: Promise<Response>): Promise<T> => {
  const res = await promiseResponse;
  const data = await res.json();

  if (!res.ok) {
    if (res.status === 401) {
      removeAuthToken();
      router.push({ name: "auth" });
    }

    throw new HttpError(data.message, data.status);
  }

  return data;
};

const setupRequestInit = (method: string, config?: HttpMethodConfig): RequestInit => {
  const init: RequestInit = {
    ...(config?.init ?? {}),
    method,
    headers: {
      ...(config?.init?.headers ?? {}),
      "Content-Type": "application/json",
    },
  };

  if (hasAuthToken()) {
    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${getAuthToken()}`,
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
