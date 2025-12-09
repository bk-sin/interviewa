import { AUTH_MESSAGES, AUTH_ROUTES } from "@/src/config";
import { SignInFormData, useSignInLogic } from "@/src/features/auth/hooks";
import { Button, ErrorAlert, FormInput, OrDivider } from "@/src/shared/ui";
import { theme } from "@/src/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

/**
 * SignInScreen - User login view
 *
 * Architecture:
 * - Business logic extracted to useSignInLogic hook (MVVM pattern)
 * - Form inputs use FormInput wrapper (reduces boilerplate)
 * - Error display uses ErrorAlert component (accessibility)
 * - All strings from constants (no magic strings)
 */
export default function SignInScreen() {
  const {
    form,
    isLoading,
    error,
    googleOAuth,
    appleOAuth,
    isOAuthLoading,
    refs,
    handleSignIn,
    handleEmailSubmit,
    handlePasswordSubmit,
  } = useSignInLogic();

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
        {/* Header */}
        <Text style={styles.title}>Inicia sesión en tu cuenta</Text>
        <Text style={styles.subtitle}>
          Prepárate para triunfar en tu próxima entrevista.
        </Text>

        {/* Error Display */}
        {error && (
          <ErrorAlert
            message={error.message}
            suggestion={error.suggestion}
            linkText={error.linkText}
            linkHref={error.linkHref}
          />
        )}

        {/* OAuth Buttons */}
        <View style={styles.socialButtons}>
          <Button
            variant="social"
            onPress={googleOAuth.startOAuthFlow}
            disabled={isOAuthLoading}
            icon={<MaterialIcons name="g-mobiledata" size={24} color="white" />}
          >
            {googleOAuth.isLoading
              ? AUTH_MESSAGES.LOADING_OAUTH
              : AUTH_MESSAGES.CONTINUE_GOOGLE}
          </Button>
          <Button
            variant="social"
            onPress={appleOAuth.startOAuthFlow}
            disabled={isOAuthLoading}
            icon={<MaterialIcons name="apple" size={24} color="white" />}
          >
            {appleOAuth.isLoading
              ? AUTH_MESSAGES.LOADING_OAUTH
              : AUTH_MESSAGES.CONTINUE_APPLE}
          </Button>
        </View>

        {/* Divider */}
        <OrDivider />

        {/* Form */}
        <View style={styles.form}>
          <FormInput<SignInFormData>
            control={form.control}
            name="emailAddress"
            label="Dirección de correo electrónico"
            placeholder="Introduce tu correo electrónico"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
            blurOnSubmit={false}
            placeholderTextColor={theme.colors.text.secondary}
          />

          <FormInput<SignInFormData>
            control={form.control}
            name="password"
            label="Contraseña"
            inputRef={refs.password}
            placeholder="Introduce tu contraseña"
            secureTextEntry={true}
            showPasswordToggle={true}
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={handlePasswordSubmit}
            placeholderTextColor={theme.colors.text.secondary}
          />

          {/* Forgot Password Link */}
          <View style={styles.forgotPasswordContainer}>
            <Link href={AUTH_ROUTES.FORGOT_PASSWORD as any} asChild>
              <Text style={styles.forgotPasswordLink}>
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          </View>

          <Button
            onPress={form.handleSubmit(handleSignIn)}
            disabled={isLoading || isOAuthLoading}
          >
            {isLoading ? AUTH_MESSAGES.LOADING_SIGN_IN : AUTH_MESSAGES.SIGN_IN}
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿No tienes una cuenta?{" "}
            <Link href={AUTH_ROUTES.SIGN_UP} asChild>
              <Text style={styles.link}>Regístrate</Text>
            </Link>
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
  },
  socialButtons: {
    width: "100%",
    maxWidth: 480,
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  form: {
    width: "100%",
    maxWidth: 480,
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    paddingVertical: theme.spacing.xs,
  },
  forgotPasswordLink: {
    ...theme.typography.bodySmall,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
  },
  footer: {
    paddingVertical: theme.spacing["2xl"],
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
