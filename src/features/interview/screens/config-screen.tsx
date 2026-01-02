import React from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@/src/theme";
import type { InterviewConfigData } from "@/src/types";
import { ConfigForm } from "../components/config-form";
import { useInterviewConfigLogic } from "../hooks/use-interview-config-logic";

interface ConfigScreenProps {
  readonly onNext?: (data: InterviewConfigData) => void;
  readonly initialData?: Partial<InterviewConfigData>;
}

/**
 * InterviewConfigScreen
 * @description Pantalla de configuración de entrevista con opciones de rol, dificultad y áreas de enfoque
 */
export default function ConfigScreen({
  onNext = (data) => console.log("Config saved:", data),
  initialData,
}: ConfigScreenProps) {
  const {
    config,
    handleDifficultyChange,
    handleCountChange,
    handleFocusAreaToggle,
    handleRoleChange,
    handleSubmit,
  } = useInterviewConfigLogic({ onNext, initialData });

  return (
    <View style={styles.container}>
      <ConfigForm
        config={config}
        onDifficultyChange={handleDifficultyChange}
        onCountChange={handleCountChange}
        onFocusAreaToggle={handleFocusAreaToggle}
        onRoleChange={handleRoleChange}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
});
