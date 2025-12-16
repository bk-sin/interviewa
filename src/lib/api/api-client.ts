/**
 * API Client Configuration
 * @description Axios instance with authentication interceptors
 */

import axios, { AxiosError, AxiosInstance } from "axios";

// Base URL for the backend API
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

console.log("[API Client] Configured with base URL:", API_URL);

/**
 * Create axios instance with default configuration
 */
export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Set the authentication token for all requests
 * @param token - JWT token from Clerk
 */
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

/**
 * Request interceptor - logs outgoing requests in dev mode
 */
api.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error("[API] Request error:", error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handles common errors
 */
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[API] Response from ${response.config.url}:`, response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) {
      console.error("[API] Response error:", {
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }

    // Handle common HTTP errors
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          console.error("[API] Unauthorized - Token may be invalid or expired");
          break;
        case 403:
          console.error("[API] Forbidden - Insufficient permissions");
          break;
        case 404:
          console.error("[API] Not Found");
          break;
        case 500:
          console.error("[API] Internal Server Error");
          break;
      }
    } else if (error.request) {
      console.error(
        "[API] No response received from server - Check if backend is running"
      );
      console.error("[API] Attempted URL:", error.config?.baseURL);
    } else {
      console.error("[API] Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
