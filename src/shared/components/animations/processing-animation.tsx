import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { rgba, theme } from "@/src/theme";

const { colors, spacing } = theme;

export interface ProcessingAnimationProps {
  pingStyle: any;
  spinStyle: any;
  reverseSpinStyle: any;
  pulseStyle: any;
}

/**
 * ProcessingAnimation
 * @description Central animated circle with spinning borders and glowing center for processing screens
 */
export function ProcessingAnimation({
  pingStyle,
  spinStyle,
  reverseSpinStyle,
  pulseStyle,
}: ProcessingAnimationProps) {
  const floatY = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [floatY]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <Animated.View style={[styles.animationContainer, floatStyle]}>
      {/* Ping Circle (Onda expansiva) */}
      <Animated.View
        style={[styles.circleBase, styles.pingCircle, pingStyle]}
      />

      {/* Spinning Borders */}
      <Animated.View
        style={[styles.circleBase, styles.borderSpinner, spinStyle]}
      />
      <Animated.View
        style={[styles.circleBase, styles.borderSpinnerInner, reverseSpinStyle]}
      />

      {/* Centro Glowing */}
      <Animated.View style={[styles.centerGlow, pulseStyle]} />

      {/* Icono Central */}
      <View style={styles.iconContainer}>
        <MaterialIcons name="auto-awesome" size={48} color={colors.primary} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
    borderColor: colors.primary + "40",
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
    backgroundColor: rgba(colors.primary, 0.1),
    opacity: 0.1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rgba(colors.primary, 0.1),
    borderWidth: 1,
    borderColor: colors.primary + "30",
  },
});
