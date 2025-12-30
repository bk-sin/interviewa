import { useEffect, useState } from "react";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

/**
 * useProcessingLogic
 * @description Business logic for processing feature
 */
export function useProcessingLogic() {
  const [progress, setProgress] = useState(0);

  // Valores compartidos para animaciones (Reanimated)
  const spinValue = useSharedValue(0);
  const pulseValue = useSharedValue(1);
  const pingValue = useSharedValue(1);

  useEffect(() => {
    // 1. Configurar animaciones perpetuas
    spinValue.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1, // Infinito
      false // No reverse, para que siga girando en la misma dirección
    );

    pulseValue.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    pingValue.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 0 }) // Reset instantáneo
      ),
      -1
    );

    // 2. Simular carga de barra de progreso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Aquí iría la navegación real: router.replace('/resultado');
          return 100;
        }
        return prev + 1; // Incremento
      });
    }, 50); // Velocidad de carga

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animations = {
    spinValue,
    pulseValue,
    pingValue,
  };

  // Estilos animados derivados
  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animations.spinValue.value}deg` }],
  }));

  const reverseSpinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `-${animations.spinValue.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animations.pulseValue.value }],
    opacity: 0.8,
  }));

  const pingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animations.pingValue.value }],
    opacity: 1.5 - animations.pingValue.value, // Se desvanece al crecer
  }));

  return {
    progress,
    animations,
    pingStyle,
    spinStyle,
    reverseSpinStyle,
    pulseStyle,
  };
}
