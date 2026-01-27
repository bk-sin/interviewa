/**
 * Interview Navigation Helpers
 * @description Navigation functions specific to interview feature
 *
 * Usage:
 * ```tsx
 * import { useInterviewNavigation } from '@/src/features/interview';
 *
 * const { startQuickInterview, cancelInterview } = useInterviewNavigation();
 * startQuickInterview();
 * ```
 */

import { Router, useRouter } from "expo-router";

import { TAB_ROUTES } from "@/src/lib/navigation";

import { INTERVIEW_ROUTES } from "../routes";

/**
 * Hook for interview navigation
 */
export function useInterviewNavigation() {
  const router = useRouter();

  return {
    /**
     * Inicia una nueva entrevista (quick start desde home)
     */
    startQuickInterview: () => {
      router.push(INTERVIEW_ROUTES.START);
    },

    /**
     * Resume una entrevista en curso
     */
    resumeInterview: (sessionId: string) => {
      // TODO: Pasar sessionId como param cuando esté implementado
      router.push(INTERVIEW_ROUTES.SESSION);
    },

    /**
     * Navega a configuración de entrevista
     */
    goToConfig: () => {
      router.push(INTERVIEW_ROUTES.CONFIG);
    },

    /**
     * Navega a selección de rol
     */
    goToRoleSelection: () => {
      router.push(INTERVIEW_ROUTES.CONFIG_ROLE);
    },

    /**
     * Inicia la sesión de entrevista
     */
    startSession: () => {
      router.push(INTERVIEW_ROUTES.SESSION);
    },

    /**
     * Navega a pantalla de procesamiento
     */
    goToProcessing: () => {
      router.push(INTERVIEW_ROUTES.PROCESSING);
    },

    /**
     * Navega a micro-feedback
     */
    goToMicroFeedback: () => {
      router.push(INTERVIEW_ROUTES.MICRO_FEEDBACK);
    },

    /**
     * Navega a checkpoint
     */
    goToCheckpoint: () => {
      router.push(INTERVIEW_ROUTES.CHECKPOINT);
    },

    /**
     * Navega a pregunta de follow-up
     */
    goToFollowUp: () => {
      router.push(INTERVIEW_ROUTES.FOLLOW_UP);
    },

    /**
     * Navega a reporte final
     */
    goToFinalReport: () => {
      router.push(INTERVIEW_ROUTES.FINAL_REPORT);
    },

    /**
     * Cancela la entrevista y vuelve a home
     */
    cancelInterview: () => {
      router.replace(TAB_ROUTES.ROOT);
    },

    /**
     * Completa la entrevista y vuelve a home
     */
    completeInterview: () => {
      router.replace(TAB_ROUTES.ROOT);
    },

    /**
     * Go back with safety check
     */
    goBack: () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace(TAB_ROUTES.ROOT);
      }
    },
  };
}

/**
 * Direct navigation functions (for use outside components)
 */
export const InterviewNavigation = {
  startQuickInterview: (router: Router) => {
    router.push(INTERVIEW_ROUTES.START);
  },

  resumeInterview: (router: Router, sessionId: string) => {
    router.push(INTERVIEW_ROUTES.SESSION);
  },

  goToConfig: (router: Router) => {
    router.push(INTERVIEW_ROUTES.CONFIG);
  },

  goToRoleSelection: (router: Router) => {
    router.push(INTERVIEW_ROUTES.CONFIG_ROLE);
  },

  startSession: (router: Router) => {
    router.push(INTERVIEW_ROUTES.SESSION);
  },

  goToProcessing: (router: Router) => {
    router.push(INTERVIEW_ROUTES.PROCESSING);
  },

  goToMicroFeedback: (router: Router) => {
    router.push(INTERVIEW_ROUTES.MICRO_FEEDBACK);
  },

  goToCheckpoint: (router: Router) => {
    router.push(INTERVIEW_ROUTES.CHECKPOINT);
  },

  goToFollowUp: (router: Router) => {
    router.push(INTERVIEW_ROUTES.FOLLOW_UP);
  },

  goToFinalReport: (router: Router) => {
    router.push(INTERVIEW_ROUTES.FINAL_REPORT);
  },

  cancelInterview: (router: Router) => {
    router.replace(TAB_ROUTES.ROOT);
  },

  completeInterview: (router: Router) => {
    router.replace(TAB_ROUTES.ROOT);
  },
};
