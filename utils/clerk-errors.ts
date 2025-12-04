/**
 * Clerk Error Messages Mapping
 *
 * Maps Clerk error codes to user-friendly Spanish messages.
 * https://clerk.com/docs/custom-flows/error-handling
 */

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

interface ErrorMapping {
  message: string;
  suggestion?: string;
  linkText?: string;
  linkHref?: string;
}

/**
 * Mapping of Clerk error codes to Spanish user-friendly messages
 */
const errorCodeMap: Record<string, ErrorMapping> = {
  // Form validation errors
  form_param_nil: {
    message: "Por favor completa todos los campos requeridos.",
  },
  form_identifier_not_found: {
    message: "No encontramos una cuenta con este correo.",
    suggestion: "¿Quieres crear una cuenta?",
    linkText: "Regístrate",
    linkHref: "/(auth)/sign-up",
  },
  form_password_incorrect: {
    message: "La contraseña es incorrecta.",
    suggestion: "¿Olvidaste tu contraseña?",
    linkText: "Recuperar contraseña",
    linkHref: "/(auth)/forgot-password",
  },
  form_identifier_exists: {
    message: "Este correo ya está registrado.",
    suggestion: "¿Ya tienes una cuenta?",
    linkText: "Inicia sesión",
    linkHref: "/(auth)/sign-in",
  },

  // Password related errors
  form_password_pwned: {
    message:
      "Esta contraseña ha sido comprometida en una filtración de datos. Por favor usa una contraseña diferente.",
  },
  form_password_length_too_short: {
    message: "La contraseña debe tener al menos 8 caracteres.",
  },
  form_password_no_uppercase: {
    message: "La contraseña debe incluir al menos una letra mayúscula.",
  },
  form_password_no_lowercase: {
    message: "La contraseña debe incluir al menos una letra minúscula.",
  },
  form_password_no_number: {
    message: "La contraseña debe incluir al menos un número.",
  },
  form_password_size_in_bytes_exceeded: {
    message: "La contraseña es demasiado larga.",
  },

  // Email verification errors
  form_code_incorrect: {
    message: "El código de verificación es incorrecto.",
  },
  verification_expired: {
    message: "El código de verificación ha expirado. Te enviaremos uno nuevo.",
  },
  verification_failed: {
    message: "No pudimos verificar tu correo. Intenta de nuevo.",
  },

  // Rate limiting
  too_many_requests: {
    message: "Demasiados intentos. Por favor espera un momento.",
  },

  // Session errors
  session_exists: {
    message: "Ya tienes una sesión activa.",
  },

  // OAuth errors
  external_account_exists: {
    message: "Esta cuenta de Google/Apple ya está vinculada a otro usuario.",
  },
  external_account_not_found: {
    message: "No encontramos una cuenta vinculada. Intenta con otro método.",
  },

  // Generic errors
  not_allowed_access: {
    message: "No tienes permiso para realizar esta acción.",
  },
  api_response_error: {
    message: "Ocurrió un error. Por favor intenta de nuevo.",
  },
};

/**
 * Get a user-friendly error message from a Clerk error
 *
 * @param error - The Clerk error object or any error
 * @returns Object with message, optional suggestion, and optional link info
 */
export function getClerkErrorMessage(error: any): ErrorMapping {
  // Default error message
  const defaultError: ErrorMapping = {
    message: "Ocurrió un error inesperado. Por favor intenta de nuevo.",
  };

  if (!error) return defaultError;

  // Handle Clerk error response format
  if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    const firstError = error.errors[0] as ClerkError;
    const code = firstError.code;

    // Check if we have a mapped error
    if (code && errorCodeMap[code]) {
      return errorCodeMap[code];
    }

    // If not mapped, return the original message (might be in English)
    // but at least it's from Clerk and somewhat useful
    return {
      message:
        firstError.longMessage || firstError.message || defaultError.message,
    };
  }

  // Handle single error code
  if (error.code && errorCodeMap[error.code]) {
    return errorCodeMap[error.code];
  }

  // Handle generic error with message
  if (error.message) {
    return { message: error.message };
  }

  return defaultError;
}

/**
 * Check if an error suggests the user should sign in instead
 */
export function shouldRedirectToSignIn(error: any): boolean {
  if (!error?.errors) return false;

  return error.errors.some(
    (e: ClerkError) =>
      e.code === "form_identifier_exists" ||
      e.code === "external_account_exists"
  );
}

/**
 * Check if an error suggests the user should sign up instead
 */
export function shouldRedirectToSignUp(error: any): boolean {
  if (!error?.errors) return false;

  return error.errors.some(
    (e: ClerkError) =>
      e.code === "form_identifier_not_found" ||
      e.code === "external_account_not_found"
  );
}
