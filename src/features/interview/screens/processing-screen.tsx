import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  GlowCircle,
  LoadingDot,
  ProcessingAnimation,
  ThemedText,
  ThemedView,
} from "@/src/shared/components";
import { colors, rgba, theme } from "@/src/theme";
import { useProcessingLogic } from "../hooks";

const { spacing, typography } = theme;

/**
 * ProcessingScreen
 * @description Pantalla de procesamiento con animaciones y feedback visual
 */
export default function ProcessingScreen() {
  const insets = useSafeAreaInsets();

  const { pingStyle, spinStyle, reverseSpinStyle, pulseStyle, progress } =
    useProcessingLogic();

  const glowTopRotation = useSharedValue(0);
  const glowBottomRotation = useSharedValue(0);

  useEffect(() => {
    const ROTATION_OPTS = { duration: 20000, easing: Easing.linear };

    glowTopRotation.value = withRepeat(
      withTiming(360, ROTATION_OPTS),
      -1,
      false
    );
    glowBottomRotation.value = withRepeat(
      withTiming(360, { ...ROTATION_OPTS, duration: 25000 }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const glowTopStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${glowTopRotation.value}deg` }],
  }));

  const glowBottomStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${glowBottomRotation.value}deg` }],
  }));

  return (
    <ThemedView style={styles.container}>
      {/* 1. Fondo Ambiental (Blobs) */}
      <View style={[styles.blob, styles.blobTop]}>
        <GlowCircle
          size={400}
          opacity={0.06}
          color={colors.primary}
          id="glow-top"
          style={glowTopStyle}
        />
      </View>

      <View style={[styles.blob, styles.blobBottom]}>
        <GlowCircle
          size={300}
          opacity={0.05}
          color={colors.primary}
          id="glow-bottom"
          style={glowBottomStyle}
        />
      </View>

      {/* 2. Contenido Central */}
      <View
        style={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      >
        {/* Animación Principal */}
        <ProcessingAnimation
          pingStyle={pingStyle}
          spinStyle={spinStyle}
          reverseSpinStyle={reverseSpinStyle}
          pulseStyle={pulseStyle}
        />

        {/* Textos Informativos */}
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

        {/* Barra de Progreso */}
        <View style={styles.progressContainer}>
          <View style={styles.track}>
            <LinearGradient
              colors={[rgba(colors.primary, 0.8), colors.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.bar, { width: `${progress}%` }]}
            />
          </View>

          {/* Loading Dots Animados */}
          <View style={styles.dotsContainer}>
            {[0, 200, 400].map((delay) => (
              <LoadingDot key={delay} delay={delay} />
            ))}
          </View>
        </View>
      </View>
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}
      >
        <MaterialIcons
          name="verified-user"
          size={16}
          color={colors.text.secondary}
        />
        <ThemedText style={styles.footerText}>
          Procesamiento seguro con IA
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  blob: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  blobTop: {
    top: -100,
    left: -100,
  },
  blobBottom: {
    bottom: -100,
    right: -100,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
  },
  title: {
    ...typography.h2,
    textAlign: "center",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    textAlign: "center",
    color: colors.primary,
    opacity: 0.9,
  },
  progressContainer: {
    width: 280,
    marginTop: spacing.md,
  },
  track: {
    height: 6,
    backgroundColor: rgba(colors.text.primary, 0.1),
    borderRadius: 999,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 999,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: spacing.sm,
    height: 12,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    opacity: 0.6,
  },
  footerText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
