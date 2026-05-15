import axios, { AxiosError } from "axios";
import { siteConfig } from "@/lib/config/site";

export type ApiErrorKind = "network" | "timeout" | "http" | "unknown";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly kind: ApiErrorKind,
    public readonly status?: number,
    public readonly retryable = false
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const wordpressClient = axios.create({
  baseURL: `https://public-api.wordpress.com/wp/v2/sites/${siteConfig.wordpressSite}`,
  timeout: 10000,
  headers: {
    Accept: "application/json"
  },
  paramsSerializer: {
    serialize: (params) => new URLSearchParams(params as Record<string, string>).toString()
  }
});

wordpressClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === "ECONNABORTED") {
      throw new ApiError("WordPress API request timed out.", "timeout", undefined, true);
    }

    if (error.response) {
      const status = error.response.status;
      throw new ApiError(
        `WordPress API returned HTTP ${status}.`,
        "http",
        status,
        status >= 500 || status === 429
      );
    }

    if (error.request) {
      throw new ApiError("WordPress API network request failed.", "network", undefined, true);
    }

    throw new ApiError("WordPress API request failed.", "unknown", undefined, false);
  }
);
