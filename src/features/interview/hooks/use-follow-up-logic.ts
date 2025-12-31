import { useRouter } from "expo-router";
import { useState } from "react";

export const useFollowUpLogic = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

  const handleBack = () => router.back();

  const handleEndInterview = () => {
    // Lógica para terminar entrevista
    console.log("Finalizando entrevista...");
    router.replace("/(tabs)");
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    console.log(isRecording ? "Deteniendo..." : "Grabando...");
  };

  return {
    handleBack,
    handleEndInterview,
    handleToggleRecording,
    isRecording,
    // Mock Data
    progress: { current: 3, total: 5 },
    questionData: {
      type: "Pregunta de Seguimiento",
      context:
        "Basándome en tu respuesta anterior sobre estrategias de resolución de conflictos...",
      text: "¿Puedes profundizar en cómo manejaste el conflicto presupuestario en ese escenario específico?",
      hint: "Tómate tu tiempo para pensar. La IA está escuchando ejemplos específicos.",
    },
  };
};
