import { create } from "zustand";

interface useCreateModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateModal = create<useCreateModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
