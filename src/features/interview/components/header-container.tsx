/**
 * InterviewHeaderContainer - Smart Component
 *
 * @description
 * Componente "smart" que conecta el Header presentacional con TanStack Query.
 * Maneja la lógica de negocio y estado, delegando solo renderizado al Header.
 */

import { useInterviewHeader } from "@/src/features/interview/hooks";
import React from "react";
import { Header } from "./header";

/**
 * Props del Container
 */
interface InterviewHeaderContainerProps {
  /** Callback al presionar botón back */
  readonly onBack?: () => void;
  /** Callback al presionar botón end (opcional) */
  readonly onEnd?: () => void;
}

/**
 * InterviewHeaderContainer
 *
 * @description
 * Container component que:
 * 1. Lee datos de TanStack Query
 * 2. Pasa datos al componente presentacional Header
 * 3. No renderiza UI directamente
 *
 * @example
 * ```tsx
 * <InterviewHeaderContainer
 *   onBack={() => router.back()}
 *   onEnd={() => handleEndInterview()}
 * />
 * ```
 */
export const InterviewHeaderContainer: React.FC<
  InterviewHeaderContainerProps
> = ({ onBack, onEnd }) => {
  // Leer datos de TanStack Query via hook
  const { title, currentQuestion, totalQuestions, showProgress } =
    useInterviewHeader();

  // Delegar renderizado al componente presentacional
  return (
    <Header
      title={title}
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      showProgress={showProgress}
      onBack={onBack}
      onEnd={onEnd}
    />
  );
};

// Display name para debugging
InterviewHeaderContainer.displayName = "InterviewHeaderContainer";
