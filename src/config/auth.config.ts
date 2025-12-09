/**
 * Authentication Constants
 * @description Centralized definitions for auth-related strings and configuration
 */

/**
 * OAuth strategy identifiers used by Clerk
 */
export const AUTH_STRATEGIES = {
  GOOGLE: "oauth_google",
  APPLE: "oauth_apple",
} as const;

export type OAuthStrategy =
  (typeof AUTH_STRATEGIES)[keyof typeof AUTH_STRATEGIES];

/**
 * Authentication-related route paths
 */
export const AUTH_ROUTES = {
  SIGN_IN: "/(auth)/sign-in",
  SIGN_UP: "/(auth)/sign-up",
  VERIFY_EMAIL: "/(auth)/verify-email",
  VERIFY_2FA: "/(auth)/verify-2fa",
  FORGOT_PASSWORD: "/(auth)/forgot-password",
  ONBOARDING: "/onboarding",
  HOME: "/(tabs)",
} as const;

export type AuthRoute = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES];

/**
 * Validation constraints
 */
export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  CODE_LENGTH: 6,
} as const;

/**
 * Validation messages in Spanish
 */
export const AUTH_MESSAGES = {
  // Email
  EMAIL_REQUIRED: "Ingresa tu correo electrónico",
  EMAIL_INVALID: "Ingresa un correo electrónico válido",

  // Password
  PASSWORD_REQUIRED: "Ingresa tu contraseña",
  PASSWORD_MIN_LENGTH: `La contraseña debe tener al menos ${AUTH_VALIDATION.PASSWORD_MIN_LENGTH} caracteres`,
  PASSWORD_CONFIRM_REQUIRED: "Confirma tu contraseña",
  PASSWORD_MISMATCH: "Las contraseñas no coinciden",

  // Verification
  CODE_REQUIRED: "Ingresa el código de verificación",
  CODE_INVALID: "El código debe tener 6 dígitos",

  // Generic
  LOADING_SIGN_UP: "Creando cuenta...",
  LOADING_SIGN_IN: "Iniciando sesión...",
  LOADING_VERIFY: "Verificando...",
  LOADING_OAUTH: "Conectando...",

  // Buttons
  SIGN_UP: "Registrarse",
  SIGN_IN: "Iniciar sesión",
  VERIFY: "Verificar",
  CONTINUE_GOOGLE: "Continuar con Google",
  CONTINUE_APPLE: "Continuar con Apple",
} as const;
