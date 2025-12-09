import { useAuth } from "@clerk/clerk-expo";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

import { HapticTab } from "@/src/shared/components";
import { colors, rgba } from "@/src/theme";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for auth to load - show dark background instead of white flash
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.dark }} />
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.background.dark,
          borderTopColor: rgba(colors.text.primary, 0.1),
          borderTopWidth: 1,
        },
        sceneStyle: {
          backgroundColor: colors.background.dark,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "home" : "home"}
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="practices"
        options={{
          title: "Prácticas",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="model-training"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historial",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="history"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "person" : "person-outline"}
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
