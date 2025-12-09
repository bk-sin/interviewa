/**
 * Mock Data for Development
 * @description Centralized mock data used by MockProvider
 */

import type { MaterialIcons } from "@expo/vector-icons";

import type {
  InterviewHistoryEntry,
  InterviewRole,
  ProgressMetric,
  QuickAction,
  UserStats,
} from "@/src/types";

// Component-compatible HistoryEntry type (matches components/home/history-list)
export interface HistoryEntryUI {
  readonly id: string;
  readonly icon: keyof typeof MaterialIcons.glyphMap;
  readonly title: string;
  readonly date: string;
  readonly score: string;
  readonly isPrimaryScore?: boolean;
}

export const MOCK_ROLES: InterviewRole[] = [
  { id: "frontend", name: "Frontend", icon: "code", color: "#3b82f6" },
  { id: "backend", name: "Backend", icon: "cloud", color: "#8b5cf6" },
  { id: "qa", name: "QA Tester", icon: "check-circle", color: "#10b981" },
  { id: "pm", name: "PM", icon: "work", color: "#f59e0b" },
  { id: "support", name: "Support", icon: "support-agent", color: "#ec4899" },
];

export const MOCK_QUICK_ACTIONS: QuickAction[] = [
  {
    id: "quick-training",
    icon: "bolt",
    title: "Entrenamiento Rápido",
    subtitle: "5 min",
    route: "/interview/quick",
  },
  {
    id: "behavioral",
    icon: "psychology",
    title: "Prueba Conductual",
    subtitle: "15 min",
    route: "/interview/behavioral",
  },
];

export const MOCK_STATS_METRICS: ProgressMetric[] = [
  { label: "Claridad", percent: 85, trend: "up" },
  { label: "Confianza", percent: 90, trend: "stable" },
  { label: "Estructura", percent: 75, trend: "up" },
  { label: "Storytelling", percent: 95, trend: "up" },
];

// Domain-level history (for data layer)
export const MOCK_HISTORY_ENTRIES_DOMAIN: InterviewHistoryEntry[] = [
  {
    id: "1",
    role: "Frontend Developer",
    date: "Hace 2 días",
    score: 92,
    questionsAnswered: 10,
    totalQuestions: 10,
    duration: 25,
  },
  {
    id: "2",
    role: "Backend Developer",
    date: "Hace 3 días",
    score: 85,
    questionsAnswered: 8,
    totalQuestions: 10,
    duration: 20,
  },
  {
    id: "3",
    role: "QA Tester",
    date: "Hace 5 días",
    score: 78,
    questionsAnswered: 10,
    totalQuestions: 10,
    duration: 30,
  },
  {
    id: "4",
    role: "Product Manager",
    date: "Hace 1 semana",
    score: 89,
    questionsAnswered: 9,
    totalQuestions: 10,
    duration: 22,
  },
];

// UI-compatible history (for components)
export const MOCK_HISTORY_ENTRIES: HistoryEntryUI[] = [
  {
    id: "1",
    icon: "code",
    title: "Frontend Developer",
    date: "Hace 2 días",
    score: "92%",
    isPrimaryScore: true,
  },
  {
    id: "2",
    icon: "cloud",
    title: "Backend Developer",
    date: "Hace 3 días",
    score: "85%",
  },
  {
    id: "3",
    icon: "check-circle",
    title: "QA Tester",
    date: "Hace 5 días",
    score: "78%",
  },
  {
    id: "4",
    icon: "work",
    title: "Product Manager",
    date: "Hace 1 semana",
    score: "89%",
  },
];

export const MOCK_USER_STATS: UserStats = {
  totalInterviews: 24,
  averageScore: "8.7/10",
  streakDays: 5,
  practiceMinutes: 750,
};

export const MOCK_LAST_INTERVIEW = {
  id: "current-1",
  role: "Frontend",
  question: "¿Qué es el DOM virtual?",
  progress: 65,
};
