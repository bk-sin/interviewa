/**
 * Generic Navigation Helpers
 * @description Reusable navigation utilities for any feature
 */

import { Router, useRouter } from "expo-router";

import { TAB_ROUTES } from "@/src/lib/navigation";

/**
 * Hook for generic navigation helpers
 */
export function useNavigation() {
  const router = useRouter();

  return {
    /**
     * Go back with safety check - fallback to home if no history
     */
    goBack: () => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace(TAB_ROUTES.ROOT);
      }
    },

    /**
     * Navigate to home tab
     */
    goToHome: () => {
      router.push(TAB_ROUTES.ROOT);
    },

    /**
     * Navigate to practices tab
     */
    goToPractices: () => {
      router.push(TAB_ROUTES.PRACTICES);
    },

    /**
     * Navigate to history tab
     */
    goToHistory: () => {
      router.push(TAB_ROUTES.HISTORY);
    },

    /**
     * Navigate to profile tab
     */
    goToProfile: () => {
      router.push(TAB_ROUTES.PROFILE);
    },
  };
}

/**
 * Direct navigation functions (for use outside components)
 */
export const NavigationHelpers = {
  goBack: (router: Router) => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(TAB_ROUTES.ROOT);
    }
  },

  goToHome: (router: Router) => {
    router.push(TAB_ROUTES.ROOT);
  },

  goToPractices: (router: Router) => {
    router.push(TAB_ROUTES.PRACTICES);
  },

  goToHistory: (router: Router) => {
    router.push(TAB_ROUTES.HISTORY);
  },

  goToProfile: (router: Router) => {
    router.push(TAB_ROUTES.PROFILE);
  },
};
