import { create } from "zustand";

type UIStore = {
  isCartSidebarOpen: boolean;
  openCartSidebar: () => void;
  closeCartSidebar: () => void;
  toggleCartSidebar: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isCartSidebarOpen: false,
  openCartSidebar: () => set({ isCartSidebarOpen: true }),
  closeCartSidebar: () => set({ isCartSidebarOpen: false }),
  toggleCartSidebar: () =>
    set((state) => ({ isCartSidebarOpen: !state.isCartSidebarOpen })),
}));
