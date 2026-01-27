import { MaterialIcons } from "@expo/vector-icons";

// Role Selection Types
export type RoleCategory = "suggested" | "others";

export interface RoleOption {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  readonly category: RoleCategory;
}

// Interview Configuration Types
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type QuestionCount = 5 | 7 | 10 | "custom";

export interface InterviewConfigData {
  readonly role: string;
  readonly difficulty: DifficultyLevel;
  readonly questionCount: QuestionCount;
  readonly focusAreas: {
    technical: boolean;
    situational: boolean;
    cultural: boolean;
  };
}

export interface DifficultyOption {
  readonly id: DifficultyLevel;
  readonly label: string;
  readonly icon: keyof typeof MaterialIcons.glyphMap;
}

export interface QuestionCountOption {
  readonly value: QuestionCount;
  readonly label: string;
  readonly description: string;
}

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

// Final Report Types
export interface PerformanceMetric {
  readonly label: string;
  readonly score: number; // 0 a 10
  readonly color?: string; // Opcional, para overrides
}

export interface QuestionResult {
  readonly id: string;
  readonly question: string;
  readonly score: number;
  readonly tags: string[];
}

export interface InterviewReportData {
  readonly totalScore: number;
  readonly insight: string;
  readonly metrics: PerformanceMetric[];
  readonly strengths: string[];
  readonly opportunities: string[];
  readonly questions: QuestionResult[];
}

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

// Estados de la entrevista según backend
export type InterviewState =
  | "INTRO"
  | "QUESTION"
  | "RECORDING"
  | "PROCESSING"
  | "MICRO_FEEDBACK"
  | "CHECKPOINT"
  | "FOLLOW_UP"
  | "FINAL"
  | "PAUSED"
  | "ERROR";

// Categorías de preguntas
export type QuestionCategory =
  | "TECHNICAL"
  | "BEHAVIORAL"
  | "PROBLEM_SOLVING"
  | "COMMUNICATION"
  | "LEADERSHIP";

export interface InterviewQuestion {
  readonly id: string;
  readonly text: string;
  readonly category: QuestionCategory;
  readonly difficulty: InterviewDifficulty;
  readonly expectedSignals?: string[];
  readonly hints?: string[];
  readonly estimatedDuration: number; // in seconds
}

// Payload de la sesión activa (desde backend)
export interface InterviewSessionPayload {
  readonly question?: InterviewQuestion;
  readonly feedback?: InterviewFeedback;
  readonly checkpoint?: CheckpointData;
  readonly totalQuestions: number;
  readonly currentQuestionIndex?: number;
}

// Checkpoint data
export interface CheckpointData {
  readonly summary: string;
  readonly strengths: string[];
  readonly improvements: string[];
  readonly nextSteps: string[];
}

// Respuesta completa del backend
export interface InterviewSessionResponse {
  readonly interviewId: string;
  readonly state: InterviewState;
  readonly screen: string; // "QuestionScreen" | "FeedbackScreen" | "CheckpointScreen" | "FinalScreen"
  readonly payload: InterviewSessionPayload;
}
