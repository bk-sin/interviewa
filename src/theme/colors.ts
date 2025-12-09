/**
 * Color System
 * All colors used throughout the app
 */

export const colors = {
  // Primary Colors
  primary: "#13eca4",
  primaryLight: "#5ff4c4",
  primaryDark: "#0d9f7a",
  primaryMuted: "rgba(19, 236, 164, 0.2)",

  // Background Colors
  background: {
    light: "#ffffff",
    dark: "#10221c",
    card: "#1a2f28",
    input: "#f6f8f7",
  },

  // Text Colors
  text: {
    primary: "#ffffff",
    secondary: "#92c9b7",
    dark: "#10221c",
    muted: "#6b7280",
    error: "#ef4444",
    success: "#10b981",
  },

  // UI Colors
  border: {
    light: "#e5e7eb",
    dark: "#374151",
    focus: "#13eca4",
  },

  // Status Colors
  status: {
    error: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    info: "#3b82f6",
  },

  // Gradients
  gradients: {
    primary: ["#13eca4", "#0d9f7a", "#0a7d5f"] as const,
    dark: ["#10221c", "#1a2f28"] as const,
  },
} as const;
