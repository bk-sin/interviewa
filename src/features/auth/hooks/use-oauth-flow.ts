import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useState } from "react";

// Ensure WebBrowser redirects are handled properly
WebBrowser.maybeCompleteAuthSession();

export type OAuthStrategy = "oauth_google" | "oauth_apple";

interface UseOAuthFlowReturn {
  isLoading: boolean;
  error: string | null;
  startOAuthFlow: () => Promise<void>;
}

/**
 * Hook for handling OAuth authentication flows with Clerk.
 * Supports Google and Apple OAuth strategies.
 *
 * @param strategy - The OAuth strategy to use ('oauth_google' | 'oauth_apple')
 * @returns Object with isLoading, error, and startOAuthFlow function
 */
export function useOAuthFlow(strategy: OAuthStrategy): UseOAuthFlowReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { startOAuthFlow: clerkStartOAuthFlow } = useOAuth({ strategy });

  const startOAuthFlow = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const { createdSessionId, setActive } = await clerkStartOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)", { scheme: "interviewa" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        // Reset navigation stack and go to home
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));

      // Handle user cancellation gracefully
      if (err?.message?.includes("cancel") || err?.code === "ERR_CANCELED") {
        // User cancelled, no error to show
        setError(null);
      } else {
        setError(
          err.errors?.[0]?.message ||
            "Error al iniciar sesión. Intenta de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [clerkStartOAuthFlow, isLoading, router]);

  return {
    isLoading,
    error,
    startOAuthFlow,
  };
}
