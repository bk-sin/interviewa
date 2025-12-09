/**
 * Interview Service
 * @description Business logic for interview operations
 */

import type {
  CreateSessionParams,
  InterviewRepository,
  SubmitAnswerParams,
} from "@/src/data/repositories";

import {
  InterviewFeedback,
  InterviewHistoryEntry,
  InterviewRole,
  InterviewSession,
  PaginatedResponse,
  ProgressMetric,
} from "@/src/types";

export class InterviewService {
  constructor(private repository: InterviewRepository) {}

  /**
   * Get available interview roles
   */
  async getRoles(): Promise<InterviewRole[]> {
    return this.repository.getRoles();
  }

  /**
   * Create new interview session
   */
  async createSession(params: CreateSessionParams): Promise<InterviewSession> {
    // Validate role exists
    const roles = await this.getRoles();
    const roleExists = roles.some((r) => r.id === params.roleId);

    if (!roleExists) {
      throw new Error(`Role not found: ${params.roleId}`);
    }

    return this.repository.createSession(params);
  }

  /**
   * Get interview history with pagination
   */
  async getHistory(
    userId: string,
    page = 1,
    pageSize = 10
  ): Promise<PaginatedResponse<InterviewHistoryEntry>> {
    return this.repository.getHistory({ userId, page, pageSize });
  }

  /**
   * Submit answer for feedback
   */
  async submitAnswer(params: SubmitAnswerParams): Promise<InterviewFeedback> {
    // Validate answer is not empty
    if (!params.answer.trim()) {
      throw new Error("Answer cannot be empty");
    }

    return this.repository.submitAnswer(params);
  }

  /**
   * Get progress metrics for user
   */
  async getProgressMetrics(userId: string): Promise<ProgressMetric[]> {
    return this.repository.getProgressMetrics(userId);
  }
}

/**
 * Create interview service instance
 */
export function createInterviewService(
  repository: InterviewRepository
): InterviewService {
  return new InterviewService(repository);
}
