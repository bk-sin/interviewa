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
