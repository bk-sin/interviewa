import { useMemo } from "react";
import { FooterButtonConfig } from "../components/footer";

/**
 * Configuraciones predefinidas comunes para el Footer
 */

/**
 * Hook para generar configuración de botón simple "Start Interview"
 */
export const useStartInterviewButton = (
  onStart: () => void,
  disabled = false
): FooterButtonConfig[] => {
  return useMemo(
    () => [
      {
        label: "Start Interview",
        onPress: onStart,
        variant: "primary" as const,
        disabled,
        testID: "footer-start-btn",
        accessibilityLabel: "Start interview",
        accessibilityHint: "Begins the interview session",
      },
    ],
    [onStart, disabled]
  );
};

/**
 * Hook para generar botones Cancel + Continue
 */
export const useCancelContinueButtons = (
  onCancel: () => void,
  onContinue: () => void,
  continueDisabled = false
): FooterButtonConfig[] => {
  return useMemo(
    () => [
      {
        label: "Cancel",
        onPress: onCancel,
        variant: "secondary" as const,
        flex: 1,
        testID: "footer-cancel-btn",
        accessibilityLabel: "Cancel",
        accessibilityHint: "Cancels current action",
      },
      {
        label: "Continue",
        onPress: onContinue,
        variant: "primary" as const,
        flex: 2,
        disabled: continueDisabled,
        testID: "footer-continue-btn",
        accessibilityLabel: "Continue",
        accessibilityHint: "Proceeds to next step",
      },
    ],
    [onCancel, onContinue, continueDisabled]
  );
};

/**
 * Hook para generar botones Previous + Next
 */
export const usePrevNextButtons = (
  onPrevious: () => void,
  onNext: () => void,
  options: {
    previousDisabled?: boolean;
    nextDisabled?: boolean;
    previousLabel?: string;
    nextLabel?: string;
  } = {}
): FooterButtonConfig[] => {
  const {
    previousDisabled = false,
    nextDisabled = false,
    previousLabel = "Previous",
    nextLabel = "Next",
  } = options;

  return useMemo(
    () => [
      {
        label: previousLabel,
        onPress: onPrevious,
        variant: "secondary" as const,
        flex: 1,
        disabled: previousDisabled,
        testID: "footer-previous-btn",
        accessibilityLabel: previousLabel,
        accessibilityHint: "Goes to previous question",
      },
      {
        label: nextLabel,
        onPress: onNext,
        variant: "primary" as const,
        flex: 1,
        disabled: nextDisabled,
        testID: "footer-next-btn",
        accessibilityLabel: nextLabel,
        accessibilityHint: "Proceeds to next question",
      },
    ],
    [
      onPrevious,
      onNext,
      previousDisabled,
      nextDisabled,
      previousLabel,
      nextLabel,
    ]
  );
};

/**
 * Hook para generar botones Save Draft + Submit
 */
export const useSaveSubmitButtons = (
  onSave: () => void,
  onSubmit: () => void,
  submitDisabled = false
): FooterButtonConfig[] => {
  return useMemo(
    () => [
      {
        label: "Save Draft",
        onPress: onSave,
        variant: "link" as const,
        testID: "footer-save-btn",
        accessibilityLabel: "Save as draft",
        accessibilityHint: "Saves current progress without submitting",
      },
      {
        label: "Submit",
        onPress: onSubmit,
        variant: "primary" as const,
        disabled: submitDisabled,
        testID: "footer-submit-btn",
        accessibilityLabel: "Submit interview",
        accessibilityHint: "Submits completed interview",
      },
    ],
    [onSave, onSubmit, submitDisabled]
  );
};

/**
 * Hook para generar dos botones con distribución 50/50
 * Útil para acciones de igual importancia (ej: Skip/Answer, Cancel/Confirm)
 */
export const useEqualButtons = (
  leftConfig: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "social" | "link";
    disabled?: boolean;
  },
  rightConfig: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "social" | "link";
    disabled?: boolean;
  }
): FooterButtonConfig[] => {
  return useMemo(
    () => [
      {
        label: leftConfig.label,
        onPress: leftConfig.onPress,
        variant: leftConfig.variant || "secondary",
        disabled: leftConfig.disabled || false,
        flex: 1,
        testID: `footer-${leftConfig.label
          .toLowerCase()
          .replace(/\s+/g, "-")}-btn`,
        accessibilityLabel: leftConfig.label,
        accessibilityHint: `Activates ${leftConfig.label}`,
      },
      {
        label: rightConfig.label,
        onPress: rightConfig.onPress,
        variant: rightConfig.variant || "primary",
        disabled: rightConfig.disabled || false,
        flex: 1,
        testID: `footer-${rightConfig.label
          .toLowerCase()
          .replace(/\s+/g, "-")}-btn`,
        accessibilityLabel: rightConfig.label,
        accessibilityHint: `Activates ${rightConfig.label}`,
      },
    ],
    [leftConfig, rightConfig]
  );
};

/**
 * Hook para generar botón single customizable
 */
export const useSingleButton = (
  label: string,
  onPress: () => void,
  options: {
    variant?: "primary" | "secondary" | "social" | "link";
    disabled?: boolean;
    testID?: string;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  } = {}
): FooterButtonConfig[] => {
  const {
    variant = "primary",
    disabled = false,
    testID,
    accessibilityLabel,
    accessibilityHint,
  } = options;

  return useMemo(
    () => [
      {
        label,
        onPress,
        variant,
        disabled,
        testID:
          testID || `footer-${label.toLowerCase().replace(/\s+/g, "-")}-btn`,
        accessibilityLabel: accessibilityLabel || label,
        accessibilityHint: accessibilityHint || `Activates ${label}`,
      },
    ],
    [
      label,
      onPress,
      variant,
      disabled,
      testID,
      accessibilityLabel,
      accessibilityHint,
    ]
  );
};

/**
 * Hook para generar múltiples botones custom
 */
export const useCustomButtons = (
  configs: {
    label: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "social" | "link";
    disabled?: boolean;
    flex?: number;
    testID?: string;
  }[]
): FooterButtonConfig[] => {
  return useMemo(
    () =>
      configs.map((config, index) => ({
        label: config.label,
        onPress: config.onPress,
        variant: config.variant || "primary",
        disabled: config.disabled || false,
        flex: config.flex,
        testID: config.testID || `footer-btn-${index}`,
        accessibilityLabel: config.label,
        accessibilityHint: `Activates ${config.label}`,
      })),
    [configs]
  );
};
