import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

import { Text } from "@/src/shared/components";
import { shadows, theme } from "@/src/theme";

const { colors, spacing, typography, borderRadius } = theme;

export interface FeedbackCardProps {
  type: "strength" | "improvement";
  title: string;
  description: string;
}

/**
 * FeedbackCard
 * @description Card component to display feedback (strength or improvement) with icon and styled content
 */
export function FeedbackCard({ type, title, description }: FeedbackCardProps) {
  const isStrength = type === "strength";
  const mainColor = isStrength ? colors.primary : colors.status.warning;
  const bgColor = isStrength ? colors.primaryMuted : "rgba(245, 158, 11, 0.1)";
  const iconName = isStrength ? "check-circle" : "warning";
  const label = isStrength ? "Strength" : "Improvement";

  return (
    <View style={styles.card}>
      <View style={styles.glowContainer}>
        <Svg height="120" width="120" viewBox="0 0 100 100">
          <Defs>
            <RadialGradient
              id={`grad-${type}`}
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={mainColor} stopOpacity="0.15" />
              <Stop offset="1" stopColor={mainColor} stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="50" cy="50" r="50" fill={`url(#grad-${type})`} />
        </Svg>
      </View>

      <View style={styles.cardContent}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <MaterialIcons name={iconName} color={mainColor} size={28} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.cardLabel, { color: mainColor }]}>{label}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 0,
    overflow: "hidden",
    position: "relative",
    ...shadows.base,
  },
  glowContainer: {
    position: "absolute",
    top: -34,
    right: -34,
    width: 120,
    height: 120,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.base,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  cardDescription: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
