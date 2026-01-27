/**
 * Wrapper for Clerk's useAuth hook that handles auth bypass
 * This is safe because the hook is called inside the correct provider context
 */

import { useAuth as useClerkAuth } from "@clerk/clerk-expo";

import { SKIP_AUTH } from "@/src/config/auth-bypass.config";
import { useMockAuth } from "@/src/config/mock-clerk-provider";

export function useAuth() {
  // This looks conditional but it's safe because:
  // - When SKIP_AUTH = true, we're inside MockClerkProvider, so useMockAuth works
  // - When SKIP_AUTH = false, we're inside ClerkProvider, so useClerkAuth works
  // The Provider is chosen at the root level, not here
  
  if (SKIP_AUTH) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMockAuth() as any;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClerkAuth();
}
