import { create } from "zustand";

interface CreatorSidebar {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebar = create<CreatorSidebar>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));
