/**
 * HistoryService
 * @description Business logic for interview history operations
 *
 * This service handles:
 * - History retrieval and filtering
 * - Statistics calculation
 * - Data formatting
 * - History management
 */

import {
  GetHistoryParams,
  HistoryEntry,
  HistoryFilterResult,
  HistoryStats,
} from "../types";

export class HistoryService {
  /**
   * Calculate average score from history entries
   */
  static calculateAverageScore(entries: HistoryEntry[]): number {
    if (entries.length === 0) return 0;

    const totalScore = entries.reduce((sum, entry) => sum + entry.score, 0);
    return Math.round(totalScore / entries.length);
  }

  /**
   * Calculate total practice time
   */
  static calculateTotalMinutes(entries: HistoryEntry[]): number {
    return entries.reduce((sum, entry) => sum + entry.duration, 0);
  }

  /**
   * Calculate total questions answered
   */
  static calculateTotalQuestions(entries: HistoryEntry[]): number {
    return entries.reduce((sum, entry) => sum + entry.questionsAnswered, 0);
  }

  /**
   * Find best score
   */
  static findBestScore(entries: HistoryEntry[]): number {
    if (entries.length === 0) return 0;
    return Math.max(...entries.map((e) => e.score));
  }

  /**
   * Calculate recent practice streak (consecutive days)
   */
  static calculateStreak(entries: HistoryEntry[]): number {
    if (entries.length === 0) return 0;

    // Sort by date descending
    const sorted = [...entries].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const entry of sorted) {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);

      const diffDays = Math.floor(
        (currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  }

  /**
   * Get top practiced topics
   */
  static getTopTopics(entries: HistoryEntry[], limit: number = 5): string[] {
    const topicCounts: Record<string, number> = {};

    entries.forEach((entry) => {
      entry.topics?.forEach((topic) => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });
    });

    return Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([topic]) => topic);
  }

  /**
   * Calculate complete statistics
   */
  static calculateStats(entries: HistoryEntry[]): HistoryStats {
    return {
      totalSessions: entries.length,
      averageScore: this.calculateAverageScore(entries),
      totalMinutes: this.calculateTotalMinutes(entries),
      totalQuestions: this.calculateTotalQuestions(entries),
      bestScore: this.findBestScore(entries),
      recentStreak: this.calculateStreak(entries),
      topTopics: this.getTopTopics(entries),
    };
  }

  /**
   * Filter history entries based on parameters
   */
  static filterHistory(
    entries: HistoryEntry[],
    params: GetHistoryParams
  ): HistoryFilterResult {
    let filtered = [...entries];

    // Filter by role
    if (params.role) {
      filtered = filtered.filter((e) =>
        e.role.toLowerCase().includes(params.role!.toLowerCase())
      );
    }

    // Filter by difficulty
    if (params.difficulty) {
      filtered = filtered.filter((e) => e.difficulty === params.difficulty);
    }

    // Filter by minimum score
    if (params.minScore !== undefined) {
      filtered = filtered.filter((e) => e.score >= params.minScore!);
    }

    // Filter by date range
    if (params.dateFrom) {
      filtered = filtered.filter((e) => e.date >= params.dateFrom!);
    }
    if (params.dateTo) {
      filtered = filtered.filter((e) => e.date <= params.dateTo!);
    }

    // Sort by date descending
    filtered.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Apply pagination
    const offset = params.offset || 0;
    const limit = params.limit || 10;
    const total = filtered.length;
    const paged = filtered.slice(offset, offset + limit);

    return {
      entries: paged,
      total,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Format duration to human-readable string
   */
  static formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes}min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
  }

  /**
   * Format date to relative time (e.g., "2 days ago")
   */
  static formatRelativeDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }
}

export default HistoryService;
