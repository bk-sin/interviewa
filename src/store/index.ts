/**
 * State Management Exports
 * 
 * This project uses TanStack Query for server state and Zustand for client state
 * - Server state (data fetching): Use TanStack Query hooks from @/src/queries
 * - Client state (UI): Use Zustand stores from this module
 * 
 * @example
 * ```tsx
 * // For server data (PREFERRED)
 * import { useUser, useInterviewRoles } from '@/src/queries';
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
export { useUIStore } from "./useUIStore";
