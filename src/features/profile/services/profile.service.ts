/**
 * ProfileService
 * @description Business logic for user profile operations
 *
 * This service handles:
 * - Profile data validation
 * - Profile updates
 * - Avatar management
 * - Settings management
 */

export interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ProfileData {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  imageUrl?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileResult {
  success: boolean;
  error?: string;
  data?: ProfileData;
}

export class ProfileService {
  /**
   * Validate first name
   */
  static validateFirstName(firstName: string): {
    valid: boolean;
    error?: string;
  } {
    if (!firstName) {
      return { valid: false, error: "First name is required" };
    }

    if (firstName.length < 2) {
      return {
        valid: false,
        error: "First name must be at least 2 characters",
      };
    }

    if (firstName.length > 50) {
      return {
        valid: false,
        error: "First name must be less than 50 characters",
      };
    }

    return { valid: true };
  }

  /**
   * Validate last name
   */
  static validateLastName(lastName: string): {
    valid: boolean;
    error?: string;
  } {
    if (!lastName) {
      return { valid: false, error: "Last name is required" };
    }

    if (lastName.length < 2) {
      return { valid: false, error: "Last name must be at least 2 characters" };
    }

    if (lastName.length > 50) {
      return {
        valid: false,
        error: "Last name must be less than 50 characters",
      };
    }

    return { valid: true };
  }

  /**
   * Validate phone number
   */
  static validatePhoneNumber(phone: string): {
    valid: boolean;
    error?: string;
  } {
    if (!phone) {
      return { valid: true }; // Phone is optional
    }

    // Basic phone validation (adjust regex for your needs)
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    if (!phoneRegex.test(phone)) {
      return { valid: false, error: "Invalid phone number format" };
    }

    return { valid: true };
  }

  /**
   * Validate profile update parameters
   */
  static validateProfileUpdate(params: UpdateProfileParams): {
    valid: boolean;
    errors: Record<string, string>;
  } {
    const errors: Record<string, string> = {};

    if (params.firstName !== undefined) {
      const validation = this.validateFirstName(params.firstName);
      if (!validation.valid) {
        errors.firstName = validation.error!;
      }
    }

    if (params.lastName !== undefined) {
      const validation = this.validateLastName(params.lastName);
      if (!validation.valid) {
        errors.lastName = validation.error!;
      }
    }

    if (params.phoneNumber !== undefined) {
      const validation = this.validatePhoneNumber(params.phoneNumber);
      if (!validation.valid) {
        errors.phoneNumber = validation.error!;
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Format full name from first and last name
   */
  static formatFullName(firstName?: string, lastName?: string): string {
    if (!firstName && !lastName) return "";
    if (!firstName) return lastName!;
    if (!lastName) return firstName;
    return `${firstName} ${lastName}`;
  }

  /**
   * Get initials from name
   */
  static getInitials(firstName?: string, lastName?: string): string {
    if (!firstName && !lastName) return "?";

    const firstInitial = firstName?.charAt(0).toUpperCase() || "";
    const lastInitial = lastName?.charAt(0).toUpperCase() || "";

    return firstInitial + lastInitial || "?";
  }
}

export default ProfileService;
