import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

export const useCheckpointLogic = () => {
  const router = useRouter();

  // Animación del progreso (0 a 0.65)
  const progressValue = useSharedValue(0);

  useEffect(() => {
    // Retraso ligero para que la animación empiece al ver la pantalla
    setTimeout(() => {
      progressValue.value = withTiming(0.65, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContinue = () => {
    // router.push("/interview/next-question");
    console.log("Continuar entrevista...");
  };

  const handleQuit = () => {
    router.back();
  };

  return {
    handleContinue,
    handleQuit,
    progressValue,
    stats: {
      percentage: 65,
      trend: "+15% desde el inicio",
      clarityScore: "8.5/10",
      topPercent: "Top 15%",
      aiFeedback: {
        prefix: "Tu narrativa sobre",
        highlight: "resolución de conflictos",
        suffix: "ha mejorado significativamente desde la última sección.",
      },
    },
  };
};
