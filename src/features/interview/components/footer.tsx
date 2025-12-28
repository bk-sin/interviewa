import { Button } from "@/src/shared/ui";
import { MaterialIconName } from "@/src/shared/ui/button";
import { theme } from "@/src/theme";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { colors, spacing } = theme;

/**
 * Configuración de un botón individual
 */
export interface FooterButtonConfig {
  /** Texto del botón */
  label: string;
  /** Acción al presionar */
  onPress: () => void;
  /** Variante visual del botón */
  variant?: "primary" | "secondary" | "social" | "link";
  /** Si el botón está deshabilitado */
  disabled?: boolean;
  /** Ancho del botón (flex) */
  flex?: number;
  /** ID para testing */
  testID?: string;
  /** Label de accesibilidad */
  accessibilityLabel?: string;
  /** Hint de accesibilidad */
  accessibilityHint?: string;
  /** Icono a la izquierda (Material Icon name) */
  leftIcon?: MaterialIconName;
  /** Icono a la derecha (Material Icon name) */
  rightIcon?: MaterialIconName;
}

/**
 * Props para el Footer configurable
 */
interface FooterProps {
  /** Configuración de botones (puede ser uno o múltiples) */
  buttons?: FooterButtonConfig[];
  /** Padding bottom adicional (safe area) */
  paddingBottom?: number;
  /** Layout de los botones */
  layout?: "row" | "column";
  /** Gap entre botones cuando hay múltiples */
  gap?: number;
  /** Estilos personalizados para el contenedor */
  containerStyle?: ViewStyle;
  /** Si mostrar el borde superior */
  showBorder?: boolean;
  /** Color de fondo personalizado (override) */
  backgroundColor?: string;
  /** Opacidad del fondo */
  backgroundOpacity?: number;
}

/**
 * Footer - Componente configurable para acciones en pantallas de interview
 *
 * @example
 * // Botón simple
 * <Footer
 *   buttons={[{ label: "Start Interview", onPress: handleStart }]}
 *   paddingBottom={insets.bottom}
 * />
 *
 * @example
 * // Dos botones 50/50 (igual tamaño)
 * <Footer
 *   buttons={[
 *     {
 *       label: "Skip",
 *       onPress: handleSkip,
 *       variant: "secondary",
 *       flex: 1,
 *     },
 *     {
 *       label: "Answer",
 *       onPress: handleAnswer,
 *       variant: "primary",
 *       flex: 1,
 *     }
 *   ]}
 *   layout="row"
 * />
 *
 * @example
 * // Dos botones con proporción 1:2 (Cancel más chico)
 * <Footer
 *   buttons={[
 *     {
 *       label: "Cancel",
 *       onPress: handleCancel,
 *       variant: "secondary",
 *       flex: 1,
 *       testID: "footer-cancel-btn"
 *     },
 *     {
 *       label: "Continue",
 *       onPress: handleContinue,
 *       variant: "primary",
 *       flex: 2,
 *       testID: "footer-continue-btn"
 *     }
 *   ]}
 *   layout="row"
 *   gap={12}
 * />
 *
 * @example
 * // Botones en columna con estilos custom
 * <Footer
 *   buttons={[
 *     { label: "Save Draft", onPress: handleSave, variant: "link" },
 *     { label: "Submit", onPress: handleSubmit, variant: "primary" }
 *   ]}
 *   layout="column"
 *   gap={8}
 *   showBorder={false}
 *   backgroundColor="rgba(0,0,0,0.9)"
 * />
 *
 * @example
 * // Botón con accesibilidad
 * <Footer
 *   buttons={[
 *     {
 *       label: "Next Question",
 *       onPress: handleNext,
 *       disabled: !isAnswered,
 *       accessibilityLabel: "Proceed to next question",
 *       accessibilityHint: "Moves to the next interview question"
 *     }
 *   ]}
 * />
 */
export const Footer = React.memo<FooterProps>(
  ({
    buttons = [],
    paddingBottom = 0,
    layout = "column",
    gap = spacing.base,
    containerStyle,
    showBorder = true,
    backgroundColor,
    backgroundOpacity = 0.85,
  }) => {
    const bgColor =
      backgroundColor || theme.rgba(colors.background.dark, backgroundOpacity);
    const insets = useSafeAreaInsets();

    return (
      <View
        style={[
          styles.footer,
          {
            paddingBottom: paddingBottom + insets.bottom + spacing.sm,
            backgroundColor: bgColor,
            borderTopWidth: showBorder ? 1 : 0,
          },
          layout === "row" && styles.footerRow,
          containerStyle,
        ]}
      >
        <View
          style={[
            styles.buttonsContainer,
            layout === "row" ? styles.buttonsRow : styles.buttonsColumn,
            { gap },
          ]}
        >
          {buttons.map((buttonConfig, index) => {
            // En layout row, si no se especifica flex, usar flex: 1 para distribuir equitativamente
            const containerStyle =
              layout === "row"
                ? { flex: buttonConfig.flex ?? 1 }
                : buttonConfig.flex
                ? { flex: buttonConfig.flex }
                : undefined;

            return (
              <View
                key={buttonConfig.testID || `footer-button-${index}`}
                style={containerStyle}
              >
                <Button
                  onPress={buttonConfig.onPress}
                  variant={buttonConfig.variant}
                  disabled={buttonConfig.disabled}
                  testID={buttonConfig.testID}
                  accessibilityLabel={buttonConfig.accessibilityLabel}
                  accessibilityHint={buttonConfig.accessibilityHint}
                  leftIcon={buttonConfig.leftIcon}
                  rightIcon={buttonConfig.rightIcon}
                  fullWidth={true}
                >
                  {buttonConfig.label}
                </Button>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
);

Footer.displayName = "Footer";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: theme.rgba(colors.background.dark, 0.85),
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  footerRow: {
    flexDirection: "row",
  },
  buttonsContainer: {
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsColumn: {
    flexDirection: "column",
  },
});
