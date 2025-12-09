/**
 * Onboarding Configuration
 * @description Content and features for onboarding screen
 */

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export interface Feature {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  description: string;
}

export const onboardingFeatures: Feature[] = [
  {
    id: "simulations",
    icon: "psychology",
    title: "Simulaciones Realistas",
    description:
      "Practica con entrevistas impulsadas por IA que se sienten como las reales.",
  },
  {
    id: "feedback",
    icon: "rate-review",
    title: "Feedback Instantáneo",
    description:
      "Recibe análisis detallados y consejos para mejorar tus respuestas.",
  },
  {
    id: "confidence",
    icon: "trending-up",
    title: "Aumenta tu Confianza",
    description:
      "Gana la seguridad que necesitas para destacar en cualquier entrevista.",
  },
];

export const onboardingContent = {
  title: "Tu Entrenador de Entrevistas con IA",
  ctaButton: "Comenzar",
  signInLink: "Ya tengo una cuenta",
  heroImage: {
    source: require("@/assets/images/hero.png"),
    alt: "Ilustración de una persona preparándose para una entrevista con asistencia de IA",
  },
};
