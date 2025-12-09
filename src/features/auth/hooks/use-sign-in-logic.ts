import { AUTH_ROUTES } from "@/src/config";
import { useSignIn } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { z } from "zod";
import {
  getClerkErrorMessage,
  shouldRedirectToSignUp,
} from "../utils/clerk-errors";

import { useOAuthFlow } from "./use-oauth-flow";
import { useWarmUpBrowser } from "./use-warm-up-browser";

// ============================================================================
// VALIDATION SCHEMA
// ============================================================================

const signInSchema = z.object({
  emailAddress: z
    .string()
    .min(1, "Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// ============================================================================
// ERROR STATE TYPE
// ============================================================================

interface ErrorState {
  message: string;
  suggestion?: string;
  linkText?: string;
  linkHref?: string;
}

// ============================================================================
// HOOK RETURN TYPE
// ============================================================================

interface UseSignInLogicReturn {
  /** React Hook Form methods */
  form: ReturnType<typeof useForm<SignInFormData>>;
  /** Loading state for email/password sign-in */
  isLoading: boolean;
  /** Error state with message and optional suggestion */
  error: ErrorState | null;
  /** Google OAuth flow */
  googleOAuth: ReturnType<typeof useOAuthFlow>;
  /** Apple OAuth flow */
  appleOAuth: ReturnType<typeof useOAuthFlow>;
  /** Combined OAuth loading state */
  isOAuthLoading: boolean;
  /** Refs for focus management */
  refs: {
    password: React.RefObject<TextInput | null>;
  };
  /** Handle sign-in form submission */
  handleSignIn: (data: SignInFormData) => Promise<void>;
  /** Focus handlers */
  handleEmailSubmit: () => void;
  handlePasswordSubmit: () => void;
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * useSignInLogic - Custom hook that encapsulates all sign-in logic
 *
 * Responsibilities:
 * - Form state management (react-hook-form + zod)
 * - OAuth flows (Google, Apple)
 * - Clerk sign-in process
 * - Error handling with user-friendly messages
 * - Focus management between inputs
 *
 * Architecture: MVVM pattern - separates business logic from view
 */
export function useSignInLogic(): UseSignInLogicReturn {
  // Warm up browser for OAuth (improves Android UX)
  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  // OAuth hooks
  const googleOAuth = useOAuthFlow("oauth_google");
  const appleOAuth = useOAuthFlow("oauth_apple");

  // Local state
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<ErrorState | null>(null);

  // Refs for focus management
  const passwordRef = React.useRef<TextInput | null>(null);

  // Form setup
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  // Combined OAuth loading state
  const isOAuthLoading = googleOAuth.isLoading || appleOAuth.isLoading;

  /**
   * Handle sign-in form submission
   */
  const handleSignIn = async (data: SignInFormData) => {
    if (!isLoaded || isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      // Start sign-in process with identifier
      const signInAttempt = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      });

      console.log("Sign-in status:", signInAttempt.status);

      // Check if sign-in is complete
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace(AUTH_ROUTES.HOME);
        return;
      }

      // If needs first factor (password verification)
      if (signInAttempt.status === "needs_first_factor") {
        const firstFactorResult = await signIn.attemptFirstFactor({
          strategy: "password",
          password: data.password,
        });

        if (firstFactorResult.status === "complete") {
          await setActive({ session: firstFactorResult.createdSessionId });
          router.replace(AUTH_ROUTES.HOME);
          return;
        }

        // Check if now needs second factor
        if (firstFactorResult.status === "needs_second_factor") {
          // TODO: Navigate to 2FA verification screen
          // For now, prepare email code and redirect
          await signIn.prepareSecondFactor({
            strategy: "email_code",
          });
          router.push("/(auth)/verify-2fa" as any);
          return;
        }
      }

      // If needs second factor after password was already verified
      if (signInAttempt.status === "needs_second_factor") {
        // Prepare and send 2FA code
        await signIn.prepareSecondFactor({
          strategy: "email_code",
        });
        router.push("/(auth)/verify-2fa" as any);
        return;
      }

      // If we get here, there's an unexpected status
      console.log("Unexpected sign-in status:", signInAttempt.status);
      setError({
        message: "Error al iniciar sesión. Inténtalo de nuevo.",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));

      // Get user-friendly error message
      const errorInfo = getClerkErrorMessage(err);
      setError(errorInfo);

      // Check if user should be redirected to sign up
      if (shouldRedirectToSignUp(err)) {
        // Error state will show the suggestion with link
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Focus handlers for keyboard flow
   */
  const handleEmailSubmit = () => {
    passwordRef.current?.focus();
  };

  const handlePasswordSubmit = () => {
    form.handleSubmit(handleSignIn)();
  };

  return {
    form,
    isLoading,
    error,
    googleOAuth,
    appleOAuth,
    isOAuthLoading,
    refs: {
      password: passwordRef,
    },
    handleSignIn,
    handleEmailSubmit,
    handlePasswordSubmit,
  };
}
