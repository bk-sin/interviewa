/**
 * Wrapper for Clerk's useAuth hook that handles auth bypass
 * When SKIP_AUTH is true, returns mock authenticated state
 */

import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

import { SKIP_AUTH } from "@/src/config/auth-bypass.config";

export function useAuth() {
  const clerkAuth = useClerkAuth();

  // When bypassing auth, always return signed in and loaded
  if (SKIP_AUTH) {
    return {
      ...clerkAuth,
      isSignedIn: true,
      isLoaded: true,
      signOut: async () => {
        console.log("[useAuth] Sign out bypassed in MVP mode");
      },
    };
  }

  return clerkAuth;
}
