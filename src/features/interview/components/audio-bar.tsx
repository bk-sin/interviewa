import { theme } from "@/src/theme";
import React, { useRef } from "react";
import { Animated } from "react-native";

interface AudioBarProps {
  index: number;
  totalBars: number;
  baseHeight: number;
  bassVolumeAnim: Animated.Value;
  midVolumeAnim: Animated.Value;
  trebleVolumeAnim: Animated.Value;
}

// ========================================
// CONFIGURACIÓN VISUAL DE LAS BARRAS
// ========================================
const BAR_CONFIG = {
  // Escalas de altura (multiplicadores del baseHeight)
  minScale: 0.3, // Escala mínima cuando no hay sonido (0.3 = 30% de altura base)
  maxScale: 2.5, // Escala máxima cuando hay sonido fuerte (2.5 = 250% de altura)

  // Configuración por tipo de frecuencia
  bass: {
    width: 6, // Ancho de barras graves (px)
    margin: 2, // Margen entre barras graves (px)
    scaleBoost: 1.2, // Multiplicador adicional (graves más grandes)
  },
  mid: {
    width: 5, // Ancho de barras medias
    margin: 1.5, // Margen entre barras medias
    scaleBoost: 1.0, // Sin boost
  },
  treble: {
    width: 4, // Ancho de barras agudas (más delgadas)
    margin: 1.5, // Margen entre barras agudas
    scaleBoost: 1.1, // Multiplicador adicional
  },

  // Opacidad
  minOpacity: 0.4, // Opacidad mínima (cuando no hay sonido)
  maxOpacity: 1, // Opacidad máxima (con sonido)

  // Variación aleatoria (jitter)
  jitterAmount: 0.3, // 0 = sin variación, 1 = máxima variación
};

export const AudioBar = ({
  index,
  totalBars,
  baseHeight,
  bassVolumeAnim,
  midVolumeAnim,
  trebleVolumeAnim,
}: AudioBarProps) => {
  // 1. Dividir las barras en tres secciones según su posición
  const leftThird = totalBars / 3;
  const rightThird = (totalBars * 2) / 3;

  // Clasificamos las barras por posición:
  // - Graves: Barras IZQUIERDAS (primer tercio)
  // - Medias: Barras del CENTRO (tercio medio)
  // - Agudas: Barras DERECHAS (último tercio)
  const isBass = index < leftThird;
  const isTreble = index >= rightThird;

  // 2. Seleccionar qué animación usar según la posición
  let currentVolumeAnim = midVolumeAnim; // Por defecto medias (centro)
  if (isBass) currentVolumeAnim = bassVolumeAnim; // Izquierda
  if (isTreble) currentVolumeAnim = trebleVolumeAnim; // Derecha

  // 3. Configuración específica según el tipo
  const barStyle = isBass
    ? BAR_CONFIG.bass
    : isTreble
    ? BAR_CONFIG.treble
    : BAR_CONFIG.mid;

  // 4. Crear una variación aleatoria (jitter) para que no se vean idénticas
  const randomOffset = useRef(Math.random()).current;
  const jitterFactor = 1 + (randomOffset - 0.5) * BAR_CONFIG.jitterAmount;

  // 5. Interpolación de altura usando configuración
  const heightAnim = currentVolumeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      baseHeight * BAR_CONFIG.minScale,
      baseHeight * BAR_CONFIG.maxScale * barStyle.scaleBoost * jitterFactor,
    ],
    extrapolate: "clamp",
  });

  // 6. Opacidad dinámica usando configuración
  const opacityAnim = currentVolumeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [BAR_CONFIG.minOpacity, BAR_CONFIG.maxOpacity],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        width: barStyle.width,
        height: heightAnim,
        backgroundColor: theme.colors.primary,
        borderRadius: 999,
        marginHorizontal: barStyle.margin,
        opacity: opacityAnim,
      }}
    />
  );
};
