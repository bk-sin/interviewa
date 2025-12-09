import { theme } from "@/src/theme";
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { TextInput as RNTextInput, StyleSheet, Text, View } from "react-native";

import { TextInput, TextInputProps } from "./text-input";

/**
 * FormInput props interface
 * Wraps TextInput with react-hook-form Controller
 */
export interface FormInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
  /** react-hook-form control object */
  control: Control<T>;
  /** Field name - must match schema keys */
  name: FieldPath<T>;
  /** Label text displayed above input */
  label: string;
  /** Ref for focus management */
  inputRef?: React.RefObject<RNTextInput | null>;
}

/**
 * FormInput - Wrapper component that combines react-hook-form Controller with TextInput
 * Reduces boilerplate and standardizes form field rendering
 *
 * @example
 * <FormInput
 *   control={control}
 *   name="email"
 *   label="Correo electrónico"
 *   placeholder="tu@email.com"
 *   keyboardType="email-address"
 * />
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  inputRef,
  ...textInputProps
}: FormInputProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <TextInput
            ref={inputRef ?? ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            {...textInputProps}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
});
