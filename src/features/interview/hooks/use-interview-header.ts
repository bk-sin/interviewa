/**
 * Hook para obtener datos del header desde TanStack Query
 */

import { useActiveSession } from "@/src/queries";
import { useMemo } from "react";

interface InterviewHeaderData {
  title: string;
  currentQuestion: number;
  totalQuestions: number;
  showProgress: boolean;
  interviewId: string | null;
  state: string | null;
}

export function useInterviewHeader(): InterviewHeaderData {
  const { data: activeSession } = useActiveSession();

  return useMemo(() => {
    if (!activeSession) {
      return {
        title: "Interview Session",
        currentQuestion: 0,
        totalQuestions: 0,
        showProgress: false,
        interviewId: null,
        state: null,
      };
    }

    const { payload, state, interviewId } = activeSession;
    const currentIndex = payload.currentQuestionIndex ?? 1;

    // Determinar el título según el estado
    let title = "Interview Session";
    switch (state) {
      case "INTRO":
        title = "Getting Started";
        break;
      case "QUESTION":
        title = "Interview Session";
        break;
      case "RECORDING":
        title = "Recording...";
        break;
      case "PROCESSING":
        title = "Processing...";
        break;
      case "MICRO_FEEDBACK":
        title = "Feedback";
        break;
      case "CHECKPOINT":
        title = "Checkpoint";
        break;
      case "FOLLOW_UP":
        title = "Follow-up";
        break;
      case "FINAL":
        title = "Results";
        break;
      case "PAUSED":
        title = "Paused";
        break;
      default:
        title = "Interview Session";
    }

    return {
      title,
      currentQuestion: currentIndex,
      totalQuestions: payload.totalQuestions,
      showProgress: state === "QUESTION" || state === "RECORDING" || state === "MICRO_FEEDBACK",
      interviewId,
      state,
    };
  }, [activeSession]);
}
