/**
 * Interview Routes
 * @description Route constants for interview feature
 */

export const INTERVIEW_ROUTES = {
  // Entry points
  START: "/interview-start" as const, // Quick start from home

  // Configuration flow
  CONFIG: "/interview/config" as const,
  CONFIG_ROLE: "/interview/config-role" as const,

  // Active interview session
  SESSION: "/interview/session" as const,
  PROCESSING: "/interview/processing" as const,
  MICRO_FEEDBACK: "/interview/micro-feedback" as const,
  CHECKPOINT: "/interview/checkpoint" as const,
  FOLLOW_UP: "/interview/follow-up" as const,

  // Results
  FINAL_REPORT: "/interview/final-report" as const,
  // TODO: Add detailed report when screen is created
  // DETAILED_REPORT: "/interview/detailed-report" as const,
} as const;

export type InterviewRoute =
  (typeof INTERVIEW_ROUTES)[keyof typeof INTERVIEW_ROUTES];
