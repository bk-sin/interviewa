/**
 * Custom hook to sync user with backend once after login
 * Simpler approach: just sync once when home loads
 */

import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";
import { syncUser } from "../services";

/**
 * Hook that syncs user with backend once when the home screen loads
 * Uses Clerk's user data that's already available
 */
export function useUserSync() {
  const { getToken, isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only sync if:
    // 1. User is signed in
    // 2. User data is loaded
    // 3. We haven't synced yet in this session
    // 4. We have user data
    if (!isSignedIn || !isLoaded || hasSynced.current || !user?.id) {
      return;
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      console.warn("[useUserSync] No email available, skipping sync");
      return;
    }

    const performSync = async () => {
      try {
        // Extract user data from Clerk
        const fullName = user.fullName || null;
        const imageUrl = user.imageUrl || null;

        console.log("[useUserSync] Syncing user on home load:", {
          userId: user.id,
          email,
          name: fullName,
          imageUrl,
          apiUrl: process.env.EXPO_PUBLIC_API_URL,
        });

        const token = await getToken();

        if (!token) {
          console.warn("[useUserSync] No token available, skipping sync");
          return;
        }

        await syncUser(user.id, email, token, {
          name: fullName,
          imageUrl,
        });

        console.log("[useUserSync] User synced successfully");
        hasSynced.current = true;
      } catch (error: any) {
        console.error("[useUserSync] Sync failed:", {
          message: error.message,
          code: error.code,
          apiUrl: process.env.EXPO_PUBLIC_API_URL,
          isNetworkError: error.message?.includes("Network Error"),
          hint: "If running on Android emulator, make sure backend is running and use 10.0.2.2 instead of localhost",
        });
        // Don't throw - we want the app to continue even if sync fails
      }
    };

    performSync();
  }, [isSignedIn, isLoaded, user, getToken]);

  return { hasSynced: hasSynced.current };
}
