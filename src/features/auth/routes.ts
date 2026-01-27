/**
 * Auth Routes
 * @description Route constants for auth feature
 */

export const AUTH_ROUTES = {
  SIGN_IN: "/(auth)/sign-in" as const,
  SIGN_UP: "/(auth)/sign-up" as const,
  VERIFY_EMAIL: "/(auth)/verify-email" as const,
  VERIFY_2FA: "/(auth)/verify-2fa" as const,
  FORGOT_PASSWORD: "/(auth)/forgot-password" as const,
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];
