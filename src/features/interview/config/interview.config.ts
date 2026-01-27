import type { DifficultyOption, QuestionCountOption } from "../types";

/**
 * Opciones de dificultad disponibles para la configuración de entrevista
 */
export const DIFFICULTY_OPTIONS: readonly DifficultyOption[] = [
  {
    id: "beginner",
    label: "Principiante",
    icon: "school",
  },
  {
    id: "intermediate",
    label: "Intermedio",
    icon: "trending-up",
  },
  {
    id: "advanced",
    label: "Avanzado",
    icon: "emoji-events",
  },
] as const;

/**
 * Opciones de cantidad de preguntas disponibles
 */
export const QUESTION_COUNT_OPTIONS: readonly QuestionCountOption[] = [
  {
    value: 5,
    label: "RÁPIDO",
    description: "5 preguntas",
  },
  {
    value: 7,
    label: "ESTÁNDAR",
    description: "7 preguntas",
  },
  {
    value: 10,
    label: "PROFUNDO",
    description: "10 preguntas",
  },
  {
    value: "custom",
    label: "CUSTOM",
    description: "Personalizado",
  },
] as const;

/**
 * Áreas de enfoque disponibles
 */
export const FOCUS_AREAS = {
  technical: {
    id: "technical" as const,
    label: "Técnicas",
    subtitle: "Coding, System Design, APIs",
    icon: "code" as const,
  },
  situational: {
    id: "situational" as const,
    label: "Situacionales",
    subtitle: "Resolución de problemas, casos reales",
    icon: "psychology" as const,
  },
  cultural: {
    id: "cultural" as const,
    label: "Culturales",
    subtitle: "Valores, trabajo en equipo, adaptación",
    icon: "people" as const,
  },
} as const;

/**
 * Configuración por defecto de entrevista
 */
export const DEFAULT_INTERVIEW_CONFIG = {
  role: "Frontend Developer",
  difficulty: "intermediate" as const,
  questionCount: 7 as const,
  focusAreas: {
    technical: true,
    situational: true,
    cultural: false,
  },
} as const;
