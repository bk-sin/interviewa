import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  InterviewHistoryEntry,
  InterviewRole,
  InterviewSession,
  InterviewSessionResponse,
  InterviewState as InterviewStateType,
  ProgressMetric,
} from "../types";

/**
 * Query Keys para interview
 * Centralizados para fácil invalidación
 */
export const interviewKeys = {
  all: ["interview"] as const,
  roles: () => [...interviewKeys.all, "roles"] as const,
  session: (sessionId?: string) =>
    sessionId
      ? ([...interviewKeys.all, "session", sessionId] as const)
      : ([...interviewKeys.all, "session"] as const),
  activeSession: () => [...interviewKeys.all, "activeSession"] as const,
  history: () => [...interviewKeys.all, "history"] as const,
  metrics: () => [...interviewKeys.all, "metrics"] as const,
};

/**
 * Hook para obtener los roles disponibles
 */
export function useInterviewRoles() {
  return useQuery({
    queryKey: interviewKeys.roles(),
    queryFn: async (): Promise<InterviewRole[]> => {
      // TODO: Implementar con repository
      // return interviewRepository.getRoles();
      return [];
    },
  });
}

/**
 * Hook para obtener el historial de entrevistas
 */
export function useInterviewHistory() {
  return useQuery({
    queryKey: interviewKeys.history(),
    queryFn: async (): Promise<InterviewHistoryEntry[]> => {
      // TODO: Implementar con repository
      // return interviewRepository.getHistory();
      return [];
    },
  });
}

/**
 * Hook para obtener métricas de progreso
 */
export function useProgressMetrics() {
  return useQuery({
    queryKey: interviewKeys.metrics(),
    queryFn: async (): Promise<ProgressMetric[]> => {
      // TODO: Implementar con repository
      // return interviewRepository.getProgressMetrics();
      return [];
    },
  });
}

/**
 * Hook para obtener la sesión activa
 */
export function useActiveSession() {
  return useQuery({
    queryKey: interviewKeys.activeSession(),
    queryFn: async (): Promise<InterviewSessionResponse | null> => {
      // TODO: Implementar con repository
      // return interviewRepository.getActiveSession();
      return null;
    },
  });
}

/**
 * Hook para crear una nueva sesión de entrevista
 */
export function useCreateInterviewSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      params: Omit<InterviewSession, "id" | "startedAt">,
    ): Promise<InterviewSessionResponse> => {
      // TODO: Implementar con repository
      // return interviewRepository.createSession(params);
      throw new Error("Not implemented");
    },
    onSuccess: (session) => {
      // Setear la sesión activa en el cache
      queryClient.setQueryData(interviewKeys.activeSession(), session);
    },
  });
}

/**
 * Hook para actualizar el estado de la sesión
 */
export function useUpdateInterviewState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      sessionId: string;
      state: InterviewStateType;
    }): Promise<void> => {
      // TODO: Implementar con repository
      // return interviewRepository.updateState(params.sessionId, params.state);
      throw new Error("Not implemented");
    },
    onMutate: async ({ state }) => {
      // Cancelar refetch automáticos
      await queryClient.cancelQueries({
        queryKey: interviewKeys.activeSession(),
      });

      // Snapshot del valor anterior
      const previousSession =
        queryClient.getQueryData<InterviewSessionResponse>(
          interviewKeys.activeSession(),
        );

      // Update optimista
      if (previousSession) {
        queryClient.setQueryData<InterviewSessionResponse>(
          interviewKeys.activeSession(),
          {
            ...previousSession,
            state,
          },
        );
      }

      return { previousSession };
    },
    onError: (err, variables, context) => {
      // Rollback en caso de error
      if (context?.previousSession) {
        queryClient.setQueryData(
          interviewKeys.activeSession(),
          context.previousSession,
        );
      }
    },
    onSettled: () => {
      // Refetch para asegurar sincronización con server
      queryClient.invalidateQueries({
        queryKey: interviewKeys.activeSession(),
      });
    },
  });
}

/**
 * Hook para actualizar el payload de la sesión
 */
export function useUpdateSessionPayload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      sessionId: string;
      payload: Partial<InterviewSessionResponse["payload"]>;
    }): Promise<void> => {
      // TODO: Implementar con repository
      // return interviewRepository.updatePayload(params.sessionId, params.payload);
      throw new Error("Not implemented");
    },
    onMutate: async ({ payload }) => {
      await queryClient.cancelQueries({
        queryKey: interviewKeys.activeSession(),
      });

      const previousSession =
        queryClient.getQueryData<InterviewSessionResponse>(
          interviewKeys.activeSession(),
        );

      if (previousSession) {
        queryClient.setQueryData<InterviewSessionResponse>(
          interviewKeys.activeSession(),
          {
            ...previousSession,
            payload: {
              ...previousSession.payload,
              ...payload,
            },
          },
        );
      }

      return { previousSession };
    },
    onError: (err, variables, context) => {
      if (context?.previousSession) {
        queryClient.setQueryData(
          interviewKeys.activeSession(),
          context.previousSession,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: interviewKeys.activeSession(),
      });
    },
  });
}

/**
 * Hook para finalizar una sesión de entrevista
 */
export function useCompleteInterviewSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string): Promise<void> => {
      // TODO: Implementar con repository
      // return interviewRepository.completeSession(sessionId);
      throw new Error("Not implemented");
    },
    onSuccess: () => {
      // Limpiar sesión activa
      queryClient.setQueryData(interviewKeys.activeSession(), null);
      // Invalidar history para mostrar la nueva entrada
      queryClient.invalidateQueries({ queryKey: interviewKeys.history() });
      // Invalidar métricas
      queryClient.invalidateQueries({ queryKey: interviewKeys.metrics() });
    },
  });
}

/**
 * Hook para resetear/cancelar una sesión
 */
export function useResetInterviewSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      // En este caso no hace falta llamar al backend
      return Promise.resolve();
    },
    onSuccess: () => {
      // Solo limpiar el cache local
      queryClient.setQueryData(interviewKeys.activeSession(), null);
    },
  });
}
