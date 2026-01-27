import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { BackHandler, View } from "react-native";

import { useAuth } from "@/src/shared/hooks";
import { theme } from "@/src/theme";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Disable hardware back button on Android to prevent app from closing
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Return true to prevent default behavior (closing the app)
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  // Show dark background while loading
  if (!isLoaded) {
    return (
      <View
        style={{ flex: 1, backgroundColor: theme.colors.background.dark }}
      />
    );
  }

  // Redirect to home if already signed in (prevents back navigation to auth)
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background.dark,
        },
        animation: "fade",
      }}
    />
  );
}
