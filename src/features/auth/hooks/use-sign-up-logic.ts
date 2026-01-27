import { useSignUp } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput as RNTextInput } from "react-native";
import { z } from "zod";
import { AUTH_MESSAGES, AUTH_STRATEGIES, AUTH_VALIDATION } from "../config";
import { AUTH_ROUTES } from "../routes";
import {
  getClerkErrorMessage,
  shouldRedirectToSignIn,
} from "../utils/clerk-errors";
import { useOAuthFlow } from "./use-oauth-flow";
import { useWarmUpBrowser } from "./use-warm-up-browser";

/**
 * Sign-up form validation schema
 */
const signUpSchema = z
  .object({
    emailAddress: z
      .string()
      .min(1, AUTH_MESSAGES.EMAIL_REQUIRED)
      .email(AUTH_MESSAGES.EMAIL_INVALID),
    password: z
      .string()
      .min(1, AUTH_MESSAGES.PASSWORD_REQUIRED)
      .min(
        AUTH_VALIDATION.PASSWORD_MIN_LENGTH,
        AUTH_MESSAGES.PASSWORD_MIN_LENGTH,
      ),
    confirmPassword: z.string().min(1, AUTH_MESSAGES.PASSWORD_CONFIRM_REQUIRED),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_MESSAGES.PASSWORD_MISMATCH,
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;

/**
 * Error state interface for user-friendly error display
 */
export interface SignUpError {
  message: string;
  suggestion?: string;
  linkText?: string;
  linkHref?: string;
}

/**
 * Return type for useSignUpLogic hook
 */
export interface UseSignUpLogicReturn {
  // Form
  form: ReturnType<typeof useForm<SignUpFormData>>;

  // State
  isLoading: boolean;
  error: SignUpError | null;
  isClerkLoaded: boolean;

  // OAuth
  googleOAuth: ReturnType<typeof useOAuthFlow>;
  appleOAuth: ReturnType<typeof useOAuthFlow>;
  isOAuthLoading: boolean;

  // Refs for focus management
  refs: {
    password: React.RefObject<RNTextInput | null>;
    confirmPassword: React.RefObject<RNTextInput | null>;
  };

  // Handlers
  handleSignUp: (data: SignUpFormData) => Promise<void>;
  handleEmailSubmit: () => void;
  handlePasswordSubmit: () => void;
  handleConfirmPasswordSubmit: () => void;
}

/**
 * Custom hook that encapsulates all sign-up screen logic
 * Follows MVVM pattern - separates business logic from UI
 *
 * @returns Object with form methods, state, refs, and handlers
 */
export function useSignUpLogic(): UseSignUpLogicReturn {
  // Warm up browser for OAuth (improves Android UX)
  useWarmUpBrowser();

  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  // OAuth hooks
  const googleOAuth = useOAuthFlow(AUTH_STRATEGIES.GOOGLE);
  const appleOAuth = useOAuthFlow(AUTH_STRATEGIES.APPLE);

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SignUpError | null>(null);

  // Refs for focus management
  const passwordRef = useRef<RNTextInput>(null);
  const confirmPasswordRef = useRef<RNTextInput>(null);

  // Form setup
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle sign-up form submission
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      if (!isLoaded || isLoading) return;

      setError(null);
      setIsLoading(true);

      try {
        await signUp.create({
          emailAddress: data.emailAddress,
          password: data.password,
        });

        // Send verification email
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        // Navigate to verify email screen
        router.push(AUTH_ROUTES.VERIFY_EMAIL);
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));

        // Get user-friendly error message
        const errorInfo = getClerkErrorMessage(err);
        setError(errorInfo);

        // Log if redirect suggestion applies
        if (shouldRedirectToSignIn(err)) {
          console.log("User should redirect to sign in");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoaded, isLoading, signUp, router],
  );

  // Focus flow handlers
  const handleEmailSubmit = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    confirmPasswordRef.current?.focus();
  }, []);

  const handleConfirmPasswordSubmit = useCallback(() => {
    form.handleSubmit(handleSignUp)();
  }, [form, handleSignUp]);

  return {
    form,
    isLoading,
    error,
    isClerkLoaded: isLoaded,
    googleOAuth,
    appleOAuth,
    isOAuthLoading: googleOAuth.isLoading || appleOAuth.isLoading,
    refs: {
      password: passwordRef,
      confirmPassword: confirmPasswordRef,
    },
    handleSignUp,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleConfirmPasswordSubmit,
  };
}
