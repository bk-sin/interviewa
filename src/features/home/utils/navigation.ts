/**
 * Home Navigation Helpers
 * @description Navigation functions specific to home feature
 *
 * Usage:
 * ```tsx
 * import { useHomeNavigation } from '@/src/features/home';
 *
 * const { startInterview, goToProfile } = useHomeNavigation();
 * startInterview();
 * ```
 */

import { useRouter } from "expo-router";

import { INTERVIEW_ROUTES } from "@/src/features/interview/routes";
import { TAB_ROUTES } from "@/src/lib/navigation";

/**
 * Hook for home navigation
 */
export function useHomeNavigation() {
  const router = useRouter();

  return {
    /**
     * Inicia una nueva entrevista desde el botón principal
     */
    startInterview: () => {
      router.push(INTERVIEW_ROUTES.START);
    },

    /**
     * Resume una entrevista en progreso
     */
    continueSession: () => {
      router.push(INTERVIEW_ROUTES.SESSION);
    },

    /**
     * Navega a la configuración de entrevista
     */
    goToInterviewConfig: () => {
      router.push(INTERVIEW_ROUTES.CONFIG);
    },

    /**
     * Navega al perfil del usuario
     */
    goToProfile: () => {
      router.push(TAB_ROUTES.PROFILE);
    },

    /**
     * Navega al historial de entrevistas
     */
    goToHistory: () => {
      router.push(TAB_ROUTES.HISTORY);
    },

    /**
     * Vuelve atrás en la navegación
     */
    goBack: () => {
      if (router.canGoBack()) {
        router.back();
      }
    },
  };
}
