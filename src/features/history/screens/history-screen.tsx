import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@/src/shared/components";
import { theme } from "@/src/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const { colors, spacing, typography } = theme;

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="history" size={64} color={colors.primary} />
        </View>
        <Text style={[typography.h2, styles.title]}>Historial</Text>
        <Text style={[typography.body, styles.subtitle]}>
          Revisa el historial completo de todas tus entrevistas de práctica.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    color: colors.text.secondary,
    textAlign: "center",
  },
});
