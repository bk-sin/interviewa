export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface OAuthParams {
  provider: "google" | "apple" | "github";
}

export interface SignInResult {
  success: boolean;
  requires2FA?: boolean;
  requiresEmailVerification?: boolean;
  error?: string;
}

export interface SignUpResult {
  success: boolean;
  requiresEmailVerification?: boolean;
  error?: string;
}

export interface ClerkError {
  code: string;
  message: string;
  longMessage?: string;
  meta?: {
    paramName?: string;
  };
}

export interface ClerkErrorResponse {
  clerkError: boolean;
  code?: string;
  status?: number;
  errors?: ClerkError[];
}

export interface ErrorMapping {
  message: string;
  suggestion?: string;
  linkText?: string;
  linkHref?: string;
}

// User types
export type { User, UserPreferences, UserStats } from "./user.types";
