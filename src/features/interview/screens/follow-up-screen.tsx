import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RecordButton, ThemedText, ThemedView } from "@/src/shared/components";
import { colors, rgba, spacing } from "@/src/theme";
import { Header, QuestionCard } from "../components";
import { useFollowUpLogic } from "../hooks";

/**
 * FollowUpScreen
 * @description Pantalla de pregunta de seguimiento durante la entrevista
 */
export default function FollowUpScreen() {
  const insets = useSafeAreaInsets();
  const {
    handleBack,
    handleEndInterview,
    handleToggleRecording,
    progress,
    questionData,
    isRecording,
  } = useFollowUpLogic();

  return (
    <ThemedView style={styles.container}>
      {/* Header con progreso */}
      <Header
        title="ENTREVISTA SIMULADA"
        currentQuestion={progress.current}
        totalQuestions={progress.total}
        showProgress={true}
        onBack={handleBack}
        onEnd={handleEndInterview}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Main Card */}
        <QuestionCard
          context={questionData.context}
          question={questionData.text}
          hint={questionData.hint}
        />

        {/* Botón de grabación */}
        <View style={styles.recordContainer}>
          <RecordButton
            onPress={handleToggleRecording}
            isRecording={isRecording}
            size={112}
          />

          <ThemedText style={styles.tapText}>
            {isRecording
              ? "Grabando tu respuesta..."
              : "Toca el micrófono para responder"}
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  recordContainer: {
    alignItems: "center",
    marginTop: spacing.xl * 2,
    gap: spacing.lg,
  },
  tapText: {
    color: rgba(colors.text.primary, 0.7),
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
