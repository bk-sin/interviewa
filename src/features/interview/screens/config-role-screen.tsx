import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/src/shared/components";
import { Button } from "@/src/shared/ui";
import { colors, rgba, spacing, typography } from "@/src/theme";
import type { RoleOption } from "@/src/types";
import { useConfigRoleLogic } from "../hooks";

interface RoleCardProps {
  readonly item: RoleOption;
  readonly isSelected: boolean;
  readonly onPress: () => void;
}

/**
 * RoleCard
 * @description Tarjeta de rol memoizada para optimizar rendimiento
 */
const RoleCard = React.memo<RoleCardProps>(({ item, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      {/* Icon Container */}
      <View
        style={[
          styles.iconContainer,
          isSelected
            ? styles.iconContainerSelected
            : styles.iconContainerDefault,
        ]}
      >
        <MaterialIcons
          name={item.icon}
          size={24}
          color={isSelected ? colors.primary : rgba(colors.text.primary, 0.6)}
        />
      </View>

      {/* Text Info */}
      <View style={styles.cardContent}>
        <ThemedText
          style={[
            styles.cardTitle,
            isSelected && { color: colors.text.primary },
          ]}
        >
          {item.title}
        </ThemedText>
        <ThemedText
          style={[styles.cardSubtitle, isSelected && { color: colors.primary }]}
        >
          {item.subtitle}
        </ThemedText>
      </View>

      {/* Checkbox Circle */}
      <View
        style={[
          styles.checkbox,
          isSelected ? styles.checkboxSelected : styles.checkboxDefault,
        ]}
      >
        {isSelected && (
          <MaterialIcons
            name="check"
            size={14}
            color={colors.background.dark}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});

RoleCard.displayName = "RoleCard";

/**
 * ConfigRoleScreen
 * @description Pantalla de selección de rol para entrevista
 */
export default function ConfigRoleScreen() {
  const insets = useSafeAreaInsets();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const {
    selectedRole,
    searchQuery,
    filteredRoles,
    handleSelectRole,
    handleConfirm,
    handleSearchChange,
    handleBack,
  } = useConfigRoleLogic({
    onNext: (roleId) => {
      console.log("Role selected:", roleId);
      // TODO: Navigate to next screen
    },
    onBack: () => {
      console.log("Back pressed");
      // TODO: Navigate back
    },
  });

  // Separar roles por categoría
  const suggestedRoles = filteredRoles.filter(
    (r) => r.category === "suggested"
  );
  const otherRoles = filteredRoles.filter((r) => r.category === "others");

  const selectedRoleLabel =
    filteredRoles.find((r) => r.id === selectedRole)?.title || "Ninguno";

  return (
    <ThemedView>
      {/* Header fijo */}
      <View style={styles.header}>
        <View style={styles.navBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.text.primary}
            />
          </TouchableOpacity>
          <ThemedText style={styles.headerEyebrow}>
            SELECCIÓN DE PUESTO
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>
        <ThemedText style={styles.headerTitle}>
          ¿Qué rol quieres practicar?
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Elige el puesto para adaptar las preguntas.
        </ThemedText>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            isSearchFocused && styles.searchContainerFocused,
          ]}
        >
          <MaterialIcons
            name="search"
            size={20}
            color={rgba(colors.text.primary, 0.4)}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={handleSearchChange}
            placeholder="Buscar rol, habilidades o área..."
            placeholderTextColor={rgba(colors.text.primary, 0.3)}
            style={styles.searchInput}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 180 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Suggested Section */}
        {suggestedRoles.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>ROLES SUGERIDOS</ThemedText>
            {suggestedRoles.map((item) => (
              <RoleCard
                key={item.id}
                item={item}
                isSelected={selectedRole === item.id}
                onPress={() => handleSelectRole(item.id)}
              />
            ))}
          </View>
        )}

        {/* Others Section */}
        {otherRoles.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>OTROS</ThemedText>
            {otherRoles.map((item) => (
              <RoleCard
                key={item.id}
                item={item}
                isSelected={selectedRole === item.id}
                onPress={() => handleSelectRole(item.id)}
              />
            ))}
          </View>
        )}

        {/* No results */}
        {filteredRoles.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="search-off"
              size={48}
              color={rgba(colors.text.primary, 0.2)}
            />
            <ThemedText style={styles.emptyText}>
              No se encontraron roles
            </ThemedText>
          </View>
        )}
      </ScrollView>

      {/* Footer Fijo */}
      <View
        style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}
      >
        <View style={styles.footerInfo}>
          <View>
            <ThemedText style={styles.footerLabel}>ROL SELECCIONADO</ThemedText>
            <ThemedText style={styles.footerValue}>
              {selectedRoleLabel}
            </ThemedText>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <ThemedText style={styles.footerLabel}>SIGUIENTE</ThemedText>
            <ThemedText style={styles.footerNextStep}>Configuración</ThemedText>
          </View>
        </View>

        <Button
          onPress={handleConfirm}
          disabled={!selectedRole}
          style={styles.confirmButton}
        >
          Confirmar Selección
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: rgba(colors.background.dark, 0.95),
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: rgba(colors.text.primary, 0.05),
  },
  headerEyebrow: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 1.5,
  },
  headerTitle: {
    ...typography.h2,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    color: rgba(colors.text.primary, 0.5),
    marginBottom: spacing.lg,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.card,
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    height: 50,
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },
  searchContainerFocused: {
    borderColor: colors.primary,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 14,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: rgba(colors.text.primary, 0.4),
    letterSpacing: 1.2,
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },

  // Card Styles
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: rgba(colors.text.primary, 0.1),
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: rgba(colors.primary, 0.1),
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.lg,
    borderWidth: 1,
  },
  iconContainerDefault: {
    backgroundColor: rgba(colors.text.primary, 0.05),
    borderColor: rgba(colors.text.primary, 0.05),
  },
  iconContainerSelected: {
    backgroundColor: rgba(colors.primary, 0.15),
    borderColor: rgba(colors.primary, 0.2),
  },

  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: rgba(colors.text.primary, 0.9),
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: 12,
    color: rgba(colors.text.primary, 0.4),
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  checkboxDefault: {
    borderColor: rgba(colors.text.primary, 0.1),
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    fontSize: 14,
    color: rgba(colors.text.primary, 0.4),
    marginTop: spacing.md,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: rgba(colors.background.dark, 0.95),
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: rgba(colors.text.primary, 0.05),
  },
  footerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  footerLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: rgba(colors.text.primary, 0.4),
    letterSpacing: 1,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  footerValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  footerNextStep: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
  },
  confirmButtonText: {
    color: colors.background.dark,
    fontSize: 16,
    fontWeight: "700",
  },
});
