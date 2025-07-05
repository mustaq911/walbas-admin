import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface useActiveSidebarStore {
    activeSidebar: string;
    setActiveSidebar: (active: string) => void;
}

export const useActiveSidebar = create(
    persist<useActiveSidebarStore>(
        (set, get) => ({
            activeSidebar: "",
            setActiveSidebar: (activeSidebar ) => {
                set({ activeSidebar  });
            }
        }),
        {
            name: 'activeSecondarySidebar',
            storage: createJSONStorage(() => localStorage)
        }
    )
);
