import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";

import { ThemedText } from "@/src/shared/components";
import { borderRadius, colors, rgba, spacing } from "@/src/theme";

// Creamos un componente Circle animado
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CheckpointProgressProps {
  progress: SharedValue<number>; // Valor de 0 a 1
  percentage: number; // Valor numérico para mostrar texto
  trend: string;
}

/**
 * CheckpointProgress
 * @description Anillo de progreso animado con estadísticas
 */
export const CheckpointProgress = ({
  progress,
  percentage,
  trend,
}: CheckpointProgressProps) => {
  const size = 240;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Props animadas para el SVG
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - progress.value),
    };
  });

  return (
    <View style={styles.container}>
      {/* Glow Effect Trasero */}
      <View style={styles.glow} />

      {/* SVG Ring */}
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
            {/* Background Circle (Track) */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#1f4236" // Color oscuro del track
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress Circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.primary}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animatedProps={animatedProps}
              fill="transparent"
            />
          </G>
        </Svg>
      </View>

      {/* Contenido Central */}
      <View style={styles.innerContent}>
        <MaterialIcons
          name="local-fire-department"
          size={32}
          color={colors.primary}
        />
        <ThemedText style={styles.percentageText}>{percentage}%</ThemedText>
        <ThemedText style={styles.label}>COMPLETADO</ThemedText>
      </View>

      {/* Floating Tag */}
      <View style={styles.floatTag}>
        <MaterialIcons name="trending-up" size={16} color={colors.primary} />
        <ThemedText style={styles.floatTagText}>{trend}</ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xl,
    position: "relative",
  },
  glow: {
    position: "absolute",
    width: 200,
    height: 200,
    backgroundColor: rgba(colors.primary, 0.2),
    borderRadius: 999,
    opacity: 0.5,
    transform: [{ scale: 1.2 }],
  },
  innerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 60,
    fontWeight: "900",
    color: colors.text.primary,
    lineHeight: 70,
    letterSpacing: -2,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    color: colors.primary,
    textTransform: "uppercase",
  },
  floatTag: {
    position: "absolute",
    bottom: -12,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: rgba(colors.primary, 0.3),
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatTagText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 12,
  },
});
