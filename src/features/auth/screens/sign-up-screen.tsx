import { SignUpFormData, useSignUpLogic } from "@/src/features/auth/hooks";
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
import { AUTH_MESSAGES } from "../config";
import { AUTH_ROUTES } from "../routes";

/**
 * SignUpScreen - User registration view
 */
export default function SignUpScreen() {
  const {
    form,
    isLoading,
    error,
    googleOAuth,
    appleOAuth,
    isOAuthLoading,
    refs,
    handleSignUp,
    handleEmailSubmit,
    handlePasswordSubmit,
    handleConfirmPasswordSubmit,
  } = useSignUpLogic();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>Crea tu cuenta</Text>
        <Text style={styles.subtitle}>
          Prepárate para tu próxima entrevista con IA
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

        {/* Social Buttons */}
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
          <FormInput<SignUpFormData>
            control={form.control}
            name="emailAddress"
            label="Correo electrónico"
            placeholder="tu@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            returnKeyType="next"
            onSubmitEditing={handleEmailSubmit}
            blurOnSubmit={false}
            placeholderTextColor={theme.colors.text.secondary}
          />

          <FormInput<SignUpFormData>
            control={form.control}
            name="password"
            label="Contraseña"
            inputRef={refs.password}
            placeholder="••••••••"
            secureTextEntry={true}
            showPasswordToggle={true}
            textContentType="newPassword"
            returnKeyType="next"
            onSubmitEditing={handlePasswordSubmit}
            blurOnSubmit={false}
            placeholderTextColor={theme.colors.text.secondary}
          />

          <FormInput<SignUpFormData>
            control={form.control}
            name="confirmPassword"
            label="Confirmar contraseña"
            inputRef={refs.confirmPassword}
            placeholder="••••••••"
            secureTextEntry={true}
            showPasswordToggle={true}
            textContentType="newPassword"
            returnKeyType="done"
            onSubmitEditing={handleConfirmPasswordSubmit}
            placeholderTextColor={theme.colors.text.secondary}
          />

          <Button
            onPress={form.handleSubmit(handleSignUp)}
            disabled={isLoading || isOAuthLoading}
          >
            {isLoading ? AUTH_MESSAGES.LOADING_SIGN_UP : AUTH_MESSAGES.SIGN_UP}
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿Ya tienes una cuenta?{" "}
            <Link href={AUTH_ROUTES.SIGN_IN} asChild>
              <Text style={styles.link}>Inicia Sesión</Text>
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
