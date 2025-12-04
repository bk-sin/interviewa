import { FeatureItem } from "@/components/feature-item";
import { Button } from "@/components/ui/button";
import {
  onboardingContent,
  onboardingFeatures,
} from "@/constants/onboarding.config";
import { theme } from "@/constants/theme.design";
import { useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Redirect, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { height: screenHeight } = useWindowDimensions();
  const heroImageHeight = Math.min(screenHeight * 0.35, 300);

  // Show loading state while auth is being checked
  if (!isLoaded) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.colors.background.dark }}
      />
    );
  }

  // If already signed in, redirect to home
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Hero Image */}
          <Image
            source={onboardingContent.heroImage.source}
            style={[styles.heroImage, { height: heroImageHeight }]}
            contentFit="cover"
            accessible={true}
            accessibilityLabel={onboardingContent.heroImage.alt}
            accessibilityRole="image"
          />

          <View style={styles.contentSection}>
            {/* Title */}
            <Text
              style={styles.title}
              accessible={true}
              accessibilityRole="header"
            >
              {onboardingContent.title}
            </Text>

            {/* Features List - Data Driven */}
            <View style={styles.featuresList}>
              {onboardingFeatures.map((feature) => (
                <FeatureItem key={feature.id} feature={feature} />
              ))}
            </View>
          </View>
        </View>

        {/* Footer/CTA Section */}
        <View style={styles.footer}>
          <Button
            onPress={() => router.push("/(auth)/sign-up")}
            fullWidth
            accessibilityHint="Navega a la pantalla de registro"
          >
            {onboardingContent.ctaButton}
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="link"
            accessibilityHint="Navega a la pantalla de inicio de sesión"
            onPress={() => router.push("/(auth)/sign-in")}
          >
            <Text style={styles.signInLink}>
              {onboardingContent.signInLink}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.dark,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: theme.spacing.base,
    paddingBottom: theme.spacing.xl,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    gap: theme.spacing["2xl"],
    minHeight: 400,
  },
  heroImage: {
    width: "100%",
    borderRadius: theme.borderRadius.md,
  },
  contentSection: {
    gap: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: "center",
  },
  featuresList: {
    gap: theme.spacing.base,
  },
  footer: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.base,
    alignItems: "center",
  },
  signInLink: {
    ...theme.typography.bodyMedium,
    color: theme.rgba(theme.colors.primary, 0.8),
  },
});
