import React from "react";
import Animated from "react-native-reanimated";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

/**
 * GlowCircle
 * @description Círculo con gradiente radial para efectos de fondo
 */
export interface GlowCircleProps {
  size: number;
  opacity?: number;
  color: string;
  id: string; // ID único para SVG
  style?: any;
}

export const GlowCircle = ({
  size,
  opacity = 0.2,
  color,
  id,
  style,
}: GlowCircleProps) => (
  <Animated.View style={style}>
    <Svg height={size} width={size} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient
          id={id}
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="1" stopColor={color} stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="50" cy="50" r="50" fill={`url(#${id})`} />
    </Svg>
  </Animated.View>
);
