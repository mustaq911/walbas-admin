import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: string;
  setTheme: (newTheme: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "",
      setTheme: (newTheme: string) => set({ theme: newTheme }),
    }),
    {
      name: "theme-storage", // Key for localStorage
    }
  )
);