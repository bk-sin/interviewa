import { DEFAULT_INTERVIEW_CONFIG } from "@/src/config";
import type {
  DifficultyLevel,
  InterviewConfigData,
  QuestionCount,
} from "@/src/types";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useCallback, useState } from "react";

interface UseInterviewConfigLogicProps {
  readonly onNext: (data: InterviewConfigData) => void;
  readonly initialData?: Partial<InterviewConfigData>;
}

/**
 * useInterviewConfigLogic
 * @description Hook que maneja la lógica de configuración de entrevista con feedback háptico
 */
export function useInterviewConfigLogic({
  onNext,
  initialData,
}: UseInterviewConfigLogicProps) {
  // Estado local para la configuración
  const [config, setConfig] = useState<InterviewConfigData>({
    ...DEFAULT_INTERVIEW_CONFIG,
    ...initialData,
  });

  // Handler para cambiar dificultad con feedback háptico suave
  const handleDifficultyChange = useCallback((level: DifficultyLevel) => {
    Haptics.selectionAsync();
    setConfig((prev) => ({ ...prev, difficulty: level }));
  }, []);

  // Handler para cambiar cantidad de preguntas
  const handleCountChange = useCallback((count: QuestionCount) => {
    Haptics.selectionAsync();
    setConfig((prev) => ({ ...prev, questionCount: count }));
  }, []);

  // Handler para toggle de áreas de enfoque con feedback más pronunciado
  const handleFocusAreaToggle = useCallback(
    (area: keyof InterviewConfigData["focusAreas"]) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setConfig((prev) => ({
        ...prev,
        focusAreas: {
          ...prev.focusAreas,
          [area]: !prev.focusAreas[area],
        },
      }));
    },
    []
  );

  // Handler para cambiar rol (placeholder)
  const handleRoleChange = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Navegar a selector de rol o abrir modal
    router.push("/interview/config-role");
  }, []);

  // Handler para validar y enviar configuración
  const handleSubmit = useCallback(() => {
    // Validar que al menos 1 área esté seleccionada
    const hasAtLeastOneArea = Object.values(config.focusAreas).some(
      (value) => value
    );

    if (!hasAtLeastOneArea) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // TODO: Mostrar error/toast
      console.warn("Debe seleccionar al menos un área de enfoque");
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onNext(config);
  }, [config, onNext]);

  return {
    config,
    handleDifficultyChange,
    handleCountChange,
    handleFocusAreaToggle,
    handleRoleChange,
    handleSubmit,
  };
}
