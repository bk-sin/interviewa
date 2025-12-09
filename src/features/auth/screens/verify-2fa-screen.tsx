import { AUTH_ROUTES, AUTH_VALIDATION } from "@/src/config";
import { getClerkErrorMessage } from "@/src/features/auth/utils";
import { Button, ErrorAlert, TextInput } from "@/src/shared/ui";
import { theme } from "@/src/theme";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ErrorState {
  message: string;
  suggestion?: string;
  linkText?: string;
  linkHref?: string;
}

export default function Verify2FAScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<ErrorState | null>(null);

  const handleVerify = async () => {
    if (!isLoaded || isLoading || code.length !== AUTH_VALIDATION.CODE_LENGTH)
      return;

    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace(AUTH_ROUTES.HOME);
      } else {
        console.log("Unexpected 2FA status:", result.status);
        setError({
          message: "Error al verificar el código. Inténtalo de nuevo.",
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const errorInfo = getClerkErrorMessage(err);
      setError(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;

    setError(null);

    try {
      await signIn.prepareSecondFactor({
        strategy: "email_code",
      });
      setError({
        message: "Código reenviado a tu correo electrónico.",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const errorInfo = getClerkErrorMessage(err);
      setError(errorInfo);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Verificación en dos pasos</Text>
        <Text style={styles.subtitle}>
          Enviamos un código de verificación a tu correo electrónico.
        </Text>

        {error && (
          <ErrorAlert
            message={error.message}
            suggestion={error.suggestion}
            linkText={error.linkText}
            linkHref={error.linkHref}
          />
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Código de verificación</Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              placeholder="000000"
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={AUTH_VALIDATION.CODE_LENGTH}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleVerify}
              placeholderTextColor={theme.colors.text.secondary}
            />
          </View>

          <Button
            onPress={handleVerify}
            disabled={isLoading || code.length !== AUTH_VALIDATION.CODE_LENGTH}
          >
            {isLoading ? "Verificando..." : "Verificar"}
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No recibiste el código?{" "}
            <Text style={styles.link} onPress={handleResend}>
              Reenviar código
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.dark,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing["3xl"],
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  form: {
    width: "100%",
    maxWidth: 480,
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  inputContainer: {
    gap: theme.spacing.sm,
  },
  label: {
    ...theme.typography.bodyMedium,
    color: theme.colors.text.primary,
  },
  footer: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing["3xl"],
  },
  footerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
  link: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
  },
});
