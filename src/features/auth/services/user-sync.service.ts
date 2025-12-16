/**
 * User Sync Service
 * @description Handles user synchronization between Clerk and backend
 */

import { api, setAuthToken } from "@/src/lib/api";
import { User } from "@/src/types";

/**
 * Additional user data to sync with backend
 */
export interface SyncUserData {
  name?: string | null;
  imageUrl?: string | null;
}

/**
 * Sync user data from Clerk to backend
 * @param clerkUserId - Clerk user ID
 * @param email - User email
 * @param token - Clerk JWT token
 * @param additionalData - Additional user data (name, imageUrl)
 */
export async function syncUser(
  clerkUserId: string,
  email: string,
  token: string,
  additionalData?: SyncUserData
): Promise<void> {
  const userData = {
    clerkUserId,
    email,
    name: additionalData?.name || null,
    imageUrl: additionalData?.imageUrl || null,
  };

  console.log("[UserSync] Starting sync with params:", {
    ...userData,
    hasToken: !!token,
    tokenPreview: token ? `${token.substring(0, 20)}...` : "null",
  });

  try {
    // Set the authorization token for this and subsequent requests
    setAuthToken(token);
    console.log("[UserSync] Token set in API client");

    // Sync user with backend
    console.log("[UserSync] Sending POST request to /users/sync...");
    const response = await api.post("/users/sync", userData);

    console.log(
      "[UserSync] User synced successfully! Response:",
      response.data
    );
  } catch (error: any) {
    console.error("[UserSync] Failed to sync user:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    throw error;
  }
}

/**
 * Get current user data from backend
 * @returns User data from backend
 */
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await api.get<User>("/users/me");

    if (__DEV__) {
      console.log("[UserSync] Current user:", response.data);
    }

    return response.data;
  } catch (error) {
    console.error("[UserSync] Failed to get current user:", error);
    throw error;
  }
}

/**
 * Clear authentication token
 * Call this when user logs out
 */
export function clearAuthToken(): void {
  setAuthToken(null);
}

export const UserSyncService = {
  syncUser,
  getCurrentUser,
  clearAuthToken,
};

export default UserSyncService;
