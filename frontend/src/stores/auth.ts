import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface AuthState {
  isAuthenticated: boolean;
  isAuthenticatedWeb3: boolean;
  token: string | null;

  // Actions
  setIsAuthenticatedWeb3: (isAuthenticatedWeb3: boolean) => void;
  setToken: (token: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get, store) => ({
      isAuthenticated: false,
      isAuthenticatedWeb3: false,
      token: null,

      setToken: (token: string | null) => {
        set({ token });
        set({ isAuthenticated: true });
      },
      setIsAuthenticatedWeb3: (isAuthenticatedWeb3: boolean) => {
        set({ isAuthenticatedWeb3, isAuthenticated: true });
      },
      reset: () => {
        set(store.getInitialState());
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
