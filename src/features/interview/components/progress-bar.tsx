import { fonts, fontSizes, theme } from "@/src/theme";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

const { colors, spacing } = theme;

/**
 * Props para ProgressBar (Sub-componente atómico)
 */
interface ProgressBarProps {
  /** Número de pregunta actual */
  readonly currentQuestion: number;
  /** Total de preguntas */
  readonly totalQuestions: number;
}

/**
 * ProgressBar - Componente atómico para mostrar progreso
 *
 * @description
 * Sub-componente puro que solo maneja la lógica de la barra de progreso.
 * Separado del Header para seguir Single Responsibility Principle.
 */
export const ProgressBar = React.memo<ProgressBarProps>(
  ({ currentQuestion, totalQuestions }) => {
    // Memoizar array de segmentos de progreso
    const progressSegments = useMemo(() => {
      return Array.from({ length: totalQuestions }, (_, index) => ({
        index,
        isActive: index < currentQuestion,
      }));
    }, [totalQuestions, currentQuestion]);

    // Calcular porcentaje para accesibilidad
    const progressPercentage = useMemo(() => {
      if (totalQuestions === 0) return 0;
      return Math.round((currentQuestion / totalQuestions) * 100);
    }, [currentQuestion, totalQuestions]);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.label}>PROGRESS</Text>
          <Text style={styles.count}>
            {currentQuestion}/{totalQuestions}
          </Text>
        </View>

        <View
          testID="progress-bar"
          style={styles.bar}
          accessible={true}
          accessibilityRole="progressbar"
          accessibilityLabel={`Interview progress: ${progressPercentage}% complete`}
          accessibilityValue={{
            min: 0,
            max: totalQuestions,
            now: currentQuestion,
            text: `${currentQuestion} of ${totalQuestions} questions completed`,
          }}
          importantForAccessibility="yes"
        >
          {progressSegments.map((segment) => (
            <View
              key={segment.index}
              style={[styles.segment, segment.isActive && styles.segmentActive]}
              importantForAccessibility="no-hide-descendants"
            />
          ))}
        </View>
      </View>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.medium,
    color: colors.text.secondary,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  count: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  bar: {
    flexDirection: "row",
    width: "100%",
    gap: 6,
    height: 6,
  },
  segment: {
    flex: 1,
    borderRadius: 3,
    backgroundColor: colors.background.card,
  },
  segmentActive: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});
