export interface HistoryEntry {
  id: string;
  role: string;
  company?: string;
  date: Date;
  score: number;
  duration: number; // in minutes
  questionsAnswered: number;
  totalQuestions: number;
  topics?: string[];
  difficulty: "easy" | "medium" | "hard";
}

export interface HistoryStats {
  totalSessions: number;
  averageScore: number;
  totalMinutes: number;
  totalQuestions: number;
  bestScore: number;
  recentStreak: number;
  topTopics: string[];
}

export interface GetHistoryParams {
  limit?: number;
  offset?: number;
  role?: string;
  difficulty?: "easy" | "medium" | "hard";
  minScore?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface HistoryFilterResult {
  entries: HistoryEntry[];
  total: number;
  hasMore: boolean;
}
