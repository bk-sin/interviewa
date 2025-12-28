import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";

export const usePulseAnimation = () => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [pulseAnim]);

  // Memoizamos las interpolaciones para evitar recálculos
  return useMemo(
    () => ({
      scale: pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.5],
      }),
      opacity: pulseAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.75, 0.3, 0],
      }),
    }),
    [pulseAnim]
  );
};
