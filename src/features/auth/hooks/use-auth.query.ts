import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { User, UserStats } from "../types";

/**
 * Query Keys para auth
 * Centralizados para fácil invalidación
 */
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
  stats: () => [...authKeys.all, "stats"] as const,
};

/**
 * Hook para obtener el usuario actual
 */
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async (): Promise<User | null> => {
      // TODO: Implementar con repository
      // return authRepository.getCurrentUser();
      return null;
    },
  });
}

/**
 * Hook para obtener las estadísticas del usuario
 */
export function useUserStats() {
  return useQuery({
    queryKey: authKeys.stats(),
    queryFn: async (): Promise<UserStats | null> => {
      // TODO: Implementar con repository
      // return authRepository.getUserStats();
      return null;
    },
    enabled: false, // Solo fetch cuando se necesite
  });
}

/**
 * Hook para login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      // TODO: Implementar con repository
      // return authRepository.login(credentials);
      throw new Error("Not implemented");
    },
    onSuccess: (user) => {
      // Actualizar cache del usuario
      queryClient.setQueryData(authKeys.user(), user);
      // Invalidar stats para refetch
      queryClient.invalidateQueries({ queryKey: authKeys.stats() });
    },
  });
}

/**
 * Hook para logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // TODO: Implementar con repository
      // return authRepository.logout();
    },
    onSuccess: () => {
      // Limpiar todo el cache de auth
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}

/**
 * Hook para actualizar perfil de usuario
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<User>) => {
      // TODO: Implementar con repository
      // return authRepository.updateProfile(updates);
      throw new Error("Not implemented");
    },
    onSuccess: (updatedUser) => {
      // Actualizar cache optimísticamente
      queryClient.setQueryData(authKeys.user(), updatedUser);
    },
  });
}
