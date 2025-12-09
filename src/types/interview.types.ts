import { MaterialIcons } from "@expo/vector-icons";

export interface InterviewFeedback {
  readonly id: string;
  readonly sessionId: string;
  readonly questionId: string;
  readonly answer: string;
  readonly rating: FeedbackRating;
  readonly strengths: string[];
  readonly improvements: string[];
  readonly suggestedResources?: string[];
}

export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export interface InterviewHistoryEntry {
  readonly id: string;
  readonly role: string;
  readonly date: string;
  readonly score: number;
  readonly questionsAnswered: number;
  readonly totalQuestions: number;
  readonly duration: number; // in minutes
}

export interface InterviewSession {
  readonly id: string;
  readonly roleId: string;
  readonly roleName: string;
  readonly status: InterviewStatus;
  readonly startedAt: Date;
  readonly completedAt?: Date;
  readonly score?: number;
  readonly questions: InterviewQuestion[];
  readonly currentQuestionIndex: number;
}

export interface InterviewRole {
  readonly id: string;
  readonly name: string;
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  readonly color: string;
  readonly description?: string;
  readonly questionCount?: number;
}

export interface ProgressMetric {
  readonly label: string;
  readonly percent: number;
  readonly trend?: "up" | "down" | "stable";
}

export type InterviewStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";
export type InterviewDifficulty = "easy" | "medium" | "hard";

export interface InterviewQuestion {
  readonly id: string;
  readonly text: string;
  readonly category: string;
  readonly difficulty: InterviewDifficulty;
  readonly hints?: string[];
  readonly expectedDuration: number; // in seconds
}
