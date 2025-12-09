import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { User, UserStats } from "@/src/types";

interface AuthState {
  user: User | null;
  stats: UserStats | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  stats: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setStats: (state, action: PayloadAction<UserStats>) => {
      state.stats = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.stats = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setStats, setLoading, setError, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
