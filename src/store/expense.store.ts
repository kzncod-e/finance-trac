import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Store = {
  count: number;
  inc: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      count: 0,
      inc: () => set((s) => ({ count: s.count + 1 })),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
