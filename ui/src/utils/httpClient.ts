import { getAuthToken, hasAuthToken, removeAuthToken } from "@/utils/localStorage";
import { HttpError } from "@/errors/http";
import router from "@/router";

export type HttpClientInit = Omit<RequestInit, "method">;

export type HttpMethodConfig = {
  init?: HttpClientInit;
};

function GET<T>(url: string, config?: HttpMethodConfig): Promise<T> {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("GET", config)));
}

function POST<T>(url: string, config?: HttpMethodConfig): Promise<T> {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("POST", config)));
}

function PUT<T>(url: string, config?: HttpMethodConfig): Promise<T> {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("PUT", config)));
}

function PATCH<T>(url: string, config?: HttpMethodConfig): Promise<T> {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("PATCH", config)));
}

function DELETE<T>(url: string, config?: HttpMethodConfig): Promise<T> {
  return handleErrorResponse<T>(fetch(url, setupRequestInit("DELETE", config)));
}

async function handleErrorResponse<T>(promiseResponse: Promise<Response>): Promise<T> {
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
}

function setupRequestInit(method: string, config?: HttpMethodConfig): RequestInit {
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
}

export default {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
};
