import { theme } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ProgressBar } from "./progress-bar";

const { colors, spacing, typography } = theme;

/**
 * Props para el Header (Componente Presentacional Puro)
 */
interface HeaderProps {
  /** Título del header */
  readonly title?: string;
  /** Número de pregunta actual */
  readonly currentQuestion?: number;
  /** Total de preguntas */
  readonly totalQuestions?: number;
  /** Si mostrar la barra de progreso */
  readonly showProgress?: boolean;
  /** Callback al presionar botón back */
  readonly onBack?: () => void;
  /** Callback al presionar botón end (opcional) */
  readonly onEnd?: () => void;
}

/**
 * Valores por defecto para props opcionales
 */
const DEFAULT_PROPS = {
  title: "Interview",
  currentQuestion: 0,
  totalQuestions: 0,
  showProgress: false,
} as const;

/**
 * Header - Componente presentacional puro con responsabilidad única
 *
 * @description
 * Componente "dumb" que solo recibe props y renderiza.
 * No sabe nada de Redux, contexto, o lógica de negocio.
 * Delegó la barra de progreso a ProgressBar (atomización).
 *
 * @example
 * ```tsx
 * <Header
 *   title="Interview Session"
 *   currentQuestion={3}
 *   totalQuestions={10}
 *   showProgress={true}
 *   onBack={() => router.back()}
 *   onEnd={() => handleEnd()}
 * />
 * ```
 */
export const Header = React.memo<HeaderProps>(
  ({
    title = DEFAULT_PROPS.title,
    currentQuestion = DEFAULT_PROPS.currentQuestion,
    totalQuestions = DEFAULT_PROPS.totalQuestions,
    showProgress = DEFAULT_PROPS.showProgress,
    onBack,
    onEnd,
  }) => {
    const insets = useSafeAreaInsets();

    // Memoizar padding top para evitar recalcular en cada render
    const headerPaddingTop = useMemo(
      () => Math.max(insets.top, spacing.base),
      [insets.top]
    );

    return (
      <View style={styles.container}>
        {/* Header Bar */}
        <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
          {onBack ? (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              hitSlop={styles.hitSlop}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Returns to previous screen"
            >
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={colors.text.primary}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.headerSpacer} />
          )}

          <Text
            style={styles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
            accessible={true}
            accessibilityRole="header"
          >
            {title}
          </Text>

          {onEnd ? (
            <TouchableOpacity
              onPress={onEnd}
              style={styles.endButton}
              hitSlop={styles.hitSlop}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="End interview"
              accessibilityHint="Finishes current interview session"
            >
              <Text style={styles.endButtonText}>End</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.headerSpacer} />
          )}
        </View>

        {/* Progress Bar - Componente atómico separado */}
        {showProgress && totalQuestions > 0 && (
          <ProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
          />
        )}
      </View>
    );
  }
);

// Display name para debugging
Header.displayName = "Header";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.xs,
    minHeight: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  backIcon: {
    opacity: 0.8,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  headerTitle: {
    ...typography.bodySemi,
    color: colors.text.primary,
    letterSpacing: -0.3,
    flex: 1,
    textAlign: "center",
    marginHorizontal: spacing.xs,
  },
  endButton: {
    height: 40,
    paddingHorizontal: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
  },
  endButtonText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  headerSpacer: {
    width: 40,
  },
});
