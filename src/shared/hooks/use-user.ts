/**
 * Wrapper for Clerk's useUser hook that handles auth bypass
 * This is safe because the hook is called inside the correct provider context
 */

import { useUser as useClerkUser } from "@clerk/clerk-expo";

import { SKIP_AUTH } from "@/src/config/auth-bypass.config";
import { useMockUser } from "@/src/config/mock-clerk-provider";

export function useUser() {
  // This looks conditional but it's safe because:
  // - When SKIP_AUTH = true, we're inside MockClerkProvider, so useMockUser works
  // - When SKIP_AUTH = false, we're inside ClerkProvider, so useClerkUser works
  // The Provider is chosen at the root level, not here
  
  if (SKIP_AUTH) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMockUser() as any;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useClerkUser();
}
