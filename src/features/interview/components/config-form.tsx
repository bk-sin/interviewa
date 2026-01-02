import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import {
  DIFFICULTY_OPTIONS,
  FOCUS_AREAS,
  QUESTION_COUNT_OPTIONS,
} from "@/src/config";
import { ThemedText } from "@/src/shared/components";
import { colors, rgba, spacing, typography } from "@/src/theme";
import type {
  DifficultyLevel,
  InterviewConfigData,
  QuestionCount,
} from "@/src/types";

interface InterviewConfigFormProps {
  readonly config: InterviewConfigData;
  readonly onDifficultyChange: (level: DifficultyLevel) => void;
  readonly onCountChange: (count: QuestionCount) => void;
  readonly onFocusAreaToggle: (
    area: keyof InterviewConfigData["focusAreas"]
  ) => void;
  readonly onRoleChange: () => void;
  readonly onSubmit: () => void;
}

/**
 * InterviewConfigForm
 * @description Formulario presentacional para configuración de entrevista
 */
export const ConfigForm = React.memo<InterviewConfigFormProps>(
  ({
    config,
    onDifficultyChange,
    onCountChange,
    onFocusAreaToggle,
    onRoleChange,
    onSubmit,
  }) => {
    // Helper para renderizar el check icon en las tarjetas seleccionadas
    const renderCheckIcon = () => (
      <View style={styles.checkIconContainer}>
        <MaterialIcons name="check-circle" size={14} color={colors.primary} />
      </View>
    );

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SECCIÓN: ROL */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Rol / Puesto</ThemedText>
            <TouchableOpacity onPress={onRoleChange} activeOpacity={0.7}>
              <ThemedText style={styles.changeLink}>Cambiar</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.roleIconContainer}>
              <MaterialIcons name="code" size={24} color={colors.primary} />
            </View>
            <View style={styles.roleInfo}>
              <ThemedText style={styles.roleTitle}>{config.role}</ThemedText>
              <ThemedText style={styles.roleSubtitle}>
                React, TypeScript focus
              </ThemedText>
            </View>
            <MaterialIcons
              name="check-circle"
              size={20}
              color={colors.primary}
            />
          </View>
        </View>

        {/* SECCIÓN: DIFICULTAD */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Nivel de Dificultad
          </ThemedText>
          <View style={styles.grid3}>
            {DIFFICULTY_OPTIONS.map((option) => {
              const isSelected = config.difficulty === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => onDifficultyChange(option.id)}
                  activeOpacity={0.7}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                >
                  {isSelected && renderCheckIcon()}
                  <MaterialIcons
                    name={option.icon}
                    size={24}
                    color={
                      isSelected
                        ? colors.primary
                        : rgba(colors.text.primary, 0.3)
                    }
                  />
                  <ThemedText
                    style={[
                      styles.optionLabel,
                      isSelected && styles.textSelected,
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* SECCIÓN: CANTIDAD DE PREGUNTAS */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Cantidad de Preguntas
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {QUESTION_COUNT_OPTIONS.map((option) => {
              const isSelected = config.questionCount === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => onCountChange(option.value)}
                  activeOpacity={0.7}
                  style={[
                    styles.countCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                >
                  {option.value === "custom" ? (
                    <MaterialIcons
                      name="tune"
                      size={24}
                      color={
                        isSelected
                          ? colors.primary
                          : rgba(colors.text.primary, 0.3)
                      }
                    />
                  ) : (
                    <ThemedText
                      style={[
                        styles.countNumber,
                        isSelected && styles.textSelected,
                      ]}
                    >
                      {option.value}
                    </ThemedText>
                  )}
                  <ThemedText style={styles.countLabel}>
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* SECCIÓN: ÁREAS DE ENFOQUE */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Áreas de Enfoque</ThemedText>

          {Object.entries(FOCUS_AREAS).map(([key, area]) => {
            const areaKey = key as keyof InterviewConfigData["focusAreas"];
            const isActive = config.focusAreas[areaKey];

            return (
              <TouchableOpacity
                key={area.id}
                style={[styles.focusCard, isActive && styles.focusCardActive]}
                onPress={() => onFocusAreaToggle(areaKey)}
                activeOpacity={0.7}
              >
                <View style={styles.focusHeader}>
                  <View style={styles.focusIconCircle}>
                    <MaterialIcons
                      name={area.icon}
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.focusTextContainer}>
                    <ThemedText style={styles.focusTitle}>
                      {area.label}
                    </ThemedText>
                    <ThemedText style={styles.focusSubtitle}>
                      {area.subtitle}
                    </ThemedText>
                  </View>
                </View>
                <View
                  style={[styles.checkbox, isActive && styles.checkboxActive]}
                >
                  {isActive && (
                    <MaterialIcons
                      name="check"
                      size={14}
                      color={colors.background.dark}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footerSpacer} />

        {/* BOTÓN DE ACCIÓN */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.submitButtonText}>
            Guardar y Continuar
          </ThemedText>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={colors.background.dark}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
);

ConfigForm.displayName = "InterviewConfigForm";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  contentContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  section: {
    marginBottom: spacing.xl * 1.5,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: rgba(colors.text.primary, 0.9),
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  changeLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  // Card Styles
  card: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },
  optionCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
    flex: 1,
    minHeight: 100,
    position: "relative",
  } as ViewStyle,
  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: rgba(colors.primary, 0.1),
  },

  // Grid Layout
  grid3: {
    flexDirection: "row",
    gap: spacing.md,
  },

  // Horizontal Scroll
  horizontalScrollContent: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  countCard: {
    width: 85,
    height: 85,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },

  // Typography & Icons
  roleIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: rgba(colors.primary, 0.1),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
  },
  roleInfo: {
    flex: 1,
  },
  roleTitle: {
    color: colors.text.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  roleSubtitle: {
    color: rgba(colors.text.primary, 0.5),
    fontSize: 12,
    marginTop: spacing.xs,
  },
  optionLabel: {
    color: colors.text.primary,
    fontSize: 13,
    fontWeight: "600",
    marginTop: spacing.sm,
    textAlign: "center",
  },
  textSelected: {
    color: colors.primary,
  },
  countNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  countLabel: {
    fontSize: 10,
    color: rgba(colors.text.primary, 0.5),
    marginTop: spacing.xs,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  checkIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 1,
  },

  // Focus Areas
  focusCard: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },
  focusCardActive: {
    backgroundColor: rgba(colors.text.primary, 0.05),
  },
  focusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  focusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: rgba(colors.primary, 0.15),
    alignItems: "center",
    justifyContent: "center",
  },
  focusTextContainer: {
    flex: 1,
  },
  focusTitle: {
    color: colors.text.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  focusSubtitle: {
    color: rgba(colors.text.primary, 0.5),
    fontSize: 12,
    marginTop: spacing.xs,
  },

  // Checkbox Custom
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.2),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  // Footer
  footerSpacer: {
    height: spacing.xl * 2,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  submitButtonText: {
    color: colors.background.dark,
    fontSize: 16,
    fontWeight: "700",
  },
});
