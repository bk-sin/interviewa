import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import "react-native-reanimated";

import { SKIP_AUTH } from "@/src/config/auth-bypass.config";
import { MockClerkProvider } from "@/src/config/mock-clerk-provider";
import { queryClient } from "@/src/config/tanstack.config";
import { preloadImages } from "@/src/lib/assets";
import { theme } from "@/src/theme";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  import("@/src/config/reactotron.config").then(() =>
    console.log("Reactotron Configured"),
  );
}

export const unstable_settings = {
  initialRouteName: "onboarding",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!SKIP_AUTH && !publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export default function RootLayout() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const navigationTheme = useMemo(() => {
    return {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        background: theme.colors.background.dark,
        card: theme.colors.background.card,
        text: theme.colors.text.primary,
        border: theme.colors.border.dark,
        primary: theme.colors.primary,
      },
    };
  }, []);

  const backgroundColor = theme.colors.background.dark;

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

  const authProvider = SKIP_AUTH ? (
    <MockClerkProvider>
      <ThemeProvider value={navigationTheme}>
        <View style={{ flex: 1, backgroundColor }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor },
              animation: "fade",
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
          </Stack>
          <StatusBar style="light" />
        </View>
      </ThemeProvider>
    </MockClerkProvider>
  ) : (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider value={navigationTheme}>
        <View style={{ flex: 1, backgroundColor }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor },
              animation: "fade",
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
          </Stack>
          <StatusBar style="light" />
        </View>
      </ThemeProvider>
    </ClerkProvider>
  );

  return (
    <QueryClientProvider client={queryClient}>
      {authProvider}
    </QueryClientProvider>
  );
}
