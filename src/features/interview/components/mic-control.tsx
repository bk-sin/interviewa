import { Text } from "@/src/shared";
import { colors, fonts, fontSizes, spacing } from "@/src/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { usePulseAnimation } from "../hooks/use-pulse-animation";

export const MicrophoneControl = React.memo(() => {
  const { scale, opacity } = usePulseAnimation();

  return (
    <View style={styles.micArea}>
      <View style={styles.micWrapper}>
        <Animated.View
          style={[styles.pingCircle, { transform: [{ scale }], opacity }]}
        />
        <View style={styles.middleCircle} />

        <TouchableOpacity
          style={styles.micButton}
          activeOpacity={0.9}
          accessibilityLabel="Comenzar a grabar"
          accessibilityRole="button"
        >
          <MaterialIcons name="mic" size={48} color={colors.background.dark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.recordText}>Grabar respuesta</Text>

      <TouchableOpacity
        style={styles.textResponseButton}
        accessibilityRole="button"
        accessibilityLabel="Responder con texto"
      >
        <MaterialIcons name="keyboard" size={20} color={colors.text.muted} />
        <Text style={styles.textResponseLabel}>Responder con texto</Text>
      </TouchableOpacity>
    </View>
  );
});

MicrophoneControl.displayName = "MicrophoneControl";

const styles = StyleSheet.create({
  micArea: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xl,
    flex: 1,
    alignSelf: "center",
    marginBottom: spacing["5xl"],
  },
  micWrapper: {
    position: "relative",
    width: 98,
    height: 98,
    alignItems: "center",
    justifyContent: "center",
  },
  pingCircle: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 80,
    backgroundColor: colors.primary,
  },
  middleCircle: {
    position: "absolute",
    width: 98,
    height: 98,
    borderRadius: 49,
    backgroundColor: colors.primary,
  },
  micButton: {
    width: 98,
    height: 98,
    borderRadius: 56,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  recordText: {
    color: colors.text.primary,
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
  },
  textResponseButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
  },
  textResponseLabel: {
    color: colors.text.muted,
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
  },
});
