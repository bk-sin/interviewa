import type {
  InterviewDifficulty,
  InterviewFeedback,
  InterviewHistoryEntry,
  InterviewRole,
  InterviewSession,
  ProgressMetric,
} from "@/src/features/interview";

import type { PaginatedResponse } from "@/src/types";

/**
 * Parameters required to create a new interview session
 */
export interface CreateSessionParams {
  /** Unique identifier for the user starting the session */
  readonly userId: string;
  /** Identifier of the interview role */
  readonly roleId: string;
  /** Optional difficulty level override */
  readonly difficulty?: InterviewDifficulty;
  /** Optional amount of questions to include in the session */
  readonly questionsCount?: number;
}

/**
 * Parameters used when submitting an answer for feedback
 */
export interface SubmitAnswerParams {
  /** Interview session identifier */
  readonly sessionId: string;
  /** Question identifier inside the session */
  readonly questionId: string;
  /** Raw answer text provided by the candidate */
  readonly answer: string;
  /** Time spent answering (seconds) for analytics */
  readonly elapsedSeconds?: number;
}

/**
 * Parameters to paginate interview history
 */
export interface GetHistoryParams {
  /** Target user identifier */
  readonly userId: string;
  /** Page number (1-indexed) */
  readonly page?: number;
  /** Amount of items per page */
  readonly pageSize?: number;
}

/**
 * Repository contract for interview-related data operations
 */
export interface InterviewRepository {
  /** Retrieve available interview roles */
  getRoles(): Promise<InterviewRole[]>;

  /** Create a new practice/interview session */
  createSession(params: CreateSessionParams): Promise<InterviewSession>;

  /** Fetch paginated interview history for a user */
  getHistory(
    params: GetHistoryParams,
  ): Promise<PaginatedResponse<InterviewHistoryEntry>>;

  /** Submit an answer and receive AI feedback */
  submitAnswer(params: SubmitAnswerParams): Promise<InterviewFeedback>;

  /** Retrieve aggregated progress metrics for a user */
  getProgressMetrics(userId: string): Promise<ProgressMetric[]>;
}
