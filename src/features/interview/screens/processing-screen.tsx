import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/src/shared/components";
import { colors, rgba, theme } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useProcessingLogic } from "../hooks";

const { spacing, typography } = theme;

/**
 * ProcessingScreen
 * @description
 */
export default function ProcessingScreen() {
  const insets = useSafeAreaInsets();
  const { pingStyle, spinStyle, reverseSpinStyle, pulseStyle, progress } =
    useProcessingLogic();

  return (
    <ThemedView style={styles.container}>
      {/* Background Blobs (Efecto de luz de fondo) */}
      <View style={[styles.blob, styles.blobTop]} />
      <View style={[styles.blob, styles.blobBottom]} />

      <View
        style={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      >
        {/* --- Círculo Central Animado --- */}
        <View style={styles.animationContainer}>
          {/* Ping Circle (Onda expansiva) */}
          <Animated.View
            style={[styles.circleBase, styles.pingCircle, pingStyle]}
          />

          {/* Spinning Borders */}
          <Animated.View
            style={[styles.circleBase, styles.borderSpinner, spinStyle]}
          />
          <Animated.View
            style={[
              styles.circleBase,
              styles.borderSpinnerInner,
              reverseSpinStyle,
            ]}
          />

          {/* Centro Glowing */}
          <Animated.View style={[styles.centerGlow, pulseStyle]} />

          {/* Icono Central */}
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="auto-awesome"
              size={48}
              color={colors.primary}
            />
          </View>
        </View>

        {/* --- Textos --- */}
        <View style={styles.textContainer}>
          <Animated.View entering={FadeInUp.duration(500)}>
            <ThemedText style={styles.title}>
              Analizando respuesta...
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(200)}>
            <ThemedText style={styles.subtitle}>
              Evaluando claridad y estructura
            </ThemedText>
          </Animated.View>
        </View>

        {/* --- Barra de Progreso --- */}
        <View style={styles.progressContainer}>
          <View style={styles.track}>
            <LinearGradient
              colors={[colors.primary + "CC", colors.primary]} // Hex con opacidad + Hex
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.bar, { width: `${progress}%` }]}
            />
          </View>

          {/* Puntos rebotando (Loading dots) */}
          <View style={styles.dotsContainer}>
            <LoadingDot delay={0} />
            <LoadingDot delay={200} />
            <LoadingDot delay={400} />
          </View>
        </View>

        {/* --- Footer Seguro --- */}
        <View style={styles.footer}>
          <MaterialIcons
            name="verified-user"
            size={16}
            color={colors.text.secondary}
          />
          <ThemedText style={styles.footerText}>
            Procesamiento seguro con IA
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const LoadingDot = ({ delay }: { delay: number }) => {
  // Nota: Podrías animar esto con Reanimated también, pero para brevedad uso View simple
  // En producción usaría un SharedValue con delay.
  return <View style={[styles.dot, { opacity: 0.8 }]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark, // #10221c
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  // Blobs de fondo (Simulación de luces)
  blob: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.1,
  },
  blobTop: {
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    backgroundColor: colors.primary,
  },
  blobBottom: {
    bottom: -100,
    right: -100,
    width: 300,
    height: 300,
    backgroundColor: colors.primary,
  },
  // Animación Central
  animationContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  circleBase: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pingCircle: {
    borderColor: colors.primary,
    opacity: 0.2,
  },
  borderSpinner: {
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderColor: colors.primary + "40", // Opacidad baja
  },
  borderSpinnerInner: {
    width: "75%",
    height: "75%",
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: colors.primary + "60",
  },
  centerGlow: {
    position: "absolute",
    width: "50%",
    height: "50%",
    borderRadius: 999,
    backgroundColor: colors.primary,
    opacity: 0.2,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary + "10", // Fondo muy suave
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
  // Textos
  textContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h2, // Asumiendo que h2 es similar a text-3xl
    textAlign: "center",
    color: "#FFF", // Forzamos blanco sobre el fondo oscuro
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    color: colors.primary,
    opacity: 0.9,
  },
  // Barra de progreso
  progressContainer: {
    width: 280,
    marginTop: spacing.md,
  },
  track: {
    height: 6,
    backgroundColor: rgba("#FFF", 0.1),
    borderRadius: 999,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 999,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    opacity: 0.6,
  },
  footerText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
