/**
 * State Management Exports
 *
 * This project uses TanStack Query for server state and Zustand for client state
 * - Server state (data fetching): Use TanStack Query hooks from feature folders
 * - Client state (UI): Use Zustand stores from this module
 *
 * @example
 * ```tsx
 * // For server data (PREFERRED)
 * import { useUser } from '@/src/features/auth';
 * import { useInterviewRoles } from '@/src/features/interview';
 *
 * const { data: user } = useUser();
 * const { data: roles } = useInterviewRoles();
 *
 * // For client state
 * import { useUIStore } from '@/src/store';
 *
 * const { isModalOpen, openModal } = useUIStore();
 * ```
 */

// Zustand stores for client state
export { useUIStore } from "./use-ui.store";
