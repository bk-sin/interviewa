import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

import { theme } from "@/src/theme";

/**
 * Extended TextInput props interface
 */
export interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  /** Additional styles for the input */
  readonly style?: TextStyle;
  /** Error message to display (also sets error state) */
  readonly error?: string;
  /** Optional test ID for testing purposes */
  readonly testID?: string;
  /** Show password toggle for secure inputs */
  readonly showPasswordToggle?: boolean;
}

/**
 * TextInput - Reusable text input component with consistent styling
 * Forward refs to allow parent components to control focus, etc.
 */
export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  function TextInput(
    { style, error, testID, secureTextEntry, showPasswordToggle, ...props },
    ref
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const hasError = !!error;
    const isSecure = secureTextEntry && !isPasswordVisible;
    const showToggle = secureTextEntry && showPasswordToggle;

    const inputStyle = [
      styles.input,
      hasError && styles.inputError,
      showToggle && styles.inputWithToggle,
      style,
    ];

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View>
        <View style={styles.inputWrapper}>
          <RNTextInput
            ref={ref}
            style={inputStyle}
            placeholderTextColor={theme.colors.text.muted}
            testID={testID}
            secureTextEntry={isSecure}
            {...props}
          />
          {showToggle && (
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={togglePasswordVisibility}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityLabel={
                isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              accessibilityRole="button"
            >
              <MaterialIcons
                name={isPasswordVisible ? "visibility-off" : "visibility"}
                size={22}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
        {hasError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border.dark,
    borderRadius: theme.borderRadius.base,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.base,
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.regular,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.dark,
  },
  inputWithToggle: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: "#ff4444",
    marginBottom: theme.spacing.xs,
  },
  toggleButton: {
    position: "absolute",
    right: theme.spacing.md,
    top: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.bodySmall,
    color: "#ff4444",
    marginBottom: theme.spacing.sm,
  },
});
