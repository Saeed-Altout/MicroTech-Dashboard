"use client";

import { useState } from "react";

export default function useSelect() {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (
    item: number,
    fieldChange: (value: number[]) => void
  ) => {
    const isItemSelected = selected.includes(item);
    const updatedSelected = isItemSelected
      ? selected.filter((selectedItem) => selectedItem !== item)
      : [...selected, item];
    setSelected(updatedSelected);
    fieldChange(updatedSelected);
  };

  return { handleSelect };
}
