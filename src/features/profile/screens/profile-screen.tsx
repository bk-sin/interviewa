import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { SKIP_AUTH } from "@/src/config/auth-bypass.config";
import { Text } from "@/src/shared/components";
import { useAuth, useUser } from "@/src/shared/hooks";
import { theme } from "@/src/theme";

const { borderRadius, colors, shadows, spacing, typography } = theme;

interface ProfileMenuItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  danger?: boolean;
}

function ProfileMenuItem({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  danger = false,
}: ProfileMenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuIconBox,
            danger && { backgroundColor: theme.rgba(colors.status.error, 0.1) },
          ]}
        >
          <MaterialIcons
            name={icon}
            size={22}
            color={danger ? colors.status.error : colors.primary}
          />
        </View>
        <View>
          <Text
            style={[
              typography.body,
              styles.menuTitle,
              danger && { color: colors.status.error },
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.caption, styles.menuSubtitle]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showChevron && (
        <MaterialIcons
          name="chevron-right"
          size={24}
          color={colors.text.muted}
        />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    if (SKIP_AUTH) {
      // In MVP mode, do nothing or navigate to onboarding
      console.log("Sign out disabled in MVP mode");
      return;
    }

    try {
      await signOut?.();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {user?.imageUrl ? (
              <View style={styles.avatar}>
                <MaterialIcons
                  name="person"
                  size={48}
                  color={colors.text.primary}
                />
              </View>
            ) : (
              <View style={styles.avatar}>
                <MaterialIcons
                  name="person"
                  size={48}
                  color={colors.text.primary}
                />
              </View>
            )}
          </View>
          <Text style={[typography.h3, styles.userName]}>
            {user?.firstName || "Usuario"}
          </Text>
          <Text style={[typography.bodySmall, styles.userEmail]}>
            {user?.primaryEmailAddress?.emailAddress || ""}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[typography.caption, styles.sectionTitle]}>CUENTA</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="person-outline"
              title="Editar perfil"
              subtitle="Nombre, foto, información"
            />
            <ProfileMenuItem
              icon="notifications-none"
              title="Notificaciones"
              subtitle="Preferencias de alertas"
            />
            <ProfileMenuItem
              icon="security"
              title="Seguridad"
              subtitle="Contraseña, 2FA"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.caption, styles.sectionTitle]}>
            PREFERENCIAS
          </Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem
              icon="language"
              title="Idioma"
              subtitle="Español"
            />
            <ProfileMenuItem
              icon="palette"
              title="Apariencia"
              subtitle="Tema oscuro"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[typography.caption, styles.sectionTitle]}>SOPORTE</Text>
          <View style={styles.menuCard}>
            <ProfileMenuItem icon="help-outline" title="Centro de ayuda" />
            <ProfileMenuItem icon="feedback" title="Enviar feedback" />
            <ProfileMenuItem icon="info-outline" title="Acerca de" />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.menuCard}>
            {SKIP_AUTH ? (
              <ProfileMenuItem
                icon="info-outline"
                title="Modo MVP"
                subtitle="Auth deshabilitado temporalmente"
                showChevron={false}
              />
            ) : (
              <ProfileMenuItem
                icon="logout"
                title="Cerrar sesión"
                onPress={handleSignOut}
                showChevron={false}
                danger
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.base,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.card,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    color: colors.text.muted,
  },
  section: {
    paddingHorizontal: spacing.base,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text.muted,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  menuCard: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...shadows.sm,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.rgba(colors.border.dark, 0.3),
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.base,
    backgroundColor: colors.primaryMuted,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    color: colors.text.primary,
    fontWeight: "500",
  },
  menuSubtitle: {
    color: colors.text.muted,
  },
});
