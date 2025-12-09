import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

/**
 * Typed dispatch hook
 * @example
 * ```tsx
 * const dispatch = useAppDispatch();
 * dispatch(setUser(userData));
 * ```
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Typed selector hook
 * @example
 * ```tsx
 * const { user, isAuthenticated } = useAppSelector((state) => state.auth);
 * ```
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
