/**
 * AuthService
 * @description Business logic for authentication operations
 *
 * This service handles:
 * - Sign in/sign up validation
 * - OAuth flow coordination
 * - 2FA verification
 * - Session management
 */

import {
  ClerkError,
  ClerkErrorResponse,
  SignInParams,
  SignUpParams,
} from "../types";
import { getClerkErrorMessage } from "../utils/clerk-errors";

export class AuthService {
  /**
   * Validate email format
   */
  static validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email) {
      return { valid: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: "Invalid email format" };
    }

    return { valid: true };
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): {
    valid: boolean;
    error?: string;
  } {
    if (!password) {
      return { valid: false, error: "Password is required" };
    }

    if (password.length < 8) {
      return { valid: false, error: "Password must be at least 8 characters" };
    }

    // Check for at least one number
    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: "Password must contain at least one number",
      };
    }

    return { valid: true };
  }

  /**
   * Validate sign in parameters
   */
  static validateSignIn(params: SignInParams): {
    valid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    const emailValidation = this.validateEmail(params.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error!;
    }

    if (!params.password) {
      errors.password = "Password is required";
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate sign up parameters
   */
  static validateSignUp(params: SignUpParams): {
    valid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    const emailValidation = this.validateEmail(params.email);
    if (!emailValidation.valid) {
      errors.email = emailValidation.error!;
    }

    const passwordValidation = this.validatePassword(params.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.error!;
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Parse Clerk API errors into user-friendly messages
   */
  static parseError(error: unknown): string {
    const errorMapping = getClerkErrorMessage(error);
    return errorMapping.message;
  }

  /**
   * Check if error requires 2FA
   */
  static requires2FA(error: unknown): boolean {
    if (error && typeof error === "object" && "errors" in error) {
      const clerkError = error as ClerkErrorResponse;

      return (
        clerkError.errors?.some(
          (err: ClerkError) =>
            err.code === "form_identifier_exists" ||
            err.message?.includes("two-factor")
        ) ?? false
      );
    }
    return false;
  }

  /**
   * Check if error requires email verification
   */
  static requiresEmailVerification(error: unknown): boolean {
    if (error && typeof error === "object" && "errors" in error) {
      const clerkError = error as ClerkErrorResponse;

      return (
        clerkError.errors?.some(
          (err: ClerkError) =>
            err.code === "form_password_pwned" ||
            err.message?.includes("verification")
        ) ?? false
      );
    }
    return false;
  }
}

export default AuthService;
