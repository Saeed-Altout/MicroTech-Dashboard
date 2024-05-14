import { create } from "zustand";

interface UseVerificationModalProps {
  isOpen: boolean;
  userName: string;
  setUsername: (val: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useVerificationModal = create<UseVerificationModalProps>(
  (set) => ({
    isOpen: false,
    userName: "",
    onOpen: () => set({ isOpen: true }),
    setUsername: (val) => set({ isOpen: true, userName: val }),
    onClose: () => set({ isOpen: false }),
  })
);
