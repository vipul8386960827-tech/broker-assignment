
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  selectedBroker: string | null;
  setSelectedBroker: (broker: string | null) => void;

  isLoggedIn: boolean;
  setLoggedIn: (status: boolean) => void;

  darkMode: boolean;
  toggleDarkMode: () => void;
}

const useAppStore = create(
  persist<AppState>(
    (set) => ({
      selectedBroker: null,
      setSelectedBroker: (broker) => set({ selectedBroker: broker }),

      isLoggedIn: false,
      setLoggedIn: (status) => set({ isLoggedIn: status }),

      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "app-storage", 
    }
  )
);

export default useAppStore;
