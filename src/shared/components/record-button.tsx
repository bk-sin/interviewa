import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { colors, rgba } from "@/src/theme";

interface RecordButtonProps {
  onPress: () => void;
  isRecording?: boolean;
  size?: number;
}

/**
 * RecordButton
 * @description Botón de grabación con animación de ping y respuesta táctil
 */
export const RecordButton = ({
  onPress,
  isRecording = false,
  size = 112, // h-28 w-28 en tailwind es 112px
}: RecordButtonProps) => {
  // --- Valores Compartidos para Animaciones ---
  const pingValue = useSharedValue(0); // 0 a 1 (Ciclo del ping)
  const pressScale = useSharedValue(1); // Escala al presionar

  // 1. Efecto "Ping" (Onda expansiva continua)
  useEffect(() => {
    // Si está grabando, el ping es más rápido (aviso visual)
    const duration = isRecording ? 1000 : 2000;

    pingValue.value = withRepeat(
      withTiming(1, { duration, easing: Easing.out(Easing.ease) }),
      -1, // Infinito
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  // 2. Estilo Animado para el Anillo Exterior (Ping)
  const pingStyle = useAnimatedStyle(() => {
    const scale = interpolate(pingValue.value, [0, 1], [1, 1.5]);
    const opacity = interpolate(
      pingValue.value,
      [0, 0.5, 1],
      [0.6, 0.3, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // 3. Estilo para el botón central (Respuesta al tacto)
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const handlePressIn = () => {
    pressScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    pressScale.value = withSpring(1);
  };

  return (
    <View style={[styles.container, { width: size * 1.6, height: size * 1.6 }]}>
      {/* --- Anillo Exterior (Ping) --- */}
      <Animated.View
        style={[
          styles.ring,
          {
            width: size * 1.4, // h-40 w-40 aprox
            height: size * 1.4,
            backgroundColor: rgba(colors.primary, 0.15),
          },
          pingStyle,
        ]}
      />

      {/* --- Anillo Medio (Estático/Brillo) --- */}
      <View
        style={[
          styles.ring,
          {
            width: size * 1.15, // h-32 w-32 aprox
            height: size * 1.15,
            backgroundColor: rgba(colors.primary, 0.2),
          },
        ]}
      />

      {/* --- Botón Central --- */}
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={[
            styles.button,
            { width: size, height: size },
            isRecording && styles.buttonRecording,
            buttonAnimatedStyle,
          ]}
        >
          <MaterialIcons
            name="mic"
            color={colors.background.dark}
            size={size * 0.45} // Icono proporcional
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  ring: {
    position: "absolute",
    borderRadius: 9999, // Full circle
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    // Sombras (Glow)
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10, // Android shadow
    zIndex: 10,
  },
  buttonRecording: {
    // Cambio visual opcional cuando está grabando activamente
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
});
