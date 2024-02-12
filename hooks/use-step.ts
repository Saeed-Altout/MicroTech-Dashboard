"use client";

import { create } from "zustand";

interface useStepProps {
  current: number;
  reset: () => void;
  increase: () => void;
  decrease: () => void;
}
export const useStep = create<useStepProps>((set) => ({
  current: 0,
  reset: () => set({ current: 0 }),
  increase: () => set((state) => ({ current: state.current + 1 })),
  decrease: () => set((state) => ({ current: state.current - 1 })),
}));
