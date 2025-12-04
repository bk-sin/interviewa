import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/text-input";
import { theme } from "@/constants/theme.design";
import { useSignUp } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function VerifyEmailScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <MaterialIcons
            name="verified-user"
            size={48}
            color={theme.colors.primary}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Verifica tu email</Text>
        <Text style={styles.subtitle}>
          Ingresa el código que enviamos a tu correo
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Código de verificación</Text>
            <TextInput
              value={code}
              placeholder="123456"
              onChangeText={(verificationCode: string) =>
                setCode(verificationCode)
              }
              placeholderTextColor={theme.colors.text.secondary}
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          <Button onPress={onVerifyPress} disabled={loading}>
            {loading ? "Verificando..." : "Verificar"}
          </Button>
        </View>

        {/* Back Link */}
        <View style={styles.footer}>
          <Text style={styles.link} onPress={() => router.back()}>
            ← Volver al registro
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.dark,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing["3xl"],
    justifyContent: "center",
  },
  logoContainer: {
    paddingBottom: theme.spacing["2xl"],
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
    color: theme.colors.text.secondary,
    textAlign: "center",
    marginBottom: theme.spacing.lg,
  },
  form: {
    width: "100%",
    maxWidth: 480,
    gap: theme.spacing.base,
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
  },
  link: {
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    textAlign: "center",
  },
});
