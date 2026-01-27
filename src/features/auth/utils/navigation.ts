/**
 * Auth Navigation Helpers
 * @description Navigation functions specific to auth feature
 */

import { Router, useRouter } from "expo-router";

import { TAB_ROUTES } from "@/src/lib/navigation";

import { AUTH_ROUTES } from "../routes";

/**
 * Hook for auth navigation
 */
export function useAuthNavigation() {
  const router = useRouter();

  return {
    goToSignIn: () => {
      router.push(AUTH_ROUTES.SIGN_IN);
    },

    goToSignUp: () => {
      router.push(AUTH_ROUTES.SIGN_UP);
    },

    goToVerifyEmail: () => {
      router.push(AUTH_ROUTES.VERIFY_EMAIL);
    },

    goToVerify2FA: () => {
      router.push(AUTH_ROUTES.VERIFY_2FA);
    },

    /**
     * Después de login exitoso, va a home
     */
    onLoginSuccess: () => {
      router.replace(TAB_ROUTES.ROOT);
    },

    /**
     * Después de logout, va a sign in
     */
    onLogout: () => {
      router.replace(AUTH_ROUTES.SIGN_IN);
    },
  };
}

/**
 * Direct navigation functions (for use outside components)
 */
export const AuthNavigation = {
  goToSignIn: (router: Router) => {
    router.push(AUTH_ROUTES.SIGN_IN);
  },

  goToSignUp: (router: Router) => {
    router.push(AUTH_ROUTES.SIGN_UP);
  },

  goToVerifyEmail: (router: Router) => {
    router.push(AUTH_ROUTES.VERIFY_EMAIL);
  },

  goToVerify2FA: (router: Router) => {
    router.push(AUTH_ROUTES.VERIFY_2FA);
  },

  onLoginSuccess: (router: Router) => {
    router.replace(TAB_ROUTES.ROOT);
  },

  onLogout: (router: Router) => {
    router.replace(AUTH_ROUTES.SIGN_IN);
  },
};
