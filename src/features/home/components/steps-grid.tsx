import { ThemedText } from "@/src/shared/components";
import { colors, spacing } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StepItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  text: string;
}

const StepItem = ({ icon, text }: StepItemProps) => (
  <View style={styles.gridItem}>
    <View style={styles.gridIconContainer}>
      <MaterialIcons name={icon} size={24} color={colors.primary} />
    </View>
    <ThemedText type="default" style={styles.gridText}>
      {text}
    </ThemedText>
  </View>
);

export const StepsGrid = () => {
  return (
    <View style={styles.gridContainer}>
      <StepItem icon="headphones" text={`Listen to${"\n"}a question`} />
      <StepItem icon="mic" text={`Answer${"\n"}out loud`} />
      <StepItem icon="auto-awesome" text={`Get${"\n"}feedback`} />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.dark,
    paddingVertical: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  gridItem: {
    alignItems: "center",
    flex: 1,
    gap: spacing.sm,
  },
  gridIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.background.accent,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  gridText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.primary,
    textAlign: "center",
    lineHeight: 14,
  },
});
