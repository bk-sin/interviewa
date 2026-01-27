/**
 * Wrapper for Clerk's useUser hook that handles auth bypass
 * When SKIP_AUTH is true, returns mock user data
 */

import { useUser as useClerkUser } from "@clerk/clerk-expo";

import { MOCK_USER, SKIP_AUTH } from "@/src/config/auth-bypass.config";

export function useUser() {
  const clerkUser = useClerkUser();

  if (SKIP_AUTH) {
    return {
      ...clerkUser,
      isLoaded: true,
      user: {
        id: "mock-user-id",
        firstName: MOCK_USER.firstName,
        lastName: MOCK_USER.lastName,
        fullName: MOCK_USER.firstName,
        imageUrl: MOCK_USER.imageUrl,
        primaryEmailAddress: {
          emailAddress: MOCK_USER.email,
        },
      } as any,
    };
  }

  return clerkUser;
}
