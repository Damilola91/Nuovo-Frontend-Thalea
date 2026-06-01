import { create } from "zustand";
import { persist } from "zustand/middleware";

const API = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

interface AuthState {
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
  loading: boolean;
  // Actions
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchMe: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      loading: false,

      login: async (credentials) => {
        set({ loading: true });
        try {
          const res = await fetch(`${API}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
            credentials: "include",
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          set({
            isAuthenticated: true,
            role: data.role ?? null,
            loading: false,
          });
        } catch {
          set({ isAuthenticated: false, role: null, loading: false });
          throw new Error("Credenziali non valide");
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await fetch(`${API}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } finally {
          set({ isAuthenticated: false, role: null, loading: false });
        }
      },

      fetchMe: async () => {
        try {
          const res = await fetch(`${API}/api/auth/me`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error();
          const data = await res.json();
          set({ isAuthenticated: true, role: data.role ?? null });
        } catch {
          set({ isAuthenticated: false, role: null });
        }
      },

      reset: () => set({ isAuthenticated: false, role: null, loading: false }),
    }),
    {
      name: "auth-storage",
      // Persiste solo isAuthenticated e role — non loading
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    },
  ),
);
