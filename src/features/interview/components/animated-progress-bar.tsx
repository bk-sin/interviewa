import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { ThemedText } from "@/src/shared/components";
import { colors, rgba, spacing } from "@/src/theme";

interface AnimatedProgressBarProps {
  readonly label: string;
  readonly score: number;
  readonly color?: string;
  readonly delay?: number;
}

/**
 * AnimatedProgressBar
 * @description Barra de progreso animada que se llena suavemente
 */
export const AnimatedProgressBar = React.memo<AnimatedProgressBarProps>(
  ({ label, score, color, delay = 0 }) => {
    const widthAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(widthAnim, {
        toValue: score * 10, // Convertir puntaje (0-10) a porcentaje (0-100)
        duration: 1000,
        delay: delay,
        useNativeDriver: false, // width no soporta native driver
      }).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score, delay]);

    const widthInterpolated = widthAnim.interpolate({
      inputRange: [0, 100],
      outputRange: ["0%", "100%"],
    });

    // Determinar color basado en score si no se pasa explícitamente
    const getBarColor = () => {
      if (color) return color;
      if (score >= 8) return colors.primary;
      if (score >= 6) return "#FACC15"; // Amarillo
      return "#FB923C"; // Naranja
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <ThemedText style={styles.score}>{score.toFixed(1)}</ThemedText>
        </View>
        <View style={styles.track}>
          <Animated.View
            style={[
              styles.fill,
              { width: widthInterpolated, backgroundColor: getBarColor() },
            ]}
          />
        </View>
      </View>
    );
  }
);

AnimatedProgressBar.displayName = "AnimatedProgressBar";

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  label: {
    color: rgba(colors.text.primary, 0.6),
    fontSize: 13,
  },
  score: {
    color: colors.text.primary,
    fontWeight: "bold",
    fontSize: 13,
  },
  track: {
    height: 8,
    backgroundColor: rgba(colors.primary, 0.1),
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 4,
  },
});
