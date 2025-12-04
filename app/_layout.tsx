import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";

import { theme } from "@/constants/theme.design";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { preloadImages } from "@/utils/asset-loader";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  import("../reactotron-config").then(() =>
    console.log("Reactotron Configured")
  );
}

export const unstable_settings = {
  initialRouteName: "onboarding",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Pre-cache critical images
  useEffect(() => {
    async function loadAssets() {
      try {
        await preloadImages();
      } catch (error) {
        console.warn("Error pre-caching assets:", error);
      } finally {
        setAssetsLoaded(true);
      }
    }
    loadAssets();
  }, []);

  // Hide splash screen when fonts and assets are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assetsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, assetsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded || !assetsLoaded) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.colors.background.dark }}
      />
    );
  }

  // Custom dark theme with our background color
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: theme.colors.background.dark,
      card: theme.colors.background.card,
    },
  };

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider
        value={colorScheme === "dark" ? customDarkTheme : DefaultTheme}
      >
        <View
          style={{ flex: 1, backgroundColor: theme.colors.background.dark }}
        >
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background.dark },
              animation: "fade",
              gestureEnabled: false, // Prevent swipe back
            }}
          >
            <Stack.Screen
              name="onboarding"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="light" />
        </View>
      </ThemeProvider>
    </ClerkProvider>
  );
}
