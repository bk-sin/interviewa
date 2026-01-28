import * as Haptics from "expo-haptics";
import { useCallback, useMemo, useState } from "react";

import { DEFAULT_ROLE_ID, ROLES_DATA } from "../config";

interface UseConfigRoleLogicProps {
  readonly onNext: (roleId: string) => void;
  readonly onBack?: () => void;
  readonly initialRoleId?: string;
}

/**
 * useConfigRoleLogic
 * @description Hook que maneja la lógica de selección de rol con búsqueda y feedback háptico
 */
export function useConfigRoleLogic({
  onNext,
  onBack,
  initialRoleId,
}: UseConfigRoleLogicProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(
    initialRoleId || DEFAULT_ROLE_ID,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Lógica de filtrado de búsqueda
  const filteredRoles = useMemo(() => {
    if (!searchQuery) return ROLES_DATA;

    const lowerQuery = searchQuery.toLowerCase();
    return ROLES_DATA.filter(
      (role) =>
        role.title.toLowerCase().includes(lowerQuery) ||
        role.subtitle.toLowerCase().includes(lowerQuery),
    );
  }, [searchQuery]);

  // Manejo de Selección con feedback háptico
  const handleSelectRole = useCallback(
    (id: string) => {
      if (id !== selectedRole) {
        Haptics.selectionAsync();
        setSelectedRole(id);
      }
    },
    [selectedRole],
  );

  // Manejo de Confirmación
  const handleConfirm = useCallback(() => {
    if (selectedRole) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onNext(selectedRole);
    }
  }, [selectedRole, onNext]);

  // Manejo de Búsqueda
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  // Manejo de Back
  const handleBack = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack?.();
  }, [onBack]);

  return {
    selectedRole,
    searchQuery,
    filteredRoles,
    handleSelectRole,
    handleConfirm,
    handleSearchChange,
    handleBack,
  };
}
