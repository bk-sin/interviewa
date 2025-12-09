/**
 * User Domain Types
 */

export interface User {
  readonly id: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly imageUrl?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface UserStats {
  readonly totalInterviews: number;
  readonly averageScore: string;
  readonly streakDays: number;
  readonly practiceMinutes: number;
}

export interface UserPreferences {
  readonly preferredLanguage: string;
  readonly notificationsEnabled: boolean;
  readonly darkModeEnabled: boolean;
}
